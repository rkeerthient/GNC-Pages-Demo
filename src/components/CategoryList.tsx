import * as React from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Category } from "./mobile/MobileMenu";

type CategoryProps = {
  panelIdx: number;
  category: Category;
  handleSubCategoryClick?: (subCategory: Category, panelIdx: number) => void;
  // handleSubCategoryClick?: (subCategory: Category) => void;
  handleExitHover?: () => void;
};

const CategoryList = ({
  panelIdx,
  category,
  handleSubCategoryClick,
}: CategoryProps) => {
  return (
    <div className="w-1/3 bg-white shadow overflow-y-auto max-h-[calc(100vh-64px)] z-50">
      <ul role="list" className="py-4 flex flex-col">
        {category.subCategories?.map((subCat) => (
          <div
            key={`${subCat.id}-desktop`}
            className="px-4 py-2 hover:bg-gray-200"
            onMouseEnter={() =>
              handleSubCategoryClick && subCat.subCategories
                ? handleSubCategoryClick(subCat, panelIdx)
                : null
            }
            // TODO: see if you can figure out hover instead of click
          >
            <div className="flex justify-between">
              <p
                id={`${subCat.id}-heading-mobile`}
                className="font-semibold text-gray-900 text-base text-left"
              >
                {subCat.name}
              </p>
              {subCat.subCategories && <ChevronRightIcon className="h-6 w-6" />}
              {subCat.logo && (
                // <Image
                //   width={125}
                //   height={80}
                //   layout="fixed"
                //   image={subCategory.logo}
                // />
                // TODO: fix image
                <></>
              )}
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export { CategoryList };
