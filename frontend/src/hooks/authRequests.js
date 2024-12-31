import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { SERVER_URL } from "../util/constants";

export function useGetUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await axios.get(`${SERVER_URL}/auth/user`);
      if (response.status !== 200) {
        return null;
      }
      return response.data.user;
    }
  })
}

export function useUpdateUserStatus() {
  return useMutation({
    mutationFn: async (status) => {
      const response = await axios.post(`${SERVER_URL}/auth/update-status`, { status });
      return response.data;
    }
  })
}

export function useLogin() { }

export function useLogout() {

}

export function useSignup() { }

export function useUpdateUser() { }

export function useDeleteUser() { }


