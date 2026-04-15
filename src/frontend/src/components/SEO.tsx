import { useEffect } from "react";

interface ProductSEOProps {
  name: string;
  price: number;
  image: string;
}

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  type?: "website" | "product";
  product?: ProductSEOProps;
}

function setMeta(
  name: string,
  content: string,
  attr: "name" | "property" = "name",
) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function setJsonLd(id: string, data: object) {
  let el = document.querySelector<HTMLScriptElement>(
    `script[data-jsonld="${id}"]`,
  );
  if (!el) {
    el = document.createElement("script");
    el.setAttribute("type", "application/ld+json");
    el.setAttribute("data-jsonld", id);
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

function removeJsonLd(id: string) {
  const el = document.querySelector(`script[data-jsonld="${id}"]`);
  if (el) el.remove();
}

export function SEO({
  title,
  description,
  canonical,
  type = "website",
  product,
}: SEOProps) {
  useEffect(() => {
    const fullTitle = `${title} | Farm72`;
    document.title = fullTitle;

    setMeta("description", description);
    setMeta("og:title", fullTitle, "property");
    setMeta("og:description", description, "property");
    setMeta("og:type", type === "product" ? "product" : "website", "property");
    setMeta("og:site_name", "Farm72", "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);

    if (canonical) {
      setLink("canonical", canonical);
    }

    if (product) {
      setMeta("og:image", product.image, "property");
      setMeta("twitter:image", product.image);
    }

    // Organization JSON-LD — always present
    setJsonLd("organization", {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Farm72",
      url: "https://farm72.com",
      logo: "https://farm72.com/assets/images/logo.png",
      description:
        "Farm72 — Premium cold-pressed oils and Himalayan Buransh Juice. 100% natural, chemical-free, traditional Kacchi Ghani extraction.",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-7500010488",
        contactType: "customer service",
        availableLanguage: ["Hindi", "English"],
      },
      sameAs: ["https://wa.me/917500010488"],
    });

    if (type === "product" && product) {
      // Product JSON-LD
      setJsonLd("product", {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        image: product.image,
        description,
        brand: { "@type": "Brand", name: "Farm72" },
        offers: {
          "@type": "Offer",
          price: product.price,
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          seller: { "@type": "Organization", name: "Farm72" },
        },
      });

      // BreadcrumbList JSON-LD
      setJsonLd("breadcrumb", {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://farm72.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Shop",
            item: "https://farm72.com/shop",
          },
          { "@type": "ListItem", position: 3, name: product.name },
        ],
      });
    } else {
      removeJsonLd("product");
      removeJsonLd("breadcrumb");
    }

    return () => {
      // Cleanup is intentionally skipped — meta tags persist for next page to overwrite
    };
  }, [title, description, canonical, type, product]);

  return null;
}
