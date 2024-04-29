import Link from "next/link";

interface Props {
  tag: {
    _id: string;
    name: string;
    description: string;
    questions: [];
  };
}

const TagCard = ({ tag }: Props) => {
  return (
    <Link
      href={`/tags/${tag._id}`}
      className="shadow-light100_darknone max-w-[300px] rounded-2xl"
    >
      <article className="background-light900_dark200 light-border flex w-full max-w-[300px] flex-col gap-4 rounded-2xl border px-8 py-10">
        <div className="background-light800_dark400 w-fit rounded-md px-5 py-1.5 lowercase">
          <p className="paragraph-semibold text-dark300_light900">{tag.name}</p>
        </div>
        <p>{tag.description}</p>
        <p className="small-medium text-dark400_light500 mt-3.5 flex items-center gap-3">
          <span className="body-semibold primary-text-gradient">
            {tag.questions.length}
          </span>
          {tag.questions.length > 1 ? "questions" : "question"}
        </p>
      </article>
    </Link>
  );
};

export default TagCard;
