import CommunityFilters from "@/components/community/CommunityFilters";
import Filter from "@/components/shared/Filter";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { UserFilters } from "@/constants/filters";

const page = () => {
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>
      <div className="mt-9 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          route="/"
          placeholder="Search by username.."
        />
        <Filter
          filters={UserFilters}
          placeholder="Filter Users"
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-sm:flex"
        />
      </div>
      <CommunityFilters />
    </div>
  );
};

export default page;
