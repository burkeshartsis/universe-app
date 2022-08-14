import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getPostQueryKey = (postId: number): any[] => ['posts', 'post', postId];

const getPost = async (postId: number) => {
  const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);

  return data;
};

// TODO: add return type;
const usePost = (postId: number, prefetch?: boolean) => {
  return useQuery([getPostQueryKey(postId)], () => getPost(postId));
};

export { usePost as default, getPost, getPostQueryKey };
