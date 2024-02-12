import Link from "next/link";
import Metric from "../shared/Metric";
import { formatBigNumber, getTimestamp } from "@/lib/utils";

interface AnswerProps {
  _id: string;
  clerkId?: string;
  question: {
    _id: string;
    title: string;
  };
  author: {
    _id: string;
    username: string;
    name: string;
    picture: string;
  };
  upvotes: string[];
  createdAt: Date;
}

const AnswerCard = ({
  clerkId,
  _id,
  question,
  author,
  upvotes,
  createdAt,
}: AnswerProps) => {
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular line-clamp-1 flex pb-3 dark:text-light-400 sm:hidden">
            {getTimestamp(createdAt)}
          </span>
          <Link href={`/question/${question._id}/#${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {question.title}
            </h3>
          </Link>
        </div>
        {/* TODO If signed in- add edit delete actions */}
      </div>
      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.picture}
          alt="user"
          value={author.username}
          title={` - ${getTimestamp(createdAt)}`}
          href={`/profile/${author._id}`}
          isAuthor
          textStyles="small-medium text-dark400_light700"
        />
        <Metric
          imgUrl="/assets/icons/like.svg"
          alt="upvotes"
          value={formatBigNumber(upvotes.length)}
          title={`${upvotes.length === 1 ? " upvote" : " upvotes"}`}
          textStyles="small-medium text-dark400_light800"
        />
      </div>
    </div>
  );
};

export default AnswerCard;
