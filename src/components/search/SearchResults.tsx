import * as React from "react";
import {
  FieldValueStaticFilter,
  useSearchActions,
  useSearchState,
} from "@yext/search-headless-react";
import { useEffect, useState } from "react";
import { UniversalResults, universalResultsConfig } from "./UniversalResults";
import { VerticalNavigator } from "./VerticalNavigator";
import { VerticalResults } from "./VerticalResults";

type SearchResultsProps = {
  initialFilter?: FieldValueStaticFilter;
  initialVerticalKey?: string;
  categoryName?: string;
};

const SearchResults = ({
  initialFilter,
  initialVerticalKey,
  categoryName,
}: SearchResultsProps) => {
  const searchActions = useSearchActions();
  const [urlQuery, setUrlQuery] = useState<string | null>(null);
  const [verticals, setVerticals] = useState<
    {
      label: string;
      verticalKey?: string;
      count?: number;
    }[]
  >([{ label: "All" }]);

  const universalResults = useSearchState((state) => state.universal.verticals);
  const isUniversalSearch = useSearchState(
    (state) => state.meta.searchType === "universal"
  );
  const verticalKey = useSearchState((state) => state.vertical.verticalKey);

  // when this component is mounted, grab the query from the URL and perform a search
  useEffect(() => {
    const query = new URLSearchParams(window.location.search).get("query");
    if (query) {
      searchActions.setQuery(query);
      setUrlQuery(query);
    }

    if (initialVerticalKey) {
      searchActions.setVertical(initialVerticalKey);
      initialFilter &&
        searchActions.setStaticFilters([
          { filter: initialFilter, selected: true },
        ]);
      searchActions.executeVerticalQuery();
    } else {
      searchActions.setRestrictVerticals(Object.keys(universalResultsConfig));
      searchActions.setUniversalLimit({ categories: 5, products: 4 });
      searchActions.executeUniversalQuery();
    }
  }, []);

  useEffect(() => {
    if (universalResults) {
      const newVerticals = universalResults.map((verticalResults) => {
        // first char as uppercase and the rest as lowercase
        const label =
          verticalResults.verticalKey[0].toUpperCase() +
          verticalResults.verticalKey.slice(1).toLowerCase();

        return {
          label,
          verticalKey: verticalResults.verticalKey,
          count: verticalResults.resultsCount,
        };
      });
      setVerticals([{ label: "All" }, ...newVerticals]);
    }
  }, [universalResults]);

  const renderPageHeading = () => {
    if (urlQuery) {
      return (
        <div className="flex justify-center ">
          <h1 className="py-5 ">
            You Searched For...
            <span className="font-semibold">{`"${urlQuery}"`}</span>
          </h1>
        </div>
      );
    } else if (categoryName) {
      return (
        <div className="flex justify-center ">
          <h1 className="py-5 font-semibold">{categoryName.toUpperCase()}</h1>
        </div>
      );
    }
  };

  return (
    <div className="py-4">
      {renderPageHeading()}
      {!initialFilter && <VerticalNavigator verticals={verticals} />}
      {isUniversalSearch && <UniversalResults />}
      {verticalKey && <VerticalResults verticalKey={verticalKey} />}
    </div>
  );
};

export { SearchResults };
