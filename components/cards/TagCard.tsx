import Link from "next/link";
import RenderTag from "../shared/RenderTag";
import { Badge } from "../ui/badge";
import { getAllTags } from "@/lib/actions/tag.action";

interface Props {
  tag: {
    _id: string;
    name: string;
    description: string;
  };
}

const TagCard = async ({ tag }: Props) => {
  return (
    <Link
      href={`/tags/${tag._id}`}
      className="shadow-light100_darknone max-sx:min-w-full w-full xs:w-[260px]"
    >
      <article className="background-light900_dark200 light-border flex w-full flex-col items-center gap-4 rounded-2xl border p-8">
        <div className=" text-center">
          <RenderTag _id={tag._id} name={tag.name} key={tag._id} showCount />
          <p className="text-dark200_light900 h3-bold line-clamp-1">
            {tag.description}
          </p>
          <p className="text-dark500_light500"></p>
        </div>
      </article>
    </Link>
  );
};

export default TagCard;
