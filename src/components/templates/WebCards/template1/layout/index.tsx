import React from "react";
import FooterNav from "../footer";
import HeaderNav from "../header";

export default function Layout(props: any) {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderNav color={props.color}/>
      <main className="flex-1">
        {props.children}
      </main>
      <FooterNav color={props.color}/>
    </div>
  );
}