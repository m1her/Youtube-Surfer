"use client";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

type MiniVideoProps = {
  thumbnail: string;
  title: string;
  channelTitle: string;
  publishedAt: Date;
  index: number;
  listLength: number;
  videoLink: string;
};

export const MiniVideo = ({
  thumbnail,
  title,
  publishedAt,
  index,
  channelTitle,
  videoLink,
}: MiniVideoProps) => {


  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{
        type: "tween",
        delay:  index / 10 > 1.1 ? index / 10 - Math.floor(index / 10) : index / 10,

        duration: 0.2,
      }}
    >
      <Link href={videoLink} className="flex items-center space-x-2 h-full">
        <div className="w-40 aspect-video rounded-lg flex-shrink-0 relative">
          <Image
            src={thumbnail}
            alt=" "
            width={1000}
            height={1000}
            className="absolute object-cover rounded-lg w-full h-full flex-shrink-0"
          />
        </div>
        <div className="flex flex-col justify-around h-full">
          <div className="dark:text-forth-color text-secondary-color font-medium text-sm">
            {title}
          </div>

          <div className="text-xs dark:text-gray-400 text-secondary-color mt-2">
            {channelTitle}
          </div>
          <div className="text-xs dark:text-gray-400 text-secondary-color">
            {publishedAt &&
              formatDistanceToNow(new Date(publishedAt), {
                addSuffix: true,
              })}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
