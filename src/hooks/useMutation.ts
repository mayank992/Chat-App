import { useState } from "react";
import { messages } from "../constants/errorMessages";

enum MutationStatus {
  loading = "loading",
  error = "error",
  success = "success",
  idle = "idle",
}

interface MutationOptions<TData, TError> {
  onSuccess?: (res: TData) => void;
  onError?: (error: TError) => void;
}

export function useMutation<TData, TError, TParams>(
  fn: (reqData: TParams) => Promise<TData>,
  options: MutationOptions<TData, TError> = {}
) {
  const [state, setState] = useState<{
    status: MutationStatus;
    data: TData | null;
    error: TError | null;
  }>({
    status: MutationStatus.idle,
    data: null,
    error: null,
  });

  const isLoading = state.status === MutationStatus.loading;
  const isError = state.status === MutationStatus.error;
  const isSuccess = state.status === MutationStatus.success;
  const isIdle = state.status === MutationStatus.idle;

  function mutate(
    reqData: TParams,
    mutateOptions: MutationOptions<TData, TError> = {}
  ): Promise<any> {
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
        mutateOptions.onSuccess?.(response);
      })
      .catch((error) => {
        let errorData = error.response
          ? error.response.data
          : { message: messages.NETWORK_ERROR };

        if (!errorData.message) {
          errorData = { message: "Something went wrong" };
        }

        setState((prevState) => {
          return {
            ...prevState,
            status: MutationStatus.error,
            error: errorData,
          };
        });

        options.onError?.(errorData);
        mutateOptions.onError?.(errorData);
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
