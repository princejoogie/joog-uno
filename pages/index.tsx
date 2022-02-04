import React, { useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { AiFillGithub, AiOutlineTwitter } from "react-icons/ai";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { NextSeo } from "next-seo";
import toast from "react-hot-toast";
import { createLink, generateRandomTag, UrlItem } from "@/utils/helpers";

const Home: NextPage = () => {
  const [url, setUrl] = useState("");
  const [tag, setTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<UrlItem | null>(null);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    setData(null);

    try {
      const _tag = !tag ? await generateRandomTag() : tag;
      const _data = await createLink(url.trim(), _tag.trim());
      setData(_data);
      setUrl("");
      setTag("");
      toast.success("Link created successfully");
    } catch (err) {
      const error: any = err;
      setData(null);
      toast.error(error.message);
    }

    setLoading(false);
  };

  return (
    <>
      <NextSeo title="Joog Uno | URL Shortener" description="free and fast url shortener" />

      <div className="mx-auto w-full max-w-2xl px-4">
        <form
          onSubmit={handleSubmit}
          className="flex h-screen w-full flex-col items-center justify-center space-y-4"
        >
          {data && (
            <Link href={`${window.location.origin}/${data.tag}`} passHref>
              <a target="_blank" rel="noreferrer">
                {window.location.origin}/{data.tag}
              </a>
            </Link>
          )}

          <div className="flex w-full items-center overflow-hidden rounded-md border-2 border-neutral-700 transition-colors duration-200 focus-within:border-blue-600">
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              type="text"
              placeholder="https://princecaarlo.tech/"
              className="flex-1 bg-neutral-900 px-4 py-2 outline-none"
              required
            />
            <button
              disabled={!url}
              type="submit"
              className="flex-shrink-0 bg-green-600 px-4 py-2 transition-all duration-200 hover:bg-green-500 active:opacity-70 disabled:cursor-not-allowed disabled:bg-neutral-500 disabled:active:opacity-100 lg:px-6"
            >
              {loading ? "Loading..." : "Shorten"}
            </button>
          </div>

          <div className="w-full md:w-3/4 lg:w-1/2">
            <input
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              type="text"
              placeholder="custom tag (optional)"
              className="w-full rounded-md border-2 border-neutral-700 bg-neutral-900 px-4 py-2 outline-none transition-colors duration-200 focus:border-blue-600"
            />
          </div>
        </form>
      </div>

      <div className="fixed inset-x-0 bottom-0 flex flex-col items-center justify-between space-y-1 bg-blue-600 px-4 py-2 text-sm md:flex-row md:space-y-0">
        <div>Made with 💖 and ☕ by Prince Carlo Juguilon | © {new Date().getFullYear()}</div>
        <div className="flex items-center space-x-2">
          <Link href="https://github.com/princejoogie/joog-uno" passHref>
            <a target="_blank" rel="noreferrer">
              <AiFillGithub className="h-5 w-5" />
            </a>
          </Link>

          <Link href="https://twitter.com/princecaarlo/" passHref>
            <a target="_blank" rel="noreferrer">
              <AiOutlineTwitter className="h-5 w-5" />
            </a>
          </Link>

          <Link href="https://princecaarlo.tech/" passHref>
            <a target="_blank" rel="noreferrer">
              <HiOutlineGlobeAlt className="h-5 w-5" />
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
