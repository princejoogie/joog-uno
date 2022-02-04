import React, { useEffect } from "react";
import { getItemByTag } from "@/utils/helpers";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

const TagComponent = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace("/");
    }, 3000);
  }, []);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <h1>404 - tag not found</h1>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tag } = context.params as { tag: string };
  const data = await getItemByTag(tag);

  if (!data) {
    return {
      props: {},
      redirect: {
        destination: "/",
        statusCode: 301,
      },
    };
  }

  return {
    props: {},
    redirect: {
      destination: data.url,
      statusCode: 301,
    },
  };
};

export default TagComponent;
