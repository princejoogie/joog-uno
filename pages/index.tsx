import React from "react";
import type { NextPage } from "next";
import { NextSeo } from "next-seo";

const Home: NextPage = () => {
  return (
    <>
      <NextSeo title="Suggestion Bot" description="discord bot for suggesting new features" />

      <div className="flex h-screen w-screen items-center justify-center">
        <h1>Hello World</h1>
      </div>
    </>
  );
};

export default Home;
