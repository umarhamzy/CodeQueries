import UserCard from "@/components/cards/UserCard";
import Filter from "@/components/shared/Filter";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { UserFilters } from "@/constants/filters";
import { getAllUsers } from "@/lib/actions/user.action";
import Link from "next/link";

const page = async () => {
  const result = await getAllUsers({});

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>
      <div className="mt-11 flex flex-wrap justify-between gap-5 sm:items-center">
        <LocalSearch
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          route="/community"
          placeholder="Search users.."
        />
        <Filter
          filters={UserFilters}
          placeholder="Filter Users"
          otherClasses="min-h-[56px] max-md:min-w-[170px]"
        />
      </div>

      <section className="mt-12 flex flex-wrap justify-center gap-4">
        {result.users.length > 0 ? (
          result.users.map((user) => <UserCard key={user._id} user={user} />)
        ) : (
          <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
            <p>
              No users found. <i>crickets</i>
            </p>
            <Link
              href={"/sign-up"}
              className="primary-gradient mt-10 block rounded-lg p-4 font-bold text-light-800"
            >
              Click to be our first user! 🎉
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default page;
