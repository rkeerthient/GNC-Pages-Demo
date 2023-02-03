import { Image } from "@yext/pages/components";
import { CardProps } from "@yext/search-ui-react";
import * as React from "react";
import Ce_product from "../../types/products";

const ProductCard = ({ result }: CardProps<Ce_product>) => {
  const product = result.rawData;
  const productImage = product.photoGallery?.[0];

  return (
    <div className="p-4">
      <div className="flex">
        <div>
          {productImage && (
            <Image layout="fixed" height={89} width={89} image={productImage} />
          )}
        </div>
        <div className="pl-3">
          <p className="ml-2 mb-2 pt-1 font-bold">{product.name}</p>
          <p className="ml-2 mb-2 pt-1">{`$${product.c_price}`}</p>
        </div>
      </div>
    </div>
  );
};

export { ProductCard };
