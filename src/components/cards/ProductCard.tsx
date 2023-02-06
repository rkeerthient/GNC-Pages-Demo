import { Image } from "@yext/pages/components";
import { CardProps } from "@yext/search-ui-react";
import * as React from "react";
import { twMerge } from "tailwind-merge";
import Ce_product from "../../types/products";

type ProductCardProps = CardProps<Ce_product> & {
  autocomplete?: boolean;
};

const ProductCard = ({ result, autocomplete }: ProductCardProps) => {
  const product = result.rawData;
  const productImage = product.photoGallery?.[0];

  const handleProductClick = () => {
    if (product.slug) {
      window.location.href = product.slug;
    }
  };

  return (
    <button className="p-4 hover:bg-gray-100" onClick={handleProductClick}>
      <div
        className={twMerge(
          "inline-flex flex-col",
          autocomplete ? "flex-row" : ""
        )}
      >
        <div
          className={twMerge("", autocomplete ? "h-20 w-20 sm:mx-auto" : "")}
        >
          {productImage && (
            <Image
              // layout="fixed" height={89} width={89}
              image={productImage}
            />
          )}
        </div>
        <div className="pl-3">
          <p className="ml-2 mb-2 pt-1 font-bold">{product.name}</p>
          {/* <p className="ml-2 mb-2 pt-1">{`$${product.c_price}`}</p> */}
        </div>
      </div>
    </button>
  );
};

export { ProductCard };
