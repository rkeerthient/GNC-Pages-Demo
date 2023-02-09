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
import { Breadcrumbs, Link } from "../Breadcrumbs";
import { DepartmentList } from "./DepartmentList";
import { SortDropdown } from "./SortDropdown";
import {
  NumericalFacets,
  Pagination,
  StandardFacets,
} from "@yext/search-ui-react";

type SearchResultsProps = {
  initialFilter?: FieldValueStaticFilter;
  initialVerticalKey?: string;
  categoryName?: string;
  categoryDescription?: string;
  breadcrumbLinks?: Link[];
  subCategoryLinks?: Link[];
};

const SearchResults = ({
  initialFilter,
  initialVerticalKey,
  categoryName,
  categoryDescription,
  breadcrumbLinks,
  subCategoryLinks,
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
  const resultsCount = useSearchState((state) => state.vertical.resultsCount);
  const searchLoading = useSearchState((state) => state.searchStatus.isLoading);

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

  return (
    <div className="p-4">
      {breadcrumbLinks && <Breadcrumbs links={breadcrumbLinks} />}
      {!initialFilter && <VerticalNavigator verticals={verticals} />}
      {isUniversalSearch && <UniversalResults />}
      {verticalKey && (
        <div className="flex py-4">
          <div className="w-1/5 mt-12">
            <DepartmentList departmentLinks={subCategoryLinks} />
            <div className="w-full h-px bg-gray-200 my-4" />

            <StandardFacets excludedFieldIds={["c_parentCategory.name"]} />
            <NumericalFacets />
          </div>
          <div className="w-4/5">
            <div className="flex justify-between my-2.5">
              <div className="flex space-x-4 items-center">
                <h2 className="text-2xl font-semibold">{categoryName}</h2>
                {!searchLoading && (
                  <p className="text-xs text-gray-500">{`(${resultsCount} Results)`}</p>
                )}
              </div>
              <SortDropdown />
            </div>
            <p className="text-lg text-gray-500 mb-2.5">
              {categoryDescription}
            </p>

            <VerticalResults verticalKey={verticalKey} />
            <Pagination
              customCssClasses={{
                paginationContainer: "pt-12 pb-4",
                selectedLabel: "bg-gray-900 text-white",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export { SearchResults };
