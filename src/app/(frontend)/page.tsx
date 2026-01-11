import React from "react";
import Header from "@/components/landing-page/header/Header";
import Introduction from "@/components/landing-page/introduction/Introduction";
import Portfolio from "@/components/landing-page/portfolio/portfolio";
import Contact from "@/components/landing-page/contact/contact";
import BrandsWorkFor from "@/components/landing-page/brands/BrandsWorkFor";

export default async function HomePage() {
  return (
    <>
      <Header />
      <Introduction />
      <BrandsWorkFor />
      <Portfolio />
      <Contact />
    </>
  );
}
