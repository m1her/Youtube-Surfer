import React from "react";

const Loading = () => {
  return (
    <div className="flex min-h-screen bg-white dark:bg-neutral-800">
    {/* Video */}
    <div className="w-3/4 p-8">
      <div className="h-96 bg-gray-300 dark:black animate-pulse"></div>
      <div className="mt-4 h-6 bg-gray-300 dark:black animate-pulse"></div>
      <div className="mt-2 h-6 bg-gray-300 dark:black animate-pulse"></div>
    </div>
    {/* Suggested Videos */}
    <div className="w-1/4 p-4 border-l border-gray-200 dark:border-neutral-600">
      <div className="mb-4 h-24 bg-gray-300 dark:black animate-pulse"></div>
      <div className="mt-2 h-4 bg-gray-300 dark:black animate-pulse"></div>
      <div className="mb-4 h-24 bg-gray-300 dark:black animate-pulse"></div>
      <div className="mt-2 h-4 bg-gray-300 dark:black animate-pulse"></div>
      {/* More suggested videos... */}
    </div>
  </div>
  );
};

export default Loading;
