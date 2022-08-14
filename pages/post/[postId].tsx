import { dehydrate, QueryClient } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import styled from 'styled-components';

// import PostComments from '../../components/postComments';
import usePost, { getPost, getPostQueryKey } from '../../hooks/usePost';

const PostComments = dynamic(() => import('../../components/postComments'), { ssr: false });

const Title = styled.h1`
  text-transform: capitalize;
`;

const StyledA = styled.a`
  color: salmon;
  text-decoration: underline;
`;

interface PostProps {
  postId: number;
}

export default function Post({ postId }: PostProps): JSX.Element {
  const { data: post, isLoading } = usePost(postId);

  return (
    <article>
      {isLoading ? (
        <progress />
      ) : (
        <>
          <Title>{post.title}</Title>
          <section>
            <p>{post.body}</p>
            <h4>
              😍 I love it!{' '}
              <Link href={`/author/${post.userId}`} passHref>
                <StyledA>Show me more by this author</StyledA>
              </Link>
            </h4>
          </section>
          <PostComments postId={postId} />
        </>
      )}
    </article>
  );
}

export async function getServerSideProps(context) {
  const { postId } = context.params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(getPostQueryKey(postId), () => getPost(postId));

  return {
    props: {
      postId,
      dehydratedState: dehydrate(queryClient),
    },
  };
}
