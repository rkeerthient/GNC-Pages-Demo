import { CardProps } from "@yext/search-ui-react";
import * as React from "react";
import Ce_category from "../../types/categories";

const CategoryCard = ({ result }: CardProps<Ce_category>) => {
  const category = result.rawData;

  return (
    <div className="flex px-4 py-1">
      <a href={category.slug} className="hover:underline text-sm">
        {category.name}
      </a>
    </div>
  );
};

export { CategoryCard };
