# AIHub Waitlist Landing Page

A cinematic, dark premium waitlist landing page for AIHub (AI aggregator + freelance marketplace).

## 1) Install dependencies

```bash
npm install
```

## 2) Set up Supabase table

Run this SQL in your Supabase SQL editor:

```sql
CREATE TABLE waitlist (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);
```

## 3) Add environment variables

Copy `.env.local.example` to `.env.local` and fill values:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 4) Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 5) Deploy to Vercel

1. Push your project to GitHub.
2. Import the repository in Vercel.
3. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Vercel environment variables.
4. Deploy.
# hubfiledwaitlist
