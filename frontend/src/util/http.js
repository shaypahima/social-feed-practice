import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const queryClient = new QueryClient

export async function getLoggedInUser() {
  const response = await axios.get("http://192.168.1.100:3000/user");
  if (response.status !== 200) {
    return null;
  }
  return response.data.user;
}

export async function getPosts() {
  const response = await axios.get("http://192.168.1.100:3000/posts");
  if (response.status !== 200) {
    return null;
  }
  return response.data.posts;
}

export async function login() {
  //TODO
}

export async function signup() {
  //TODO
}

export async function logout() {
}