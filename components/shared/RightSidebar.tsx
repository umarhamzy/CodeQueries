import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTag from "./RenderTag";
import { ChevronRight } from "lucide-react";

const hotQuestions = [
  {
    _id: 1,
    title: "How do I use express as a custom server in NextJS?",
  },
  {
    _id: 2,
    title:
      "Would it be appropriate to point out an error in another paper during a referee report?",
  },
  {
    _id: 3,
    title: "How can an airconditioning machine exist?",
  },
  {
    _id: 4,
    title: "Interrogated every time crossing UK Border as citizen?",
  },
  {
    _id: 5,
    title: "What is an example of 3 number that do not make up a vector?",
  },
];

const popularTags = [
  {
    _id: 1,
    name: "javascript",
    questions: 20152,
  },
  {
    _id: 2,
    name: "next.js",
    questions: 18493,
  },
  {
    _id: 3,
    name: "react.js",
    questions: 16299,
  },
  {
    _id: 4,
    name: "node.js",
    questions: 15121,
  },
  {
    _id: 5,
    name: "vue.js",
    questions: 15121,
  },
];

const TopQuestions = () => {
  return (
    <>
      <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
      <div className="mt-7 flex w-full flex-col gap-[30px]">
        {hotQuestions.map((question) => (
          <Link
            href={`/questions/${question._id}`}
            key={question._id}
            className="flex cursor-pointer items-center justify-between gap-7"
          >
            <p className="body-medium text-dark400_light700">
              {question.title}
            </p>
            <Image
              src="/assets/icons/chevron-right.svg"
              alt="chevron right"
              width={20}
              height={20}
              className="invert-colors"
            />
          </Link>
        ))}
      </div>
    </>
  );
};

const PopularTags = () => {
  return (
    <div className="mt-16">
      <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
      <div className="mt-7 flex flex-col gap-4">
        {popularTags.map((tag) => (
          <RenderTag
            key={tag._id}
            _id={tag._id}
            name={tag.name}
            totalQuestions={tag.questions}
            showCount
          />
        ))}
      </div>
    </div>
  );
};

const RightSidebar = () => {
  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen w-[330px] flex-col overflow-y-auto border-l p-[1.65rem] pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div>
        <TopQuestions />
        <PopularTags />
      </div>
    </section>
  );
};

export default RightSidebar;
