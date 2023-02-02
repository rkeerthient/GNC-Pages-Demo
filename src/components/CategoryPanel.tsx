import * as React from "react";
import { Fragment, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Category } from "./MobileMenu";
import { twMerge } from "tailwind-merge";
import { CategoryList } from "./CategoryList";

type CategoryPanelProps = {
  rootCategory?: Category;
};

const CategoryPanel = ({ rootCategory }: CategoryPanelProps) => {
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const [sidePanels, setSidePanels] = React.useState<Category[]>([]);

  const handleSubCategoryClick = (subCategory: Category, panelIdx: number) => {
    if (panelIdx === sidePanels.length && subCategory.subCategories) {
      setSidePanels([...sidePanels, subCategory]);
    }
  };

  const handleExitPanel = () => {
    if (sidePanels.length > 0) {
      const previousCategory = sidePanels.pop() as Category;
      setSidePanels(sidePanels);
    }
  };

  useEffect(() => {
    if (!popoverOpen) {
      setSidePanels([]);
    }
  }, [popoverOpen]);

  const renderPopoverContents = (category: Category, open: boolean) => {
    setPopoverOpen(open);
    return (
      <>
        <div className="relative flex">
          <Popover.Button
            className={twMerge(
              open
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-gray-700 hover:text-gray-800",
              "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
            )}
          >
            {category.name}
          </Popover.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Panel className="absolute inset-x-0 top-full text-gray-500 sm:text-sm max-w-7xl mx-auto">
            <div className="relative sm:px-6 lg:px-8 flex">
              <CategoryList
                panelIdx={0}
                category={category}
                handleSubCategoryClick={handleSubCategoryClick}
              />
              {sidePanels.length > 0 &&
                sidePanels.map((sidePanel, sidePanelIdx) => (
                  <CategoryList
                    panelIdx={sidePanelIdx + 1}
                    key={`${sidePanelIdx}-side-panel`}
                    category={sidePanel}
                  />
                ))}
            </div>
          </Popover.Panel>
        </Transition>
      </>
    );
  };

  return (
    <div className="hidden h-full lg:flex">
      {/* Mega menus */}
      <Popover.Group className="ml-8">
        <div className="flex h-full justify-center space-x-8">
          {rootCategory?.subCategories?.map((category) => (
            <Popover key={category.name} className="flex">
              {({ open }) => renderPopoverContents(category, open)}
            </Popover>
          ))}
        </div>
      </Popover.Group>
    </div>
  );
};

export { CategoryPanel };
