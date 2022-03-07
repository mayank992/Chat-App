import { useState } from "react";
import { messages } from "../constants/errorMessages";

enum MutationStatus {
  loading = "loading",
  error = "error",
  success = "success",
  idle = "idle",
}

export function useMutation<TReq, TRes>(
  fn: (reqData: TReq) => Promise<TRes>,
  options: {
    onSuccess?: (res: TRes) => void;
    onError?: (error: any) => void;
  } = {}
) {
  const [state, setState] = useState<{
    status: MutationStatus;
    data: TRes | null;
    error: any;
  }>({
    status: MutationStatus.idle,
    data: null,
    error: null,
  });

  const isLoading = state.status === MutationStatus.loading;
  const isError = state.status === MutationStatus.error;
  const isSuccess = state.status === MutationStatus.success;
  const isIdle = state.status === MutationStatus.idle;

  function mutate(reqData: TReq): Promise<any> {
    setState((prevState) => ({
      ...prevState,
      status: MutationStatus.loading,
    }));

    const promise = fn(reqData)
      .then((response) => {
        setState({
          data: response,
          status: MutationStatus.success,
          error: null,
        });
        options.onSuccess?.(response);
      })
      .catch((error) => {
        const errorData = error.response
          ? error.response.data
          : { message: messages.NETWORK_ERROR };

        setState((prevState) => {
          return {
            ...prevState,
            status: MutationStatus.error,
            error: errorData,
          };
        });
        options.onError?.(errorData);
      });

    return promise;
  }

  return {
    data: state.data,
    error: state.error,
    isLoading,
    isError,
    isSuccess,
    isIdle,
    mutate,
  };
}
