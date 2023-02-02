import * as React from "react";
import { Header } from "./header";

type Props = {
  children?: React.ReactNode;
};

const PageLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen">
      {/* <Header /> */}
      {children}
      {/* <Footer _site={_site}></Footer> */}
    </div>
  );
};

export default PageLayout;
