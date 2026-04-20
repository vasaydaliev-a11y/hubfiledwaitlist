const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ?? "";
const SHOPIFY_STOREFRONT_TOKEN =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN ?? "";

interface Money {
  amount: string;
  currencyCode: string;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  availableForSale: boolean;
  onlineStoreUrl: string | null;
  featuredImage: {
    url: string;
    altText: string | null;
    width: number;
    height: number;
  } | null;
  priceRange: { minVariantPrice: Money };
  compareAtPriceRange: { minVariantPrice: Money };
}

interface ProductEdge {
  node: ShopifyProduct;
}

interface ProductsResponse {
  data: {
    products: {
      edges: ProductEdge[];
    };
  };
}

const FEATURED_PRODUCTS_QUERY = `
  query getFeaturedProducts($first: Int!) {
    products(first: $first, sortKey: BEST_SELLING, query: "available_for_sale:true") {
      edges {
        node {
          id
          title
          handle
          description
          availableForSale
          onlineStoreUrl
          featuredImage {
            url
            altText
            width
            height
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          compareAtPriceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

export async function getFeaturedProducts(
  count = 6
): Promise<ShopifyProduct[]> {
  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_TOKEN) {
    return [];
  }

  const res = await fetch(
    `https://${SHOPIFY_STORE_DOMAIN}/api/2025-04/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({
        query: FEATURED_PRODUCTS_QUERY,
        variables: { first: count },
      }),
      next: { revalidate: 300 },
    }
  );

  if (!res.ok) return [];

  const json: ProductsResponse = await res.json();
  return json.data.products.edges.map((e) => e.node);
}

export function formatPrice(money: Money): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: money.currencyCode,
  }).format(parseFloat(money.amount));
}
