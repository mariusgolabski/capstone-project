import { styled } from "styled-components";

export const StyledCard = styled.article`
  border: 1px solid #eaeaea;
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.04);
  background-color: #ffffff;
`;

export const StyledCategory = styled.span`
  color: #666;
  font-size: 0.8rem;
  text-transform: uppercase;
  border-radius: 1rem;
`;

export const StyledHeader = styled.div`
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  padding: 2rem 2rem 1rem 2rem;
  border-bottom: 1px solid #eaeaea;
`;

export const StyledQuestion = styled.h2`
  margin-top: 0.8rem;
  color: #171717;
`;

export const StyledAnswer = styled.p`
  line-height: 1.2;
  color: #171717;
  padding: 1rem 2rem 2rem 2rem;
`;
