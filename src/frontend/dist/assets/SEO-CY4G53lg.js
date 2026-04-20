import { r as reactExports } from "./index-BAxA7QJV.js";
function setMeta(name, content, attr = "name") {
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}
function setLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}
function setJsonLd(id, data) {
  let el = document.querySelector(
    `script[data-jsonld="${id}"]`
  );
  if (!el) {
    el = document.createElement("script");
    el.setAttribute("type", "application/ld+json");
    el.setAttribute("data-jsonld", id);
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}
function removeJsonLd(id) {
  const el = document.querySelector(`script[data-jsonld="${id}"]`);
  if (el) el.remove();
}
function SEO({
  title,
  description,
  canonical,
  type = "website",
  product
}) {
  reactExports.useEffect(() => {
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
    setJsonLd("organization", {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Farm72",
      url: "https://farm72.com",
      logo: "https://farm72.com/assets/images/logo.png",
      description: "Farm72 — Premium cold-pressed oils and Himalayan Buransh Juice. 100% natural, chemical-free, traditional Kacchi Ghani extraction.",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-7500010488",
        contactType: "customer service",
        availableLanguage: ["Hindi", "English"]
      },
      sameAs: ["https://wa.me/917500010488"]
    });
    if (type === "product" && product) {
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
          seller: { "@type": "Organization", name: "Farm72" }
        }
      });
      setJsonLd("breadcrumb", {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://farm72.com/"
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Shop",
            item: "https://farm72.com/shop"
          },
          { "@type": "ListItem", position: 3, name: product.name }
        ]
      });
    } else {
      removeJsonLd("product");
      removeJsonLd("breadcrumb");
    }
    return () => {
    };
  }, [title, description, canonical, type, product]);
  return null;
}
export {
  SEO as S
};
