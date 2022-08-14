import { dehydrate, QueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import styled from 'styled-components';

import Card from '../../components/card';
import Feed from '../../components/feed';
import usePosts, { getPosts, getPostsQueryKey } from '../../hooks/usePosts';

const CardLink = styled.a`
  display: block;
  margin-bottom: 1rem;

  &:hover {
    border-radius: 10px;
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
`;

interface AuthorProps {
  authorId: number;
}

export default function Author({ authorId }: AuthorProps): JSX.Element {
  const { data: posts, isLoading } = usePosts(authorId);

  return (
    <main>
      <h1>Posts by: 🕵️ Anonomous author #{authorId}</h1>
      {isLoading ? (
        <progress />
      ) : (
        <Feed>
          {posts.map((post) => (
            <Link href={`/post/${post.id}`} passHref>
              <CardLink>
                <Card content={post.body} key={`post-${post.id}`} title={post.title} />
              </CardLink>
            </Link>
          ))}
        </Feed>
      )}
    </main>
  );
}

export async function getServerSideProps(context) {
  const { authorId } = context.params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(getPostsQueryKey(authorId), () => getPosts(authorId));

  return {
    props: {
      authorId,
      dehydratedState: dehydrate(queryClient),
    },
  };
}
