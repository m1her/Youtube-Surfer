"use client";
import { SearchTextContext } from "@/Context";
import { SetStateAction, useContext, useState } from "react";

export const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const context = useContext(SearchTextContext);
  
  const searchIputHandler = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchInput(e.target.value);
  };

  const enterHandler = (e: { key: any }) => {
    if (e.key == "Enter") {
      context?.setSearchValue(searchInput);
    }
  };

  const searchClickHandler = () => {
    context?.setSearchValue(searchInput);
  };

  return (
    <div className="flex items-center rounded-full border border-gray-300 dark:border-secondary-color w-full overflow-hidden">
      <input
        className="px-5 md:py-2 py-1 md:text-base text-sm bg-transparent outline-none text-black dark:text-white caret-black dark:caret-white w-full "
        id="searchInput"
        name="searchInput"
        value={searchInput}
        onChange={searchIputHandler}
        onKeyDown={enterHandler}
      />
      <div
        className="px-2 md:py-2 py-1 w-20 h-full flex justify-center items-center bg-gray-50 dark:bg-secondary-color border-l dark:border-none border-gray-300 cursor-pointer"
        onClick={searchClickHandler}
      >
        <svg
          viewBox="0 0 52.966 52.966"
          className="dark:fill-white fill-black  md:w-5 md:h-6 w-4 h-4 dark:stroke-white stroke-black"
          strokeWidth="2"
        >
          <path d="M51.704,51.273L36.845,35.82c3.79-3.801,6.138-9.041,6.138-14.82c0-11.58-9.42-21-21-21s-21,9.42-21,21s9.42,21,21,21 c5.083,0,9.748-1.817,13.384-4.832l14.895,15.491c0.196,0.205,0.458,0.307,0.721,0.307c0.25,0,0.499-0.093,0.693-0.279 C52.074,52.304,52.086,51.671,51.704,51.273z M21.983,40c-10.477,0-19-8.523-19-19s8.523-19,19-19s19,8.523,19,19 S32.459,40,21.983,40z"></path>{" "}
        </svg>
      </div>
    </div>
  );
};
