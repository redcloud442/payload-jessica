import React from "react";
import Header from "@/components/landing-page/header/Header";
import Introduction from "@/components/landing-page/introduction/Introduction";
import Portfolio from "@/components/landing-page/portfolio/portfolio";
import Contact from "@/components/landing-page/contact/contact";

export default async function HomePage() {
  return (
    <>
      <Header />
      <Introduction />
      <Portfolio />
      <Contact />
    </>
  );
}
