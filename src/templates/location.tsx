// locator.tsx

import * as React from "React";
import "../index.css";
import {
  GetHeadConfig,
  GetPath,
  HeadConfig,
  Template,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import PageLayout from "../components/page-layout";
import {
  provideHeadless,
  SandboxEndpoints,
  SearchHeadlessProvider,
} from "@yext/search-headless-react";
import { FilterSearch } from "@yext/search-ui-react";
import StoreLocator from "../components/StoreLocator";

export const getPath: GetPath<TemplateProps> = () => {
  return `locator`;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: document.description,
        },
      },
    ],
  };
};
const searcher = provideHeadless({
  apiKey: "90832656125b2558b20d7598b2fbda28",
  experienceKey: "gnc-demo",
  locale: "en",
  verticalKey: "locations",
});

const Locator: Template<TemplateRenderProps> = () => {
  return (
    // <PageLayout _site={undefined}>
    <SearchHeadlessProvider searcher={searcher}>
      <div className="mx-auto max-w-7xl px-4">
        <StoreLocator />
      </div>
    </SearchHeadlessProvider>
    // </PageLayout>
  );
};

export default Locator;
