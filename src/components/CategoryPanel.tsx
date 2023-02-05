import * as React from "react";
import { Fragment, useEffect, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Category } from "./mobile/MobileMenu";
import { twMerge } from "tailwind-merge";
import { CategoryList } from "./CategoryList";

type CategoryPanelProps = {
  rootCategory?: Category;
};

const CategoryPanel = ({ rootCategory }: CategoryPanelProps) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [sidePanels, setSidePanels] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState("");

  const handleSubCategoryClick = (subCategory: Category, panelIdx: number) => {
    if (subCategory.subCategories) {
      if (panelIdx === sidePanels.length) {
        setSidePanels([...sidePanels, subCategory]);
      } else {
        setSidePanels(sidePanels.slice(0, panelIdx).concat(subCategory));
      }
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
        <div className="relative flex z-10">
          <Popover.Button
            className={twMerge(
              activeCategory === category.name
                ? "border-black"
                : "border-transparent",
              "relative z-10 -mb-px flex items-center border-b-4 pt-px text-sm font-semibold transition-colors duration-200 ease-out text-black"
            )}
            onMouseEnter={() => {
              setSidePanels([]);
              setActiveCategory(category.name || "");
            }}
          >
            {category.name}
          </Popover.Button>
        </div>

        <Transition
          as={Fragment}
          show={activeCategory === category.name}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Panel className="absolute inset-x-0 top-full text-gray-500 sm:text-sm z-50">
            <div
              className="relative flex"
              onMouseLeave={() => {
                setSidePanels([]);
                setActiveCategory("");
              }}
            >
              <CategoryList
                panelIdx={0}
                category={category}
                handleSubCategoryClick={handleSubCategoryClick}
              />
              {/* TODO: add animation and 3rd panel */}
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
    <>
      {activeCategory !== "" && (
        // TODO: fade out
        <div className="fixed top-16 bottom-0 left-0 right-0 bg-gray-500 z-10 h-full opacity-40" />
      )}
      <div className="hidden h-full lg:flex">
        {/* Mega menus */}
        <Popover.Group className="ml-2">
          <div className="flex h-full justify-center space-x-8">
            {rootCategory?.subCategories?.map((category) => (
              <Popover key={category.name} className="flex">
                {({ open }) => renderPopoverContents(category, open)}
              </Popover>
            ))}
          </div>
        </Popover.Group>
      </div>
    </>
  );
};

export { CategoryPanel };
