"use client";
import React, { useState } from "react";

const catagories = [
  { name: "All", id: 0 },
  { name: "Gaming", id: 20 },
  { name: "Music", id: 10 },
  { name: "Sports", id: 17 },
  { name: "Comedy", id: 23 },
  { name: "Entertainment", id: 24 },
  { name: "News & Politics", id: 25 },
  { name: "Howto & Style", id: 26 },
  { name: "Education", id: 27 },
  { name: "Trailers", id: 44 },
  { name: "Shorts", id: 42 },
];

type CatagoryProps = {
  category: any;
};

export default function Categories({ category }: CatagoryProps) {
  const [selected, setSelected] = useState("All");
  return (
    <div className="w-full flex justify-start gap-x-3 overflow-x-scroll flex-shrink-0">
      {catagories.map((item) => (
        <div
          key={item.name}
          className={`whitespace-nowrap transition-all duration-300  px-3 py-1.5 text-sm rounded-lg cursor-pointer
          ${
            item.name == selected
              ? "dark:bg-white bg-black dark:text-black text-white"
              : "dark:bg-white/10 bg-forth-color hover:bg-black/10 dark:hover:bg-white/20 text-black dark:text-white"
          }
          `}
          onClick={() => {
            setSelected(item.name);
            category(item.id);
          }}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
}
