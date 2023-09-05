"use client";
import useAxios from "@/Hooks/useAxios";
import { MiniVideo } from "@/components/MiniVideo";
import { Spinner } from "@/components/Spinner";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

//AIzaSyCpyIAcpeQT_459S7vsHMy3yY2OVW8AD8Y
//AIzaSyDGqOTEdYnFBizH-B2OzhSPsI_igEDOQi0

type SuggestedVidsProps = {
  vidTitle: string;
  channelId: string;
};

export const SuggestedVids = React.memo(
  ({ vidTitle, channelId }: SuggestedVidsProps) => {
    const [sameVidsList, setSameVidsList] = useState<any>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [nextPageToken, setNextPageToken] = useState<string | null>(null);
    const {
      fetchData: getSuggestedVids,
      error: sugVidError,
      loading: sugVidsLoading,
    } = useAxios({
      config: {
        url: `https://www.googleapis.com/youtube/v3/search?&type=video&channelId=${channelId}&part=snippet&key=AIzaSyDGqOTEdYnFBizH-B2OzhSPsI_igEDOQi0&q=${vidTitle}&maxResults=12${
          nextPageToken != null ? "&pageToken=" + nextPageToken : ""
        }`,
        method: "GET",
      },
      onSuccess: (data: any) => {
        const newItems = data.items.map((item: any, index: any) => ({
          index: index,
          item: item,
        }));
        console.log(data);

        setHasMore(true);
        setSameVidsList((prev: any) => [...prev, ...newItems]);
        setNextPageToken(data.nextPageToken);
      },
      onError: () => {
        setHasMore(false);
        console.log(sugVidError);
      },
    });

    useEffect(() => {
      if (channelId) {
        getSuggestedVids();
      }
    }, [channelId]);

    return (
      <div className="w-full h-full flex flex-col gap-y-2">
        <div className="flex flex-col gap-y-2">
          <InfiniteScroll
            className="gap-y-2 flex flex-col"
            next={getSuggestedVids}
            hasMore={hasMore}
            loader={
              <div className="flex w-full justify-center">
                <Spinner />
              </div>
            }
            dataLength={sameVidsList.length}
          >
            {sameVidsList.map(
              (
                item: {
                  index: number;
                  item: {
                    id: { videoId: string };
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
                  videoLink={item.item.id.videoId}
                />
              )
            )}
          </InfiniteScroll>
        </div>

        {/* <div className="w-full h-1 bg-white " id="load-trigger"></div> */}
      </div>
    );
  }
);
