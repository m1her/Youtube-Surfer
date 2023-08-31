"use client";
import useAxios from "@/Hooks/useAxios";
import { VideoContainer } from "@/components/VideoContainer";
import { Key, useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { Spinner } from "@/components/Spinner";
import { SearchTextContext } from "@/Context";
import Categories from "@/components/Categories";

export default function Home() {
  const [category, setCategory] = useState(0);
  const [videos, setVideos] = useState<any>([]);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const context = useContext(SearchTextContext);

  const {
    fetchData: getVideos,
    error: reqError,
    loading: reqLoading,
  } = useAxios({
    config: {
      url: `https://www.googleapis.com/youtube/v3/search?key=AIzaSyB6nvkExWJK_7mVseGePYpiiv2oOnyzhqo&type=video&part=snippet&q=${
        context?.searchValue
      }&maxResults=12${
        nextPageToken != null ? "&pageToken=" + nextPageToken : ""
      }${category == 0 ? "" : "&videoCategoryId=" + category}`,
      method: "GET",
    },
    onSuccess: (data: { items: any; nextPageToken: string }) => {
      setNextPageToken(data.nextPageToken);
      setVideos((prev: any) => [...prev, ...data.items]);
    },
    onError: () => {
      console.log(reqError);
    },
  });

  useEffect(() => {
    setVideos([]);
    setNextPageToken(null);
    getVideos();
  }, [context?.searchValue, category]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && nextPageToken) {
          getVideos();
        }
      },
      { rootMargin: "20px" }
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
    <div className="w-full h-full md:px-10 px-2 flex flex-col items-center justify-center ">
      <Categories category={setCategory} />
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-6 gap-2 mt-8">
        {videos.map(
          (
            item: {
              id: { videoId: string };
              snippet: {
                publishedAt: any;
                thumbnails: { high: { url: string } };
                title: string;
                channelTitle: string;
              };
            },
            index: Key | null | undefined
          ) => (
            <motion.div
              className="w-full h-full"
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              key={index}
            >
              <VideoContainer
                ThumbnailLlink={item.snippet.thumbnails.high.url}
                title={item.snippet.title}
                channelTitle={item.snippet.channelTitle}
                publishedAt={item.snippet.publishedAt}
                videoLink={item.id.videoId}
              />
            </motion.div>
          )
        )}

        <div id="load-more-trigger" style={{ height: "1px" }}></div>
      </div>
      {reqLoading && (
        <div className="w-full flex justify-center mb-6">
          <Spinner />
        </div>
      )}
    </div>
  );
}
