import React from "react";
import FooterNav from "../footer";
import HeaderNavVertical from "../headervertical";

export default function Layout(props: any) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="lg:flex lg:flex-row">
        <div className="lg:flex lg:flex-col">
          <HeaderNavVertical color={props.color}/>
        </div>
        <div className="lg:flex lg:flex-col">
          <main className="flex-1">

            {props.children}
          </main>
        </div>
      </div>
      <FooterNav color={props.color}/>
    </div>
  );
}