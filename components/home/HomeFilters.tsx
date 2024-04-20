"use client";

import { HomePageFilters } from "@/constants/filters";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { formUrlQuery } from "@/lib/utils";

const HomeFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [active, setActive] = useState("");

  /**
   * Handles the click event on a filter button.
   * If the currently active filter is the same as the clicked filter,
   * it sets the active filter to an empty string and removes the "filter" query parameter from the URL.
   * If a different filter is clicked, it updates the active filter and updates the "filter" query parameter in the URL.
   *
   * @param {string} filter - The value of the filter that was clicked.
   */
  const handleTypeClick = (filter: string) => {
    if (active === filter) {
      // If the active filter is the same as the clicked filter,
      // we clear the active filter and remove the "filter" query parameter from the URL.
      setActive(""); // Clear the active filter
      const newUrl = formUrlQuery({
        queryString: searchParams.toString(), // Get the current query string
        key: "filter", // The query parameter to update
        value: null, // Set the value to null to remove it from the URL
      });
      router.push(newUrl, { scroll: false }); // Update the URL and scroll to the top of the page
    } else {
      // If a different filter is clicked,
      // we update the active filter and update the "filter" query parameter in the URL.
      setActive(filter); // Update the active filter
      const newUrl = formUrlQuery({
        queryString: searchParams.toString(), // Get the current query string
        key: "filter", // The query parameter to update
        value: filter.toLowerCase(), // Update the value of the query parameter
      });
      router.push(newUrl, { scroll: false }); // Update the URL and scroll to the top of the page
    }
  };

  return (
    <div className="mt-10 hidden flex-wrap gap-3 md:flex">
      {HomePageFilters.map((filter) => (
        <Button
          key={filter.value}
          onClick={() => {
            handleTypeClick(filter.value);
          }}
          className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${
            active == filter.value
              ? "bg-primary-100 text-primary-500 dark:bg-dark-400"
              : "bg-light-800 text-light-500 hover:bg-light-700 dark:bg-dark-200 dark:text-light-500 dark:hover:bg-dark-400"
          }`}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilter;
