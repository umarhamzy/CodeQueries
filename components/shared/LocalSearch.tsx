import Image from "next/image";

const LocalSearch = () => {
  return (
    <div>
      <div>
        <div>
          <Image
            src="/assets/icons/search.svg"
            width={20}
            height={20}
            alt="search"
            className="cursor-pointer"
          ></Image>
        </div>
      </div>
    </div>
  );
};

export default LocalSearch;
