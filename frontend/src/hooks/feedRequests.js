import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "../util/queryClient";
import { SERVER_URL } from "../util/constants";


export function useGetPosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await axios.get(`${SERVER_URL}/feed/posts`);
      if (response.status !== 200) {
        return null;
      }
      const posts = response.data.posts.map(post => ({ 
        ...post,
        imageUrl: SERVER_URL+ '/' + post.imageUrl
      }));
      console.log(posts, "posts");
      return posts;
    },
  });
}

export function useGetPostAuthor(authorId, postId) {
  return useQuery({
    queryKey: ["post-author", postId],
    queryFn: async () => {
      const response = await axios.get(`${SERVER_URL}/feed/post/${authorId}`);
      if (response.status !== 200) {
        return null;
      }
      return response.data.author;
    },
  });
}

export function useCreatePost() {
  return useMutation({
    mutationFn: async (post) => {
      const response = await axios.post(`${SERVER_URL}/feed/post`, { ...post, imageUrl: "https://images.unsplash.com/photo-1576606539605-b2a44fa58467?q=80&w=1974&auto=format&fit=crop" });
      if (response.status !== 200) {
        return null;
      }
      return response.data.post;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    }
  });
}

export function useUpdatePost() { }

export function useDeletePost(id) {
  return useMutation({
    mutationFn: async () => {
      console.log("delete post", id);
      const response = await axios.delete(`${SERVER_URL}/feed/post/${id}`);
      if (response.status !== 200) {
        return null;
      }
      return response.data.post;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    }
  });
}

