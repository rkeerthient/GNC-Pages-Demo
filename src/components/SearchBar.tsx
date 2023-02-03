import * as React from "react";
import { FocusedItemData, SearchBar as SB } from "@yext/search-ui-react";
import {
  provideHeadless,
  Result,
  VerticalResults,
} from "@yext/search-headless-react";
import Ce_product from "../types/products";
import { ProductCard } from "./cards/ProductCard";

const visualSearcher = provideHeadless({
  apiKey: YEXT_PUBLIC_SEARCH_API_KEY,
  experienceKey: "gnc-demo",
  locale: "en",
  headlessId: "visual-search",
});

const SearchBar = () => {
  const renderEntityPreviews = (
    autocompleteLoading: boolean,
    verticalKeyToResults: Record<string, VerticalResults>,
    dropdownItemProps: {
      onClick: (
        value: string,
        _index: number,
        itemData?: FocusedItemData
      ) => void;
      ariaLabel: (value: string) => string;
    }
  ) => {
    const productResults = verticalKeyToResults["products"]
      ?.results as unknown as Result<Ce_product>[] | undefined;
    const articleResults = verticalKeyToResults["articles"]?.results;
    const categoryResults = verticalKeyToResults["categories"]?.results;
    const orderedKeys = Object.keys(verticalKeyToResults);

    return (
      <div className="fixed top-[68px] max-h-[calc(100vh-68px)] overflow-y-scroll py-4 left-0 right-0 bg-stone-100 bottom-0">
        {orderedKeys.map((key) => {
          if (key === "products" && productResults) {
            // remove products with the same name
            return productResults
              .filter(
                (product, index, self) =>
                  index === self.findIndex((p) => p.name === product.name)
              )
              .map((result) => <ProductCard key={result.id} result={result} />);
          } else {
            if (key === "categories" && categoryResults) {
              return (
                <div key="products" className="p-4">
                  <p className="mb-4 font-bold">CATEGORIES</p>
                  {categoryResults.map((result) => (
                    <p key={result.id} className="mb-4 text-sm">
                      {result.name}
                    </p>
                  ))}
                </div>
              );
            } else if (key === "articles" && articleResults) {
              return (
                <div key="articles" className="p-4">
                  <p className="mb-4 font-bold">ARTICLES</p>
                  {articleResults.map((result) => (
                    <p key={result.id} className="mb-4 text-sm">
                      {result.name}
                    </p>
                  ))}
                </div>
              );
            }
          }
        })}
      </div>
    );
  };

  return (
    <SB
      visualAutocompleteConfig={{
        entityPreviewSearcher: visualSearcher,
        includedVerticals: ["products", "articles", "categories"],
        renderEntityPreviews: renderEntityPreviews,
      }}
    />
  );
};

export { SearchBar };
