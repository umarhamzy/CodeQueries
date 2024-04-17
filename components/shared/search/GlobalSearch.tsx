import Image from "next/image";
import { Input } from "@/components/ui/input";

const GlobalSearch = () => {
  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
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
          className="paragraph-regular no-focus placeholder text-dark400_light700 flex h-9 w-full rounded-md border-none border-slate-200 bg-transparent px-3 py-1 text-sm shadow-none"
        />
      </div>
    </div>
  );
};

export default GlobalSearch;
