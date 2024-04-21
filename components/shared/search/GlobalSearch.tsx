"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import GlobalResult from "./GlobalResult";

const GlobalSearch = () => {
  const router = useRouter();
  const pathname = usePathname(); // we use the usePathname hook to get the current pathname, e.g: after /
  const searchParams = useSearchParams(); // we use the useSearchParams hook to get the query string, e.g: after ?q=
  const searchContainerRef = useRef(null);

  const query = searchParams.get("global"); // e.g: "something" in /?q=something
  // console.log(query);
  // console.log(searchParams); // URLSearchParams { q -> "something" }

  const [search, setSearch] = useState(query || "");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (
        searchContainerRef.current &&
        // @ts-ignore
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setSearch("");
      }
    };

    setIsOpen(false);

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [pathname]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // If there is a search query
      if (search) {
        // We create a new URL by appending or updating the "q" key with the current search query
        const newUrl = formUrlQuery({
          queryString: searchParams.toString(), // This extracts the query string from the current URL
          key: "global", // This is the key we want to update
          value: search, // This is the value we want to set
        });

        // We use the router to navigate to the new URL
        router.push(newUrl, { scroll: false }); // This scrolls to the top of the page after the navigation
      } else {
        // If there is no search query and we are on the specified route
        // console.log(`pathname: ${pathname}, route: ${route}`);
        if (query) {
          // We remove the "q" key from the URL
          const newUrl = removeKeysFromQuery({
            queryString: searchParams.toString(),
            keysToRemove: ["global", "type"],
          });

          // We navigate to the new URL
          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);

    // This function cleans up the effect, it's called when the component unmounts or when the effect dependencies change
    return () => clearTimeout(delayDebounceFn);
  }, [search, pathname, router, searchParams, query]);
  return (
    <div
      className="relative w-full max-w-[600px] max-lg:hidden"
      ref={searchContainerRef}
    >
      <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        <Image
          src="/assets/icons/search.svg"
          width={24}
          height={24}
          alt="search"
          className="cursor-pointer"
        />
        <Input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);

            if (!isOpen) setIsOpen(true);

            if (e.target.value === "" && isOpen) setIsOpen(false);
          }}
          className="paragraph-regular no-focus placeholder text-dark400_light700 flex h-9 w-full rounded-md border-none border-slate-200 bg-transparent px-3 py-1 text-sm shadow-none"
        />
      </div>
      {isOpen && <GlobalResult />}
    </div>
  );
};

export default GlobalSearch;
