import TagCard from "@/components/cards/TagCard";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { TagFilters } from "@/constants/filters";
import { getAllTags } from "@/lib/actions/tag.action";
import { SearchParamsProps } from "@/types";

const page = async ({ searchParams }: SearchParamsProps) => {
  const result = await getAllTags({
    searchQuery: searchParams.q,
  });

  // console.log(result.tags);

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">All Tags</h1>
      <div className="mt-11 flex flex-wrap justify-between gap-5 sm:items-center">
        <LocalSearch
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          route="/tags"
          placeholder="Search tags.."
        />
        <Filter
          filters={TagFilters}
          placeholder="Filter Tags"
          otherClasses="min-h-[56px] min-w-[170px]"
        />
      </div>

      <section className="mt-12 flex w-full flex-wrap gap-4">
        {result.tags.length > 0 ? (
          result.tags.map((tag) => <TagCard key={tag._id} tag={tag} />)
        ) : (
          <NoResult
            title="No tags found"
            description="It looks like there aren't any questions yet"
            link="/ask-question"
            linkTitle="Ask a question"
          />
        )}
      </section>
    </div>
  );
};

export default page;
