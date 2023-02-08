import {
  provideHeadless,
  SearchHeadlessProvider,
} from "@yext/search-headless-react";
import * as React from "react";
import { Header } from "./GncHeader";
import { Category } from "./mobile/MobileMenu";

type Props = {
  _site: Category;
  children?: React.ReactNode;
};

const searcher = provideHeadless({
  apiKey: YEXT_PUBLIC_SEARCH_API_KEY,
  experienceKey: "gnc-demo",
  locale: "en",
});

const PageLayout = ({ _site, children }: Props) => {
  return (
    <SearchHeadlessProvider searcher={searcher}>
      <div className="min-h-screen max-w-[1440px] mx-auto">
        <Header rootCategory={_site} />
        {children}
        {/* <Footer _site={_site}></Footer> */}
      </div>
    </SearchHeadlessProvider>
  );
};

export default PageLayout;
