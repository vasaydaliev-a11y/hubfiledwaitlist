const SHOPIFY_STOREFRONT_URL = process.env.SHOPIFY_STOREFRONT_URL;
const SHOPIFY_STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

const FEATURED_PRODUCTS_QUERY = `
  query FeaturedProducts($first: Int!) {
    products(first: $first, sortKey: BEST_SELLING) {
      edges {
        node {
          id
          title
          handle
          description
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          featuredImage {
            url
            altText
            width
            height
          }
        }
      }
    }
  }
`;

export async function GET() {
  if (!SHOPIFY_STOREFRONT_URL || !SHOPIFY_STOREFRONT_TOKEN) {
    return Response.json(
      { error: "Shopify Storefront credentials not configured" },
      { status: 503 }
    );
  }

  try {
    const res = await fetch(SHOPIFY_STOREFRONT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({
        query: FEATURED_PRODUCTS_QUERY,
        variables: { first: 6 },
      }),
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      return Response.json(
        { error: "Failed to fetch products from Shopify" },
        { status: 502 }
      );
    }

    const json = await res.json();

    if (json.errors) {
      return Response.json(
        { error: json.errors[0]?.message ?? "GraphQL error" },
        { status: 502 }
      );
    }

    const products = json.data.products.edges.map(
      (edge: { node: Record<string, unknown> }) => edge.node
    );

    return Response.json({ products });
  } catch {
    return Response.json(
      { error: "Could not reach Shopify" },
      { status: 502 }
    );
  }
}
