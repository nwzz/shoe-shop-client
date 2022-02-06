import React from "react";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="bg-primary h-screen w-screen grid grid-cols-1 grid-rows-layout max-w-screen-2xl xl:max-w-screen-3xl mx-auto">
      <Header />
      <div className="grid overflow-hidden grid-cols-1">
        <div className="overflow-y-auto">
          <section className="h-full">
            <div className="max-w-full px-2 sm:px-8 h-full">{children}</div>
          </section>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
