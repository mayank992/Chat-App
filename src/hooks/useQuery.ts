import { useEffect, useState } from "react";
import { messages } from "../constants/errorMessages";
import isEqual from "lodash.isequal";

enum QueryStatus {
  loading = "loading",
  error = "error",
  success = "success",
  idle = "idle",
  fetching = "fetching",
}

type QueryOptions = {
  refetchInterval?: number;
};

export function useQuery<T>(
  queryKeys: any[],
  fn: (controller: AbortController) => Promise<any>,
  options: QueryOptions = {}
) {
  const { refetchInterval } = options;
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

  function fetchData(): [AbortController, Promise<any>] {
    setState((prevState) => ({
      ...prevState,
      status:
        prevState.status === QueryStatus.loading
          ? QueryStatus.loading
          : QueryStatus.fetching,
    }));

    const controller = new AbortController();

    const promise = fn(controller)
      .then((response) => {
        setState(({ data }) => {
          return {
            data: isEqual(data, response) ? data : response,
            status: QueryStatus.success,
            error: null,
          };
        });
      })
      .catch((error) => {
        const errorData = error.response
          ? error.response.data
          : { message: messages.INTERNAL_SERVER_ERROR };

        setState((prevState) => ({
          ...prevState,
          status: QueryStatus.error,
          error: errorData,
        }));
        throw error;
      });

    return [controller, promise];
  }

  useEffect(() => {
    let timerId: number | undefined;
    let abortController: AbortController;

    setState((curState) => ({ ...curState, status: QueryStatus.loading }));
    [abortController] = fetchData();

    if (refetchInterval != null) {
      timerId = window.setInterval(() => {
        let promise: Promise<any>;
        [abortController, promise] = fetchData();

        promise.catch((error) => {
          console.log(error.message);
          clearInterval(timerId);
        });
      }, refetchInterval);
    }

    return () => {
      // aborts the pending api call (if any) before applying new effect
      abortController?.abort();
      clearInterval(timerId);
    };
  }, [...queryKeys, refetchInterval]);

  return {
    data: state.data,
    error: state.error,
    isLoading,
    isError,
    isSuccess,
    isIdle,
    isFetching,
    refreshData: fetchData,
  };
}
