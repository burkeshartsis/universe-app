import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const CardWrapper = styled.li`
  background: #fff;
  border: 1px solid transparent;
  border-radius: 10px;
  padding: 0 1rem 0.5rem;
`;

const CardTitle = styled.h2`
  text-transform: capitalize;
`;

interface CardProps {
  content: string; // TODO: needs a better name
  title: string;
}

const Card = ({ content, title }: CardProps): JSX.Element => (
  <CardWrapper>
    <CardTitle>{title}</CardTitle>
    <p>{content}</p>
  </CardWrapper>
);

export default Card;
