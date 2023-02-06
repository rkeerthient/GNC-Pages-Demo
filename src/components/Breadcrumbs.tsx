import * as React from "react";

export type Link = {
  name: string;
  href: string;
  current: boolean;
};

type BreadcrumbsProps = {
  links: Link[];
};

const Breadcrumbs = ({ links }: BreadcrumbsProps) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        {links.map((link, idx) => (
          <li key={link.name}>
            <div className="flex items-center">
              {idx !== 0 && (
                <svg
                  className="h-5 w-5 flex-shrink-0 text-gray-300"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                </svg>
              )}
              <a
                href={link.href}
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                aria-current={link.current ? "page" : undefined}
              >
                {link.name}
              </a>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export { Breadcrumbs };
