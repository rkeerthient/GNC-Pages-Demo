import * as React from "react";
import { Image, Link } from "@yext/pages/components";
import type { CTA, Image as ImageType } from "@yext/types";
import { MobileMenu } from "./MobileMenu";
/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useState } from "react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const root = {
  id: "shoes",
  subCategories: [
    {
      id: "shop",
      name: "SHOP",
      subCategories: [
        { id: "1", name: "Herbs & Natural Supplements", href: "#" },
        { id: "2", name: "Food Drink & Prepared Meals", href: "#" },
        { id: "3", name: "Weight Management", href: "#" },
        { id: "4", name: "Performance", href: "#" },
        { id: "5", name: "Vitamins & Supplements", href: "#" },
        { id: "6", name: "Equipment & Accessories", href: "#" },
        { id: "7", name: "Protein Supplements", href: "#" },
        { id: "8", name: "Beauty & Skin Care", href: "#" },
        { id: "9", name: "Superfoods & Green Food", href: "#" },
        { id: "10", name: "Digestion", href: "#" },
        { id: "11", name: "New Arrivals", href: "#" },
        {
          id: "12",
          name: "Best Sellers",
          href: "#",
          subCategories: [
            { id: "13", name: "Protein", href: "#" },
            { id: "14", name: "Herbs & Greens", href: "#" },
            { id: "15", name: "Vitamins & Supplements", href: "#" },
            { id: "16", name: "Food & Drink", href: "#" },
          ],
        },
      ],
    },
    { id: "routines", name: "GNC Routines", href: "#" },
    {
      id: "brands",
      name: "BRANDS",
      subCategories: [
        {
          id: "17",
          name: "Everything",
          href: "#",
          logo: {
            url: "https://cdn-fsly.yottaa.net/5b9fc7760b534475fab84ce9/www.gnc.com/v~4b.8a/on/demandware.static/-/Sites-site-catalog-gnc-2-us/default/dwfd929f72/brand-menu_gnc-rd.svg?yocs=19_1d_",
            width: 300,
            height: 113,
          },
        },
        { id: "18", name: "Core", href: "#" },
        { id: "19", name: "New Arrivals", href: "#" },
        { id: "20", name: "Sale", href: "#" },
      ],
    },
    {
      id: "deals",
      name: "DEALS",
      // dm_directoryChildren: [
      //   { name: "Everything", href: "#" },
      //   { name: "Core", href: "#" },
      //   { name: "New Arrivals", href: "#" },
      //   { name: "Sale", href: "#" },
      // ],
    },
    {
      id: "gnc-routines",
      name: "GNC ROUTINES",
      // dm_directoryChildren: [
      //   { name: "Everything", href: "#" },
      //   { name: "Core", href: "#" },
      //   { name: "New Arrivals", href: "#" },
      //   { name: "Sale", href: "#" },
      // ],
    },
  ],
};

const Test = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <MobileMenu category={root} open={open} setOpen={setOpen} />

      <header className="relative bg-white">
        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center justify-between">
              <div className="flex flex-1 items-center lg:hidden">
                <button
                  type="button"
                  className="-ml-2 rounded-md bg-white p-2 text-gray-400"
                  onClick={() => setOpen(true)}
                >
                  <span className="sr-only">Open menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>

                <a
                  href="#"
                  className="ml-2 p-2 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Search</span>
                  <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                </a>
              </div>

              {/* Logo */}
              <a href="#" className="flex">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </a>

              <div className="flex flex-1 items-center justify-end">
                <a
                  href="#"
                  className="hidden text-gray-700 hover:text-gray-800 lg:flex lg:items-center"
                >
                  <img
                    src="https://tailwindui.com/img/flags/flag-canada.svg"
                    alt=""
                    className="block h-auto w-5 flex-shrink-0"
                  />
                  <span className="ml-3 block text-sm font-medium">CAD</span>
                  <span className="sr-only">, change currency</span>
                </a>

                {/* Search */}
                <a
                  href="#"
                  className="ml-6 hidden p-2 text-gray-400 hover:text-gray-500 lg:block"
                >
                  <span className="sr-only">Search</span>
                  <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                </a>

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
        </nav>
      </header>
    </div>
  );
};

export { Test };
