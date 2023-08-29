"use client";

import axios from "axios";
import { useCallback, useState } from "react";

const useAxios = ({
  config,
  onSuccess,
  onError,
}: {
  config: any;
  onSuccess: any;
  onError: any;
}) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(
    async (body?: any) => {
      setData(undefined);
      setLoading(true);
      setError(undefined);
      const { headers, ...restParams } = config;
      try {
        const response = await axios.request<any>({
          data: body || undefined,
          headers: headers,
          ...restParams,
        });
        const data = response.data;

        setData(data);
        onSuccess && onSuccess(data);
        return data;
      } catch (error: any) {
        setError(error);
        onError(error);
      } finally {
        setLoading(false);
      }
    },
    [config]
  );
  const clearError = () => setError(undefined);

  return { data, error, loading, fetchData, clearError };
};
export default useAxios;
