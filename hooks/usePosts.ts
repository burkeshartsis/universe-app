import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getPostsQueryKey = (userId?: number): any[] => ['posts', ...(userId ? ['user', userId] : [])];

const getPosts = async (userId: number) => {
  const url = new URL('https://jsonplaceholder.typicode.com/posts');
  if (userId) {
    url.searchParams.set('userId', userId.toString());
  }

  const { data } = await axios.get(url.toString());

  return data;
};

// TODO: add return type;
const usePosts = (userId?: number) => {
  return useQuery(getPostsQueryKey(userId), () => getPosts(userId));
};

export { usePosts as default, getPosts, getPostsQueryKey };
