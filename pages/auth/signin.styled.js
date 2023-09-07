import styled from "styled-components";

export default SignInStyled;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  min-height: calc(100vh - 4rem);
  justify-content: center;
`;

export const StyledHeading = styled.h1`
  margin-bottom: 3rem;
`;

export const StyledLogin = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledButton = styled.button`
  width: 100%;
  color: #fff;
  background-color: #24292e;
  height: 2.5rem;
  border-radius: 0.375rem;
  font-weight: 500;
  padding: 0 0.75rem;
  border: none;
  cursor: pointer;
`;

export const StyledDivider = styled.hr`
  margin: 1rem 0;
  border: none;
  border-bottom: 1px solid #eaeaea;
`;

export const StyledLabel = styled.label`
  display: block;
  font-size: 13px;
  color: #666;
  margin-bottom: 0.5rem;
  max-width: 100%;
`;

export const StyledInput = styled.input`
  height: 2.5rem;
  font-size: inherit;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.7rem;
  border: 1px solid #e5e5e5;
  border-radius: 0.375rem;
  &:focus {
    outline: none;
    border: 1px solid #000;
  }
`;

export const StyledLoginButton = styled.button`
  width: 100%;
  height: 2.5rem;
  font-weight: 500;
  padding: 0 0.75rem;
  color: #171717;
  cursor: pointer;
  border: 1px solid #e5e5e5;
  border-radius: 0.375rem;
  background-color: #f2f2f2;
  &:hover {
    background-color: #fff;
  }
`;
