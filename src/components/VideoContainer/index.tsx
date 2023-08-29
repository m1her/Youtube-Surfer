import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

type VideoProps = {
  ThumbnailLlink: string;
  title: string;
  channelTitle: string;
  publishedAt: any;
  videoLink: string;
};
export const VideoContainer = ({
  ThumbnailLlink,
  title,
  channelTitle,
  publishedAt,
  videoLink,
}: VideoProps) => {
  const timeAgo = formatDistanceToNow(new Date(publishedAt), {
    addSuffix: true,
  });

  return (
    <Link
      className="w-full h-full"
      href={videoLink}
    >
      <div className="w-full aspect-video rounded-lg relative">
        <Image src={ThumbnailLlink} alt=" " width={1000} height={1000} className="absolute object-cover rounded-lg w-full h-full" />
      </div>
      <div className="text-sm font-semibold mt-1 dark:text-white text-primary-color">{title}</div>
      <div className="flex items-end gap-2">
        <div className="text-sm font-light dark:text-gray-400 text-secondary-color mt-2">
          {channelTitle}
        </div>
        <div className="text-sm font-light dark:text-gray-400 text-secondary-color">• {timeAgo}</div>
      </div>
    </Link>
  );
};
