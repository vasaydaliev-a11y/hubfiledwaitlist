import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    console.error("[waitlist] Missing Supabase env vars:", {
      hasUrl: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL),
      hasAnon: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY),
      hasServiceRole: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY)
    });
    return NextResponse.json(
      { error: "Server is not configured. Missing Supabase environment variables." },
      { status: 500 }
    );
  }

  let email = "";
  try {
    const body = (await request.json()) as { email?: string };
    email = body.email?.trim().toLowerCase() ?? "";
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: "Invalid email format." }, { status: 400 });
  }

  const { error } = await supabase.from("waitlist").insert({ email });

  if (error) {
    console.error("[waitlist] Supabase insert error:", error.code, error.message, error.details);

    if (error.code === "23505") {
      return NextResponse.json(
        { error: "This email is already on the waitlist." },
        { status: 409 }
      );
    }

    if (error.code === "42P01") {
      return NextResponse.json(
        { error: "Waitlist table does not exist. Please create it in Supabase." },
        { status: 500 }
      );
    }

    if (error.code === "42501" || error.message?.includes("row-level security")) {
      return NextResponse.json(
        { error: "Permission denied. Check RLS policies in Supabase." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: `DB error: ${error.message} (code: ${error.code})` },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
