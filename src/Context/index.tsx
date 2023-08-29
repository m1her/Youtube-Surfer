"use client";
import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";

export const SearchTextContext = createContext<valueProps | null>(null);

type valueProps = {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
};

const Context = ({ children }: any) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <SearchTextContext.Provider value={{ searchValue, setSearchValue }}>
      {children}
    </SearchTextContext.Provider>
  );
};

export default Context;
