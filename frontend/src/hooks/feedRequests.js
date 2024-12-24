import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

export function useGetPosts(){
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await axios.get("http://192.168.1.100:3000/posts");
      if (response.status !== 200) {
        return null;
      }
      return response.data.posts;
    },
  });
}

export function useCreatePost(){
  return useMutation({
    mutationFn: async (post) => {
      const response = await axios.post("http://192.168.1.100:3000/posts", post);
      if (response.status !== 200) {
        return null;
      }
      return response.data.post;
    },
  });
}

export function useUpdatePost(){}

export function useDeletePost(id){
return {mutate: () => console.log("delete post", id)}
}

