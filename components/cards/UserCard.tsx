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
  return (
    <Link
      href={`/profile/${user.clerkId}`}
      className="shadow-light100_darknone w-full xs:w-[200px]"
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
      </article>
    </Link>
  );
};

export default UserCard;
