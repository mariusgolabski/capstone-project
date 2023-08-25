import styled, { css } from "styled-components";

export const StyledButton = styled.button`
  font-size: inherit;
  position: relative;
  padding: 1rem 1rem 1rem 0;
  border: none;
  cursor: pointer;
  background-color: #fff;
  color: #666;

  &:hover {
    color: #000;
  }

  ${({ $isActive }) =>
    $isActive &&
    css`
      &:before {
        content: "";
        position: absolute;
        left: 0;
        right: 1rem;
        bottom: -1px;
        border-bottom: 2px solid black;
      }
    `}
`;
