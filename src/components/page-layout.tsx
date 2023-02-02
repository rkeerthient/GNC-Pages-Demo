import * as React from "react";
import { Header, HeaderProps } from "./GncHeader";
import { Category } from "./MobileMenu";

type Props = {
  _site: Category;
  children?: React.ReactNode;
};

const PageLayout = ({ _site, children }: Props) => {
  return (
    <div className="min-h-screen">
      <Header rootCategory={_site} />
      {children}
      {/* <Footer _site={_site}></Footer> */}
    </div>
  );
};

export default PageLayout;
