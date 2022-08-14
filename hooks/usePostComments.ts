import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getPostCommentsQueryKey = (postId: number): any[] => ['posts', 'post', postId];

const getPostComments = async (postId: number) => {
  const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);

  return data;
};

// TODO: add return type;
const usePostComments = (postId: number) => {
  return useQuery(['getPost'], () => getPostComments(postId));
};

export { usePostComments as default, getPostComments, getPostCommentsQueryKey };
