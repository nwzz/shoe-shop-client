import { request } from "../helper/axios-utils";
import { useQuery, useMutation } from "react-query";
import { useGlobalContext } from "./context";

export const usePostData = () => {
  const value = useGlobalContext();
  return useMutation(({ path, formData }) =>
    request({
      method: "POST",
      url: path,
      data: formData,
      headers: {
        Authorization: "Bearer " + value.user,
      },
    })
  );
};

export const usePutData = () => {
  const value = useGlobalContext();
  return useMutation(({ path, formData }) =>
    request({
      method: "PUT",
      url: path,
      data: formData,
      headers: {
        Authorization: "Bearer " + value.user,
      },
    })
  );
};

export const useGetData = (key, path) => {
  const value = useGlobalContext();
  const { status, data, error, isLoading, isError, refetch } = useQuery(
    [
      key,
      {
        path: path,
        headers: {
          Authorization: "Bearer " + value.user,
        },
      },
    ],
    ({ queryKey }) => {
      const { path, headers } = queryKey[1];
      return request({
        method: "GET",
        url: path,
        headers: headers,
      });
    }
  );
  return { status, data, error, isLoading, isError, refetch };
};

export const useDeleteData = () => {
  const value = useGlobalContext();
  return useMutation(({ path }) =>
    request({
      method: "DELETE",
      url: path,
      headers: {
        Authorization: "Bearer " + value.user,
      },
    })
  );
};
