import Filter from "./Filter";
import { AnswerFilters } from "@/constants/filters";
import { getAnswers } from "@/lib/actions/answer.action";
import Link from "next/link";
import Image from "next/image";
import { getTimestamp } from "@/lib/utils";
import ParseHTML from "./ParseHTML";
import Votes from "./Votes";

interface Props {
  questionId: string;
  userId: string;
  totalAnswers: number;
  page?: number;
  filter?: string;
}

const AllAnswers = async ({
  questionId,
  userId,
  totalAnswers,
  page,
  filter,
}: Props) => {
  const result = await getAnswers({
    questionId,
    page: page,
    sortBy: filter,
  });

  return (
    <div className="mt-11">
      <div className="flex flex-wrap items-center justify-between max-md:space-y-2">
        <h3 className="primary-text-gradient">
          {totalAnswers === 0
            ? "No answers"
            : `${totalAnswers} ${totalAnswers === 1 ? "answer" : "answers"}`}
        </h3>

        <Filter filters={AnswerFilters} otherClasses="min-w-[170px]" />
      </div>

      <div>
        <p></p>
        {result.answers.map((answer) => (
          <article
            key={answer._id}
            className="light-border scroll-smooth border-b py-10"
          >
            <div className="flex items-center justify-between">
              <div className="mb-8 flex w-full justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                <Link
                  href={`/profile/${answer.author.clerkId}`}
                  className="flex flex-1 items-start gap-1 sm:items-center"
                >
                  <Image
                    src={answer.author.picture}
                    alt="profile picture"
                    className="aspect-square rounded-full object-cover max-sm:mt-0.5"
                    width={18}
                    height={18}
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <p className="body-semibold text-dark300_light700">
                      {answer.author.name}
                    </p>

                    <p className="small-regular text-light400_light500 mt-0.5 line-clamp-1">
                      <span className="max-sm:hidden">&nbsp;-</span> answered{" "}
                      {getTimestamp(answer.createdAt)}
                    </p>
                  </div>
                </Link>
                <Votes
                  type="answer"
                  itemId={JSON.stringify(answer._id)}
                  userId={JSON.stringify(userId)}
                  upvotes={answer.upvotes.length}
                  hasUpvoted={answer.upvotes.includes(userId)}
                  downvotes={answer.downvotes.length}
                  hasDownvoted={answer.downvotes.includes(userId)}
                />
              </div>
            </div>
            <ParseHTML data={answer.content} />
          </article>
        ))}
      </div>
    </div>
  );
};

export default AllAnswers;
