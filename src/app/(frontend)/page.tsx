import React from "react";
import Header from "@/components/landing-page/header/Header";
import Introduction from "@/components/landing-page/introduction/Introduction";

export default async function HomePage() {
  return (
    <>
      <Header />
      <Introduction />
    </>
  );
}
