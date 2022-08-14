import React from 'react';
import styled from 'styled-components';

import usePostComments from '../hooks/usePostComments';
import Feed from './feed';

interface PostCommentsProps {
  postId: number;
}

const PostComments = ({ postId }: PostCommentsProps): JSX.Element => {
  const { data: comments, isLoading } = usePostComments(postId);

  return (
    <>
      <h2>Comments</h2>
      <section>
        {isLoading ? (
          <progress />
        ) : (
          <Feed>
            {comments.map((comment) => (
              <li key={`comment-${comment.id}`}>
                <h4>{comment.name}</h4>
                <p>{comment.body}</p>
              </li>
            ))}
          </Feed>
        )}
      </section>
    </>
  );
};

export default PostComments;
