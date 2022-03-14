export interface Mutation<Tdata, TError, TParams> {
  data: Tdata | null;
  error: TError | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  isIdle: boolean;
  mutate: (data: TParams) => Promise<any>;
}
