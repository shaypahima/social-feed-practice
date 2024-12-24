import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useGetUser(){
  return useQuery({
    queryKey:['user'],
    queryFn: async () => {
      const response = await axios.get("http://192.168.1.100:3000/auth/user");
      if (response.status !== 200) {
        return null;
      }
      return response.data.user;
    }
  })
}

export function useLogin(){}

export function useLogout(){}

export function useSignup(){}

export function useUpdateUser(){}

export function useDeleteUser(){}


