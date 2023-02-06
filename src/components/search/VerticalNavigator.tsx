import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import * as React from "react";
import { twMerge } from "tailwind-merge";
import { useSearchActions } from "@yext/search-headless-react";
import { universalResultsConfig } from "./UniversalResults";

export type Vertical = {
  label: string;
  verticalKey?: string;
  count?: number;
};

type VerticalNavigatorProps = {
  verticals: Vertical[];
};

const VerticalNavigator = ({ verticals }: VerticalNavigatorProps) => {
  const searchActions = useSearchActions();

  const [activeVertical, setActiveVertical] = React.useState<{
    label: string;
    verticalKey?: string;
  }>(verticals[0]);

  const handleVerticalClick = (vertical: Vertical) => {
    setActiveVertical(vertical);
    if (vertical.verticalKey) {
      searchActions.setVertical(vertical.verticalKey);
      searchActions.executeVerticalQuery();
    } else {
      searchActions.setUniversal();
      searchActions.setRestrictVerticals(Object.keys(universalResultsConfig));
      searchActions.executeUniversalQuery();
    }
  };

  return (
    <>
      <div className="hidden sm:flex px-4 my-4 border-b-2 border">
        {verticals.map((vertical) => (
          <button
            key={`nav-button-${vertical}`}
            className={twMerge(
              "flex justify-center items-center px-6 py-2 border-b-2 hover:bg-gray-100",
              activeVertical.label === vertical.label
                ? "border-black"
                : "border-transparent"
            )}
            onClick={() => handleVerticalClick(vertical)}
          >
            <p className="text-sm">
              {vertical.label}
              {vertical.count && (
                <span className="ml-0.5">{`(${vertical.count})`}</span>
              )}
            </p>
          </button>
        ))}
      </div>
      {/* <Menu
        as="div"
        className="sm:hidden relative inline-block text-left pl-4 my-4"
      >
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-gray-100">
            {activeVertical.label}
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={React.Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Account settings
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Support
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    License
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu> */}
    </>
  );
};

export { VerticalNavigator };

// {
//   verticals.map((vertical) => (
//     <Menu.Item key={`${vertical}-navitem-mobile`}>
//       {({ active }) => (
//         <a
//           href="#"
//           className={twMerge(
//             // active ? "bg-gray-100 text-gray-900" : "text-gray-700",
//             "block px-4 py-2 text-sm text-red"
//           )}
//         >
//           {/* {vertical.label} */}
//           test
//         </a>
//       )}
//     </Menu.Item>
//   ));
// }
