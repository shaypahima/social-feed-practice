import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { SERVER_URL } from "../util/constants";

export function useGetUserData(token) {
  return useQuery({
    queryKey: ['user-data',token],
    queryFn: async () => {
      const response = await axios.get(`${SERVER_URL}/auth/user-data`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status !== 200) {
        return null;
      }
      return response.data.user;
    }
  })
}

export function useUpdateUserStatus() {
  return useMutation({
    mutationFn: async ({token, status}) => {

      
      const response = await axios.post(`${SERVER_URL}/auth/update-status`, { status }, {
        headers: { Authorization : `Bearer ${token}` }
      });
      return response.data;
    }
  })
}

export function useLogin() {
  return useMutation({
    mutationFn: async (user) => {
      const response = await axios.post(`${SERVER_URL}/auth/login`, user);
      return response.data;
    }

  })
}


export function useSignup() {
  return useMutation({
    mutationFn: async (user) => {
      const response = await axios.put(`${SERVER_URL}/auth/signup`, user);
      return response.data;
    }
  })

}

export function useUpdateUser() { }

export function useDeleteUser() { }


