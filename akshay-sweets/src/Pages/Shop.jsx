import React from "react";
import { Popular } from "../components/Popular/Popular";
import { Home } from "../components/Home/Home";
import { NewsLetter } from "../components/News letter/NewsLetter";
import { OfferBanner } from "../components/OfferBanner/OfferBanner";

export const Shop = () => {
  return (
    <div>
      <Home />
      <Popular />
      <OfferBanner />
      <NewsLetter />
    </div>
  );
};
