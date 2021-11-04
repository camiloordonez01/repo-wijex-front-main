import React from "react";
import FooterNav from "../../organisms/Layout/Footer";
import HeaderNav from "../../organisms/Layout/Header";

export default function Layout(props: any) {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderNav />
      <main className="flex-1">
        {props.children}
      </main>
      <FooterNav />
    </div>
  )
}