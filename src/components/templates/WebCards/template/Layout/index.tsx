import React from "react";
import FooterNav from "../Footer";
import HeaderNav from "../Header";

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