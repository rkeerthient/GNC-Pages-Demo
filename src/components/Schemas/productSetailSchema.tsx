import * as React from "react";
import { JsonLd } from "react-schemaorg";
import { Product } from "schema-dts";
import Ce_products from "../../types/products";

const Schema = (props: any) => {
  const document = props as Ce_products;

  <JsonLd<Product>
    item={{
      "@context": "https://schema.org",
      "@type": "Product",
      name: document.name,
      image: document.photoGallery && document.photoGallery[0].image.url,
      sku: document.id,
      description: document.description,
      aggregateRating: {
        "@type": "AggregateRating",
        bestRating: "5",
        ratingCount: document.c_reviewCount,
        ratingValue: document.c_rating,
      },
      offers:
        document.c_paymentOptions && document.c_paymentOptions.length >= 2
          ? {
              "@type": "AggregateOffer",
              priceCurrency: "CAD",
              lowPrice: document.c_paymentOptions[1].price,
              highPrice: document.c_paymentOptions[0].price,
            }
          : {
              "@type": "Offer",
              priceCurrency: "CAD",
              price:
                document.c_paymentOptions && document.c_paymentOptions[0].price,
            },
    }}
  />;
};

export default Schema;
