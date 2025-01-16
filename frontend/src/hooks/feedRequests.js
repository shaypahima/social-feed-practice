import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "../util/queryClient";
import { SERVER_URL } from "../util/constants";
import { createPostFormData } from "../util/helpers";


// Fetch posts
export function useGetPosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data, status } = await axios.get(`${SERVER_URL}/feed/posts`);
      if (status !== 200) {
        throw new Error("Failed to fetch posts");
      }

      return data.posts.map((post) => ({
        ...post,
        imageUrl: `${SERVER_URL}/${post.imageUrl}`,
      }));
    },
  });
}

// Fetch post author by ID
export function useGetPostAuthor(authorId, postId) {
  return useQuery({
    queryKey: ["post-author", postId],
    queryFn: async () => {
      const { data, status } = await axios.get(`${SERVER_URL}/feed/post/${authorId}`);
      if (status !== 200) {
        throw new Error("Failed to fetch post author");
      }
      return data.author;
    },
  });
}

// Create a new post
export function useCreatePost() {
  return useMutation({
    mutationFn: async (post) => {
      console.log(post, "post");
      const formData = createPostFormData(post);
    
      const { data, status } = await axios.post(`${SERVER_URL}/feed/post`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (status !== 200) {
        throw new Error("Failed to create post");
      }
      return data.post;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      console.log(error, "error");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    }
  });
}

// Update a post (placeholder for future implementation)
export function useUpdatePost() {
  return useMutation({
    mutationFn: async ({ id, updatedPost }) => {
      const formData = createPostFormData(updatedPost);
      const { data, status } = await axios.put(`${SERVER_URL}/feed/post/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (status !== 200) {
        throw new Error("Failed to update post");
      }
      return data.post;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

// Delete a post by ID
export function useDeletePost(id) {
  return useMutation({
    mutationFn: async () => {
      const { data, status } = await axios.delete(`${SERVER_URL}/feed/post/${id}`);
      if (status !== 200) {
        throw new Error("Failed to delete post");
      }
      return data.post;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}
