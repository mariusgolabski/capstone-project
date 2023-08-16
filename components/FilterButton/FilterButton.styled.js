import styled from "styled-components";

export const StyledButton = styled.button`
  font-size: 0.8rem;
  text-transform: uppercase;
  border-radius: 0.375rem;
  padding: 0.7rem 1.5rem;
  cursor: pointer;
  border: none;
  background-color: ${({ $isActive }) => ($isActive ? "#000" : "transparent")};
  color: ${({ $isActive }) => ($isActive ? "#fff" : "#666")};

  &:hover {
    color: ${({ $isActive }) => ($isActive ? "#fff" : "#000")};
  }
`;
