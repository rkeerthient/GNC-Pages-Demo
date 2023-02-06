import { CardProps } from "@yext/search-ui-react";
import * as React from "react";
import Ce_article from "../../types/articles";

const ArticleCard = ({ result }: CardProps<Ce_article>) => {
  const article = result.rawData;

  return (
    <div className="flex px-4 py-1">
      <p className="hover:underline text-sm">{article.name}</p>
    </div>
  );
};

export { ArticleCard };
