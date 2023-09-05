"use client";
import useAxios from "@/Hooks/useAxios";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faArrowUpWideShort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { Spinner } from "../Spinner";
import numeral from "numeral";

type CommentsProps = {
  vidId: string | string[];
  commentCount: number;
};

export const Comments = ({ vidId, commentCount }: CommentsProps) => {
  const [comments, setComments] = useState<any>([]);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);

  const {
    fetchData: getComments,
    error: commentsError,
    loading: commentsLoading,
  } = useAxios({
    config: {
      url: `https://www.googleapis.com/youtube/v3/commentThreads?key=AIzaSyDGqOTEdYnFBizH-B2OzhSPsI_igEDOQi0&videoId=${vidId}&part=snippet&maxResults=10${
        nextPageToken != null ? "&pageToken=" + nextPageToken : ""
      }`,
      method: "GET",
    },
    onSuccess: (data: { items: any; nextPageToken: string }) => {
      setComments((prev: any) => [...prev, ...data.items]);
      setNextPageToken(data.nextPageToken);
    },
    onError: () => {
      console.log(commentsError);
    },
  });

  useEffect(() => {
    getComments();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && nextPageToken) {
          getComments();
        }
      },
      { rootMargin: "10px" }
    );

    const target = document.querySelector("#load-more-trigger");
    if (target) {
      observer.observe(target);
    }

    return () => {
      observer.disconnect();
    };
  }, [nextPageToken]);

  return (
    <div className="w-full flex flex-col gap-y-6 ">
      <div className="flex items-start gap-x-6 dark:text-white text-primary-color">
        <div> {numeral(commentCount).format("0.0a")} Comments</div>
        <div className="flex gap-x-1">
          <FontAwesomeIcon icon={faArrowUpWideShort} className="w-5 h-5" /> Sort
        </div>
      </div>
      {comments.map((item: any, index: number) => (
        <div className="flex items-start" key={index}>
          <div className="w-10 h-10 rounded-full relative flex-shrink-0">
            <Image
              alt=" "
              src={item.snippet.topLevelComment.snippet.authorProfileImageUrl}
              width={1000}
              height={1000}
              className="w-10 h-10 aspect-square object-cover object-center rounded-full"
            />
          </div>
          <div className="flex flex-col ml-4">
            <div className="flex items-center gap-x-2">
              <div className="dark:text-white text-primary-color text-sm font-semibold">
                @{item.snippet.topLevelComment.snippet.authorDisplayName}
              </div>
              <div className="text-xs dark:text-gray-300/50 text-primary-color">
                {item &&
                  formatDistanceToNow(
                    new Date(item.snippet.topLevelComment.snippet.publishedAt),
                    {
                      addSuffix: true,
                    }
                  )}
              </div>
            </div>
            <div
              className="dark:text-white text-primary-color text-sm"
              dangerouslySetInnerHTML={{
                __html: item.snippet.topLevelComment.snippet.textDisplay,
              }}
            />

            <div className="flex items-center gap-x-4">
              <div className="dark:text-white text-primary-color text-sm mt-2">
                <FontAwesomeIcon icon={faThumbsUp} />{" "}
                {item.snippet.topLevelComment.snippet.likeCount}
              </div>
              <div className="dark:text-white text-primary-color text-sm mt-2">
                {item.snippet.totalReplyCount} replies
              </div>
            </div>
          </div>
        </div>
      ))}

      <div
        className="w-full justify-center lg:hidden flex items-center text-sm font-semibold py-1.5 text-blue-600 border rounded-full dark:border-white/20 border-black/20 cursor-pointer hover:bg-blue-400/30"
        onClick={() => getComments()}
      >
        {commentsLoading ? (
          <Spinner color="fill-blue-600" size="w-5 h-5" />
        ) : (
          "Show more"
        )}
      </div>
      <div
        id="load-more-trigger"
        className="lg:block hidden"
        style={{ height: "1px" }}
      ></div>
      {commentsLoading && (
        <div className="w-full justify-center mb-6 lg:flex hidden">
          <Spinner />
        </div>
      )}
    </div>
  );
};
