import * as React from "react";
import {
  NumericalFacets,
  Pagination,
  StandardCard,
  StandardFacets,
  VerticalResults as VR,
} from "@yext/search-ui-react";
import { universalResultsConfig } from "./UniversalResults";
import { useSearchState } from "@yext/search-headless-react";
import { DepartmentList } from "./DepartmentList";
import { SortDropdown } from "./SortDropdown";
import { Link } from "../Breadcrumbs";
import { Transition } from "@headlessui/react";
import { useEffect, useState } from "react";

type VerticalResultsProps = {
  verticalKey: string;
  categoryDescription?: string;
  categoryName?: string;
  subCategoryLinks?: Link[];
};

const VerticalResults = ({
  verticalKey,
  categoryDescription,
  categoryName,
  subCategoryLinks,
}: VerticalResultsProps) => {
  const CardComponent =
    universalResultsConfig[verticalKey]?.CardComponent || StandardCard;

  const [showResults, setShowResults] = useState(false);

  const searchLoading = useSearchState((state) => state.searchStatus.isLoading);
  const resultsCount = useSearchState((state) => state.vertical.resultsCount);

  useEffect(() => {
    !searchLoading && setShowResults(true);
  }, [searchLoading]);

  return (
    <Transition
      show={showResults}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
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
          {categoryDescription && (
            <p className="text-lg text-gray-500 mb-2.5">
              {categoryDescription}
            </p>
          )}
          <VR
            customCssClasses={{
              verticalResultsContainer:
                verticalKey === "products"
                  ? "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                  : "",
            }}
            CardComponent={CardComponent}
          />
          <Pagination
            customCssClasses={{
              paginationContainer: "pt-12 pb-4",
              selectedLabel: "bg-gray-900 text-white",
            }}
          />
        </div>
      </div>
    </Transition>
  );
};

export { VerticalResults };
