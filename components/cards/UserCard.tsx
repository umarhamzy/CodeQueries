import { getTopInteractedTags } from "@/lib/actions/tag.action";
import Image from "next/image";
import Link from "next/link";
import RenderTag from "../shared/RenderTag";
import { Badge } from "../ui/badge";

interface Props {
  user: {
    _id: string;
    clerkId: string;
    picture: string;
    name: string;
    username: string;
  };
}

const UserCard = async ({ user }: Props) => {
  const interactedTags = await getTopInteractedTags({ userId: user._id });

  return (
    <Link
      href={`/profile/${user.clerkId}`}
      className="shadow-light100_darknone max-sx:min-w-full w-full xs:w-[260px]"
    >
      <article className="background-light900_dark200 light-border flex w-full flex-col items-center gap-4 rounded-2xl border p-8">
        <Image
          src={user.picture}
          alt="user profile picture"
          height={100}
          width={100}
          className="aspect-square rounded-full object-cover"
        />
        <div className="mt-4 text-center">
          <p className="text-dark200_light900 h3-bold line-clamp-1">
            {user.name}
          </p>
          <p className="text-dark500_light500 body-regular">@{user.username}</p>
        </div>
        <div className="mt-5">
          {interactedTags.length > 0 ? (
            <div className="flex items-center gap-2">
              {interactedTags.map((tag) => (
                <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
              ))}
            </div>
          ) : (
            <Badge>No Tags yet</Badge>
          )}
        </div>
      </article>
    </Link>
  );
};

export default UserCard;
