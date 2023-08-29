import { Search } from "../Search";

export const NavBar = () => {

  return (
    <div className="bg-white dark:bg-primary-color z-50 select-none flex items-center fixed top-0 left-0 w-full md:px-10 px-2 py-3 bg-transparent">
      <div className="whitespace-nowrap md:text-lg text-sm font-bold dark:text-white text-primary-color flex items-center gap-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="fill-third-color md:w-10 md:h-10 w-7 h-7 "
          height="1em"
          viewBox="0 0 576 512"
        >
          <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
        </svg>
        Youtube Surfer
      </div>

      <div className="w-full flex justify-center lg:px-32 md:pl-6 pl-2">
        <Search />
      </div>
    </div>
  );
};
