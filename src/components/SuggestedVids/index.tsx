
"use client";
import useAxios from "@/Hooks/useAxios";
import { MiniVideo } from "@/components/MiniVideo";
import { Spinner } from "@/components/Spinner";
import React, { useEffect, useState } from "react";

//AIzaSyB6nvkExWJK_7mVseGePYpiiv2oOnyzhqo
//AIzaSyDNOnpFbcL_7hnD-f1AByhVBIDG64HUNe4

type SuggestedVidsProps = {
  vidTitle: string;
  channelId: string;
};

export const SuggestedVids = React.memo(
  ({ vidTitle, channelId }: SuggestedVidsProps) => {
    const [sameVidsList, setSameVidsList] = useState<any>([]);
    const [nextPageToken, setNextPageToken] = useState<string | null>(null);
    const {
      fetchData: getSuggestedVids,
      error: sugVidError,
      loading: sugVidsLoading,
    } = useAxios({
      config: {
        url: `https://www.googleapis.com/youtube/v3/search?&type=video&channelId=${channelId}&part=snippet&key=AIzaSyDNOnpFbcL_7hnD-f1AByhVBIDG64HUNe4&q=${vidTitle}&maxResults=12${
          nextPageToken != null ? "&pageToken=" + nextPageToken : ""
        }`,
        method: "GET",
      },
      onSuccess: (data: any) => {
        const newItems = data.items.map((item: any, index: any) => ({
          index: index,
          item: item,
        }));
        setSameVidsList((prev: any) => [...prev, ...newItems]);
        setNextPageToken(data.nextPageToken);
      },
      onError: () => {
        console.log(sugVidError);
      },
    });

    useEffect(() => {
      if (channelId) {
        getSuggestedVids();
      }
    }, [channelId]);

    useEffect(() => {
      const customRoot = document.querySelector("#root");
      const observer = new IntersectionObserver(
        (entries) => {
          console.log(entries[0].isIntersecting);

          if (entries[0].isIntersecting && nextPageToken) {
            getSuggestedVids();
          }
        },
        { rootMargin: "10px", root: customRoot }
      );

      const target = document.querySelector("#load-trigger");
      if (target) {
        observer.observe(target);
      }

    }, [nextPageToken]);

    return (
      <div className="w-full h-full flex flex-col gap-y-2">
        <div className="flex flex-col gap-y-2">
          {sameVidsList.map(
            (
              item: {
                index: number;
                item: {
                  snippet: {
                    title: string;
                    thumbnails: { high: { url: string } };
                    channelTitle: string;
                    publishedAt: Date;
                  };
                };
              },
              index: number
            ) => (
              <MiniVideo
                key={index}
                index={item.index}
                thumbnail={item.item.snippet.thumbnails.high.url}
                channelTitle={item.item.snippet.channelTitle}
                title={item.item.snippet.title}
                publishedAt={item.item.snippet.publishedAt}
                listLength={sameVidsList.length}
              />
            )
          )}
        </div>

        <div
          className="w-full flex justify-center  items-center text-sm font-semibold py-1.5 text-blue-600 border rounded-full dark:border-white/20 border-black/20 cursor-pointer hover:bg-blue-400/30"
          onClick={() => getSuggestedVids()}
        >
          {sugVidsLoading ? (
            <Spinner color="fill-blue-600" size="w-5 h-5" />
          ) : (
            "Show more"
          )}
        </div>
        {/* <div className="w-full h-1 bg-white " id="load-trigger"></div> */}
        {sugVidsLoading && (
          <div className="w-full justify-center mb-6 lg:flex hidden">
            <Spinner />
          </div>
        )}
      </div>
    );
  }
);
