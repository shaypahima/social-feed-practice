import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

export function useGetPosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await axios.get("http://192.168.1.100:3000/feed/posts");
      if (response.status !== 200) {
        return null;
      }
      return response.data.posts;
    },
  });
}

export function useGetPostAuthor(id) {
  return useQuery({
    queryKey: ["post-author", id],
    queryFn: async () => {
      const response = await axios.get(`http://192.168.1.100:3000/auth/user`);
      return response.data.author;
    },
  });
}

export function useCreatePost() {
  return useMutation({
    mutationFn: async (post) => {
      const response = await axios.post("http://192.168.1.100:3000/feed/create-post", post);
      if (response.status !== 200) {
        return null;
      }
      return response.data.post;
    },
  });
}

export function useUpdatePost() { }

export function useDeletePost(id) {
  return { mutate: () => console.log("delete post", id) }
}

