"use client";

import { GlobalSearchFilters } from "@/constants/filters";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const GlobalFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const typeParams = searchParams.get("type");

  const [active, setActive] = useState(typeParams || "");

  const handleTypeClick = (filter: string) => {
    if (active === filter) {
      // If the active filter is the same as the clicked filter,
      // we clear the active filter and remove the "filter" query parameter from the URL.
      setActive(""); // Clear the active filter
      const newUrl = formUrlQuery({
        queryString: searchParams.toString(), // Get the current query string
        key: "type", // The query parameter to update
        value: null, // Set the value to null to remove it from the URL
      });

      router.push(newUrl, { scroll: false }); // Update the URL and scroll to the top of the page
    } else {
      // If a different filter is clicked,
      // we update the active filter and update the "filter" query parameter in the URL.
      setActive(filter); // Update the active filter
      const newUrl = formUrlQuery({
        queryString: searchParams.toString(), // Get the current query string
        key: "type", // The query parameter to update
        value: filter.toLowerCase(), // Update the value of the query parameter
      });

      router.push(newUrl, { scroll: false }); // Update the URL and scroll to the top of the page
    }
  };

  return (
    <div className="flex items-center gap-5">
      <p className="text-dark400_light900 body-medium">Type: </p>
      <div className="flex gap-3">
        {GlobalSearchFilters.map((item) => (
          <button
            key={item.value}
            type="button"
            className={`light-border-2 small-medium rounded-full px-5 py-2 capitalize dark:hover:text-primary-500 ${active === item.value ? "bg-primary-500 text-light-900" : "text-dark400 bg-light-700 hover:text-primary-500 dark:bg-dark-500"}`}
            onClick={() => {
              handleTypeClick(item.value);
            }}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GlobalFilters;
