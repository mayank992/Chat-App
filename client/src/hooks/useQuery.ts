import { useEffect, useState, useRef } from "react";
import { MESSAGES } from "../constants/errorMessages";
import isEqual from "lodash.isequal";

enum QueryStatus {
  loading = "loading",
  error = "error",
  success = "success",
  idle = "idle",
  fetching = "fetching",
}

type QueryOptions = {
  pollingInterval?: number;
};

export function useQuery<T>(
  queryKeys: any[],
  fn: (controller: AbortController) => Promise<any>,
  options: QueryOptions = {}
) {
  const { pollingInterval } = options;
  const abortControllerRef = useRef<AbortController>();
  const [state, setState] = useState<{
    status: QueryStatus;
    data: T | null;
    error: any;
  }>({
    status: QueryStatus.idle,
    data: null,
    error: null,
  });

  const isLoading = state.status === QueryStatus.loading;
  const isError = state.status === QueryStatus.error;
  const isSuccess = state.status === QueryStatus.success;
  const isIdle = state.status === QueryStatus.idle;
  const isFetching = state.status === QueryStatus.fetching;

  async function fetchData() {
    if (isLoading || isFetching) return Promise.resolve();

    setState((prevState) => ({
      ...prevState,
      status:
        prevState.status === QueryStatus.idle
          ? QueryStatus.loading
          : QueryStatus.fetching,
    }));

    abortControllerRef.current = new AbortController();

    try {
      const response = await fn(abortControllerRef.current);

      setState(({ data }) => {
        return {
          data: isEqual(data, response) ? data : response,
          status: QueryStatus.success,
          error: null,
        };
      });
    } catch (error: any) {
      const errorData = error.response
        ? error.response.data
        : { message: MESSAGES.NETWORK_ERROR };

      setState((prevState) => ({
        ...prevState,
        status: QueryStatus.error,
        error: errorData,
      }));

      throw errorData;
    }
  }

  useEffect(() => {
    let timerId: number | undefined;

    (async function poll() {
      try {
        await fetchData();

        if (pollingInterval != null) {
          timerId = window.setTimeout(poll, pollingInterval);
        }
      } catch (error: any) {
        console.error(error.message);
      }
    })();

    return () => {
      setState({ status: QueryStatus.idle, data: null, error: null });
      abortControllerRef.current?.abort();
      clearTimeout(timerId);
    };
  }, [...queryKeys, pollingInterval]);

  return {
    data: state.data,
    error: state.error,
    isLoading,
    isError,
    isSuccess,
    isIdle,
    isFetching,
    refetchData: fetchData,
  };
}
