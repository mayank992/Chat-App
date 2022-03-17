import { useMutation } from '../hooks/useMutation';
import { UserType } from '../types/index';
import { client } from './apiClient';

type Options = {
  onSuccess?: () => any;
  onError?: () => any;
};

type LoginForm = {
  username: string;
  firstname: string;
  lastname: string;
};

export const useLogin = (options: Options) => {
  const { isError, error, mutate, isLoading } = useMutation<UserType, { message: string }, LoginForm>(
    ({ username, firstname, lastname }: LoginForm) =>
      client('/users/login', null, {
        method: 'POST',
        data: {
          username,
          name: `${firstname} ${lastname}`,
        },
      }),
    { ...options }
  );

  return { isError, error, mutate, isLoading };
};
