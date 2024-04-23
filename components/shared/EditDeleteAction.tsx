"use client";

import { deleteAnswer } from "@/lib/actions/answer.action";
import { deleteQuestion } from "@/lib/actions/question.action";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";

interface Props {
  type: string;
  itemId: string;
}

const EditDeleteAction = ({ type, itemId }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/question/edit/${JSON.parse(itemId)}`);

    toast({
      description: "Your question has been updated!",
    });
  };
  const handleDelete = async () => {
    if (type === "question") {
      await deleteQuestion({
        questionId: JSON.parse(itemId),
        path: pathname,
      });

      toast({
        description: "Your question has been deleted!",
        variant: "destructive",
      });
    } else if (type === "answer") {
      await deleteAnswer({
        answerId: JSON.parse(itemId),
        path: pathname,
      });

      toast({
        description: "Your answer has been deleted!",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center justify-end gap-3 max-sm:w-full">
      {type === "question" && (
        <Image
          src="/assets/icons/edit.svg"
          alt="delete"
          width={15}
          height={15}
          className="cursor-pointer object-contain"
          onClick={handleEdit}
        />
      )}
      <Image
        src="/assets/icons/trash.svg"
        alt="delete"
        width={15}
        height={15}
        className="cursor-pointer object-contain"
        onClick={handleDelete}
      />
    </div>
  );
};

export default EditDeleteAction;
