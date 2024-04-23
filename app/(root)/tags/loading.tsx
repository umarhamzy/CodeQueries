import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <section>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Tags</h1>
      </div>
      <div className="mb-12 mt-11 flex flex-wrap items-center justify-between gap-5">
        <Skeleton className="h-14 flex-1" />
        <div className="hidden max-md:block">
          <Skeleton className="h-14 w-28" />
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
          <Skeleton key={item} className="h-40 w-40 rounded-xl" />
        ))}
      </div>
    </section>
  );
};

export default loading;
