import Link from 'next/link';
import styled from 'styled-components';
import Card from '../components/card';
import Feed from '../components/feed';
import usePosts from '../hooks/usePosts';

const CardLink = styled.a`
  display: block;
  margin-bottom: 1rem;

  &:hover {
    border-radius: 10px;
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
`;

export default function Home(): JSX.Element {
  const { data: posts, isLoading } = usePosts();

  return (
    <main>
      {isLoading ? (
        <progress />
      ) : (
        <Feed>
          {posts.map((post) => (
            <Link href={`/post/${post.id}`} key={`post-${post.id}`} passHref>
              <CardLink>
                <Card content={post.body} title={post.title} />
              </CardLink>
            </Link>
          ))}
        </Feed>
      )}
    </main>
  );
}
