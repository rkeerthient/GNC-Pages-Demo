import * as React from "react";
import { Category, MobileMenu } from "./mobile/MobileMenu";
import { useState } from "react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { CategoryPanel } from "./CategoryPanel";
import { ComplexImageType } from "@yext/pages/components";
import { MobileSearch } from "./mobile/MobileSearch";
import { Image } from "@yext/pages/components";
import { twMerge } from "tailwind-merge";
import { SearchBar } from "./SearchBar";

export type HeaderProps = {
  rootCategory: Category;
  logo?: ComplexImageType;
};

const Header = ({ rootCategory }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleMobileSearchIconClick = () => {
    setMobileSearchOpen(!mobileSearchOpen);
  };

  const handleSearchIconClick = () => {
    setSearchOpen(!searchOpen);
  };

  return (
    <div className="bg-white">
      <MobileSearch open={mobileSearchOpen} setOpen={setMobileSearchOpen} />
      <MobileMenu
        category={rootCategory}
        open={mobileMenuOpen}
        setOpen={setMobileMenuOpen}
      />
      <header className="relative bg-white z-10">
        {/* <Transition
          show={searchOpen}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="translate-x-0"
          enterTo="-translate-x-1/2"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="-translate-x-1/2"
          leaveTo="translate-x-0"
        > */}
        <div
          className={twMerge(
            "absolute -z-10",
            searchOpen ? "left-4" : "left-1/2"
          )}
        >
          <div
            className={twMerge(
              "h-16 flex justify-center items-center"
              // searchOpen ? "ml-4" : ""
            )}
          >
            <div>
              {rootCategory.logo && (
                <Image className="h-8 w-auto" image={rootCategory.logo} />
              )}
            </div>
          </div>
        </div>
        {/* </Transition> */}

        <nav aria-label="Top" className="mx-auto px-6 ">
          <div className="">
            <div className="h-16 items-center justify-between grid grid-cols-2">
              <div className="flex flex-1 items-center lg:hidden">
                <button
                  type="button"
                  className="-ml-2 rounded-md bg-white p-2 text-gray-400"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <span className="sr-only">Open menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>

                <button
                  onClick={() => handleMobileSearchIconClick()}
                  className="ml-2 p-2 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Search</span>
                  <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {!searchOpen && <CategoryPanel rootCategory={rootCategory} />}

              <div className={twMerge("flex", searchOpen ? "col-span-2" : "")}>
                <div className="flex flex-1 items-center justify-end">
                  {/* Search */}
                  {searchOpen ? (
                    <div className="my-auto max-w-sm w-full">
                      <SearchBar
                        customCssClasses={{ searchBarContainer: "mb-0" }}
                      />
                    </div>
                  ) : (
                    <button
                      className="ml-6 hidden p-2 text-gray-400 hover:text-gray-500 lg:block"
                      onClick={() => handleSearchIconClick()}
                    >
                      <span className="sr-only">Search</span>
                      <MagnifyingGlassIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                      />
                    </button>
                  )}

                  {/* Account */}
                  <a
                    href="#"
                    className="p-2 text-gray-400 hover:text-gray-500 lg:ml-4"
                  >
                    <span className="sr-only">Account</span>
                    <UserIcon className="h-6 w-6" aria-hidden="true" />
                  </a>

                  {/* Cart */}
                  <div className="ml-4 flow-root lg:ml-6">
                    <a href="#" className="group -m-2 flex items-center p-2">
                      <ShoppingBagIcon
                        className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                        0
                      </span>
                      <span className="sr-only">items in cart, view bag</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export { Header };
