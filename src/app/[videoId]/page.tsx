"use client";
import useAxios from "@/Hooks/useAxios";
import { Spinner } from "@/components/Spinner";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import numeral from "numeral";
import { Comments } from "@/components/Comments";
import { SuggestedVids } from "@/components/SuggestedVids";
//AIzaSyB6nvkExWJK_7mVseGePYpiiv2oOnyzhqo
//AIzaSyDNOnpFbcL_7hnD-f1AByhVBIDG64HUNe4
const VideoPage = () => {
  const params = useParams();
  const [currentVid, setCurrentVid] = useState<any>(null);
  const [currentChannel, setCurrentChannel] = useState<any>(null);
  const [expanded, setExpanded] = useState(false);

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  const {
    fetchData: getVideo,
    error: videoError,
    loading: videoLoading,
  } = useAxios({
    config: {
      url: `https://www.googleapis.com/youtube/v3/videos?id=${params.videoId}&key=AIzaSyDNOnpFbcL_7hnD-f1AByhVBIDG64HUNe4
      &part=snippet,contentDetails,statistics,status`,
      method: "GET",
    },
    onSuccess: (data: { items: any; nextPageToken: string }) => {
      setCurrentVid(data);
    },
    onError: () => {
      console.log(videoError);
    },
  });
  const {
    fetchData: getChannel,
    error: channelError,
    loading: channelLoading,
  } = useAxios({
    config: {
      url: `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&fields=items&id=${currentVid?.items[0].snippet.channelId}&key=AIzaSyDNOnpFbcL_7hnD-f1AByhVBIDG64HUNe4`,
      method: "GET",
    },
    onSuccess: (data: { items: any; nextPageToken: string }) => {
      setCurrentChannel(data);
      console.log(data);
    },
    onError: () => {
      console.log(videoError);
    },
  });

  useEffect(() => {
    getVideo();
  }, []);

  useEffect(() => {
    if (currentVid != null) {
      getChannel();
    }
  }, [currentVid]);

  return (
    <div className="w-full h-full grid grid-cols-3 gap-x-7 md:px-10 px-2 overflow-y-hidden" id="root">
      <div className="lg:col-span-2 col-span-3 space-y-3 ">
        <div className="bg-white w-full aspect-video rounded-xl">
          <iframe
            className="w-full h-full outline-none rounded-xl"
            src={`https://www.youtube.com/embed/${params.videoId}`}
            allowFullScreen
            title="Embedded youtube"
          />
        </div>
        <div className="dark:text-forth-color text-secondary-color md:text-lg font-semibold">
          {currentVid?.items[0].snippet.title}
        </div>
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image
              alt=" "
              src={currentChannel?.items[0].snippet.thumbnails.medium.url}
              width={1000}
              height={1000}
              className="w-10 h-10 aspect-square object-cover object-center rounded-full"
            />
            <div>
              <div className="text-sm font-bold dark:text-forth-color text-primary-color">
                {currentVid?.items[0].snippet.channelTitle}
              </div>
              <div className="uppercase text-xs dark:text-gray-300/50 text-primary-color">
                {numeral(
                  currentChannel?.items[0].statistics.subscriberCount
                ).format("0.0a")}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-x-6 dark:text-gray-300/50 text-primary-color">
            <div className="flex items-center gap-x-1 text-sm font-semibold dark:text-gray-50/95 text-primary-color">
              <div className="uppercase">
                {numeral(currentVid?.items[0].statistics.viewCount).format(
                  "0.0a"
                )}
              </div>
              <div>views</div>
            </div>
            <div className="uppercase text-sm font-semibold dark:text-gray-50/95 text-primary-color flex items-center gap-x-1">
              <FontAwesomeIcon icon={faThumbsUp} />
              {numeral(currentVid?.items[0].statistics.likeCount).format(
                "0.0a"
              )}
            </div>
          </div>
        </div>
        <div
          className="w-full p-4 dark:bg-white/10 dark:hover:bg-white/20 bg-black/5 hover:bg-black/10 cursor-pointer rounded-xl"
          onClick={toggleDescription}
        >
          <div className="text-sm dark:text-white text-primary-color font-medium ">
            <div className="flex gap-x-2">
              <div className="whitespace-nowrap">
                {currentVid &&
                  formatDistanceToNow(
                    new Date(currentVid?.items[0]?.snippet.publishedAt),
                    {
                      addSuffix: true,
                    }
                  )}
              </div>
              <div className="dark:text-gray-300/50 text-primary-color">
                {currentVid?.items[0].snippet.tags
                  .map((tag: any) => `#${tag}`)
                  .join(" ")}
              </div>
            </div>
            <div className="mt-4">
              {expanded ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      currentVid?.items[0].snippet.localized.description.replace(
                        /\n/g,
                        "<br>"
                      ),
                  }}
                />
              ) : (
                <div
                  dangerouslySetInnerHTML={{
                    __html: currentVid?.items[0].snippet.localized.description
                      .slice(0, 150)
                      .replace(/\n/g, "<br>"),
                  }}
                />
              )}
              {currentVid?.items[0].snippet.localized.description.length >
                150 && (
                <span
                  onClick={toggleDescription}
                  className="cursor-pointer dark:text-gray-300/50 text-primary-color"
                >
                  {expanded ? (
                    <div>
                      <br /> Show less
                    </div>
                  ) : (
                    " ...more"
                  )}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="lg:hidden block">
          <SuggestedVids
            vidTitle={currentVid?.items[0].snippet.title}
            channelId={currentChannel?.items[0].id}
          />
        </div>
        <Comments
          vidId={params.videoId}
          commentCount={currentVid?.items[0].statistics.likeCount}
        />
      </div>
      <div className="col-span-1 h-fit hidden lg:block">
        <SuggestedVids
          vidTitle={currentVid?.items[0].snippet.title}
          channelId={currentChannel?.items[0].id}
        />
      </div>
    </div>
  );
};
export default VideoPage;
