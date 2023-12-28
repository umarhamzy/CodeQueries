import TagCard from "@/components/cards/TagCard";
import Filter from "@/components/shared/Filter";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { TagFilters } from "@/constants/filters";
import { getAllTags } from "@/lib/actions/tag.action";
import { Link } from "lucide-react";

const page = async () => {
  const result = await getAllTags({});

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Tags</h1>
      <div className="mt-9 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          route="/community"
          placeholder="Search users.."
        />
        <Filter
          filters={TagFilters}
          placeholder="Filter Tags"
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {result.tags.length > 0 ? (
          result.tags.map((tag) => <TagCard key={tag._id} tag={tag} />)
        ) : (
          <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
            <p>
              No users found. <i>crickets</i>
            </p>
            <Link
              href={"/sign-up"}
              className="primary-gradient mt-10 block rounded-lg p-4 font-bold text-light-800"
            >
              Click here to create an account <br /> Be our first user! 🎉
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default page;
