"use client";

import Image from "next/image";
import { Input } from "../../ui/input";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

interface CustomInputProps {
  route: string;
  iconPosition: string;
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
}

const LocalSearch = ({
  route,
  iconPosition,
  imgSrc,
  placeholder,
  otherClasses,
}: CustomInputProps) => {
  const router = useRouter();
  const pathname = usePathname(); // we use the usePathname hook to get the current pathname, e.g: after /
  const searchParams = useSearchParams(); // we use the useSearchParams hook to get the query string, e.g: after /?q=

  const query = searchParams.get("q"); // e.g: "something" in /?q=something
  // console.log(query);
  // console.log(searchParams); // URLSearchParams { q -> "something" }

  const [search, setSearch] = useState(query || "");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // If there is a search query
      if (search) {
        // We create a new URL by appending or updating the "q" key with the current search query
        const newUrl = formUrlQuery({
          queryString: searchParams.toString(), // This extracts the query string from the current URL
          key: "q", // This is the key we want to update
          value: search, // This is the value we want to set
        });

        // We use the router to navigate to the new URL
        router.push(newUrl, { scroll: false }); // This scrolls to the top of the page after the navigation
      } else {
        // If there is no search query and we are on the specified route
        // console.log(`pathname: ${pathname}, route: ${route}`);
        if (pathname === route) {
          // We remove the "q" key from the URL
          const newUrl = removeKeysFromQuery({
            queryString: searchParams.toString(),
            keysToRemove: ["q"],
          });

          // We navigate to the new URL
          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);

    // This function cleans up the effect, it's called when the component unmounts or when the effect dependencies change
    return () => clearTimeout(delayDebounceFn);
  }, [search, route, pathname, router, searchParams, query]); // The effect dependencies, these are the variables that trigger the effect when they change

  // console.log(`query: ${query}`);
  // console.log(`pathname: ${pathname}`);

  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      {iconPosition === "left" && (
        <Image
          src={imgSrc}
          width={24}
          height={24}
          alt="search icon"
          className="cursor-pointer"
        />
      )}
      <Input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent text-sm shadow-none outline-none"
      />
      {iconPosition === "right" && (
        <Image
          src={imgSrc}
          width={24}
          height={24}
          alt="search icon"
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default LocalSearch;
