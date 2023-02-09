import { Image } from "@yext/pages/components";
import { CardProps } from "@yext/search-ui-react";
import * as React from "react";
import { twMerge } from "tailwind-merge";
import Ce_product from "../../types/products";
import { ProductPricing } from "../ProductPricing";
import { ProductReview } from "../ProductReview";

type ProductCardProps = CardProps<Ce_product> & {
  autocomplete?: boolean;
};

const ProductCard = ({ result, autocomplete }: ProductCardProps) => {
  const product = result.rawData;
  const productImage = product.photoGallery?.[0];

  return (
    <div className="p-4">
      <div
        className={twMerge(
          "inline-flex flex-col",
          autocomplete ? "flex-row" : "h-[500px] justify-between"
        )}
      >
        <div className={twMerge(autocomplete ? "flex" : "")}>
          <div
            className={twMerge(
              "",
              autocomplete ? "h-20 w-20 sm:mx-auto mr-4" : ""
            )}
          >
            {productImage && (
              <Image
                layout={autocomplete ? "fixed" : "intrinsic"}
                height={89}
                width={89}
                image={productImage}
              />
            )}
          </div>
          <div className="pl-3">
            <p className="text-xs font-bold">
              {product.c_brand?.toUpperCase()}
            </p>
            <a
              href={product.slug}
              className="mb-2 pt-1 text-lg text-zinc-900 hover:underline"
            >
              {product.name}
            </a>
            {product.c_paymentOptions && (
              <ProductPricing
                c_paymentOptions={product.c_paymentOptions}
                autocomplete={autocomplete}
              />
            )}
            {!autocomplete && (
              <>
                {product.c_rating && (
                  <ProductReview
                    rating={product.c_rating}
                    reviewCount={product.c_reviewCount}
                  />
                )}
              </>
            )}
          </div>
        </div>
        {!autocomplete && (
          <div className="pl-3">
            <a
              href={product.slug}
              className="px-8 py-4 font-semibold border border-zinc-900 text-sm hover:bg-zinc-900 hover:text-white"
            >
              VIEW OPTIONS
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export { ProductCard };
