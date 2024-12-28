import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

export function useGetUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await axios.get("http://192.168.1.100:3000/auth/user");
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
      const response = await axios.post("http://192.168.1.100:3000/auth/update-status", { status });
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


