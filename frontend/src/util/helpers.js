// Helper function for creating FormData
export const createPostFormData = (post) => {
  const formData = new FormData();
  formData.append("title", post.title);
  formData.append("content", post.content);
  formData.append("author", post.author);
  if (post.image) {
    formData.append("imageFile", post.image.blobFile);
    formData.append("imageUrl", `images/${post.image.name}`);
  }
  return formData;
};