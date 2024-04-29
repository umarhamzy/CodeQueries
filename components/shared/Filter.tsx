"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  filters: {
    name: string;
    value: string;
  }[];
  otherClasses?: string;
  containerClasses?: string;
  placeholder?: string;
}

export default function Filter({
  filters,
  otherClasses,
  containerClasses,
  placeholder,
}: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const paramFilter = searchParams.get("filter"); // either "new_users", "old_users" or "top_contributors"

  // console.log(paramFilter);

  const handleUpdateParams = (value: string) => {
    const newUrl = formUrlQuery({
      queryString: searchParams.toString(), // Get the current query string
      key: "filter", // The query parameter to update
      value,
    });
    router.push(newUrl, { scroll: false }); // Update the URL and scroll to the top of the page
  };

  return (
    <div className={`relative ${containerClasses}`}>
      <Select
        onValueChange={handleUpdateParams}
        defaultValue={paramFilter || undefined}
      >
        <SelectTrigger
          className={`${otherClasses} body-regular light-border background-light800_darkgradient text-dark500_light700 flex border bg-slate-100 px-5 py-2.5 focus:outline-none`}
        >
          <SelectValue
            placeholder={`${
              placeholder !== undefined || null ? `${placeholder}` : "Sort by.."
            }`}
          />
        </SelectTrigger>
        <SelectContent className="text-dark500_light700 small-regular border-none bg-light-900 dark:bg-dark-300">
          <SelectGroup className="focus:bg-light-800 dark:focus:bg-dark-400">
            {filters.map((filter) => (
              <SelectItem
                key={filter.value}
                value={filter.value}
                className="cursor-pointer hover:focus:bg-slate-100 dark:hover:focus:bg-dark-400"
              >
                {filter.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
