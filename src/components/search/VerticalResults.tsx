import * as React from "react";
import { StandardCard, VerticalResults as VR } from "@yext/search-ui-react";
import { universalResultsConfig } from "./UniversalResults";

type VerticalResultsProps = {
  verticalKey: string;
};

const VerticalResults = ({ verticalKey }: VerticalResultsProps) => {
  const CardComponent =
    universalResultsConfig[verticalKey]?.CardComponent || StandardCard;
  return (
    <VR
      customCssClasses={{
        verticalResultsContainer:
          verticalKey === "products"
            ? "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            : "",
      }}
      CardComponent={CardComponent}
    />
  );
};

export { VerticalResults };
