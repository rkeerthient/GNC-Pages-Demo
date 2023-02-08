import * as React from "react";
import { useState } from "react";
import { Link } from "../Breadcrumbs";

type DepartmentListProps = {
  departmentLinks?: Link[];
};

const DepartmentList = ({ departmentLinks }: DepartmentListProps) => {
  if (!departmentLinks) return <></>;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <p>
        <button
          type="button"
          className="text-sm font-medium text-gray-700 hover:text-gray-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          Departments
        </button>
      </p>
      <div className="mt-2">
        <div className="max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          {departmentLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export { DepartmentList };
