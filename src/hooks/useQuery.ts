import { useEffect, useState } from "react";

enum QueryStatus {
  loading = "loading",
  error = "error",
  success = "success",
  idle = "idle",
}

type QueryOptions = {
  refetchInterval?: number;
};

export function useQuery<T>(
  fn: () => Promise<any>,
  options: QueryOptions = {}
) {
  const { refetchInterval } = options;

  const [status, setStatus] = useState<QueryStatus>(QueryStatus.idle);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(null);

  const isLoading = status === QueryStatus.loading;
  const isError = status === QueryStatus.error;
  const isSuccess = status === QueryStatus.success;
  const isIdle = status === QueryStatus.idle;

  useEffect(() => {
    let timerId: number;

    (function poll() {
      setStatus(QueryStatus.loading);
      fn()
        .then((data) => {
          setData(data);
          setStatus(QueryStatus.success);
        })
        .catch((error) => {
          setError(error);
          setStatus(QueryStatus.error);
        });

      if (refetchInterval != null) {
        timerId = window.setTimeout(poll, refetchInterval);
      }
    })();

    return () => {
      clearTimeout(timerId);
    };
  }, [refetchInterval]);

  return { data, error, isLoading, isError, isSuccess, isIdle };
}
