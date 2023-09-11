import Link from "next/link";
import styled, { css } from "styled-components";

export const StyledHeaderWrapper = styled.header`
  z-index: 10;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: hsla(0, 0%, 100%, 0.8);
  backdrop-filter: saturate(180%) blur(5px);
  min-height: 4rem;
  box-shadow: inset 0 -1px 0 0 rgba(0, 0, 0, 0.1);
`;

export const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  width: calc(1400px + calc(2 * 1.5rem));
  padding: 0 1.5rem;
`;

export const SignedInStatus = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;

export const Loading = styled.div`
  position: relative;
  top: 0px;
  opacity: 1;
  overflow: hidden;
  border-radius: 0 0 0.6rem 0.6rem;
  margin: 0;
  background-color: rgba(150, 150, 150, 0.4);
  transition: all 0.2s ease-in;
`;

export const Avatar = styled.div`
  border-radius: 2rem;
  float: left;
  height: 2.5rem;
  width: 2.5rem;
  background-color: white;
  background-size: cover;
  background-repeat: no-repeat;

  /* Add the dynamic background-image style property */
  background-image: ${({ $imageUrl }) => $imageUrl && `url('${$imageUrl}')`};
`;

export const StyledButton = styled.button`
  height: 2.5rem;
  font-size: 0.8rem;
  font-weight: 500;
  border-radius: 0.375rem;
  padding: 0 0.75rem;
  cursor: pointer;
  border: none;
  background-color: #000;
  color: #fff;
`;

export const NavItems = styled.ul`
  margin-bottom: 2rem;
  padding: 0;
  list-style: none;
`;

export const NavItem = styled.li`
  cursor: pointer;
  display: inline-block;
  /* margin-right: 1rem; */
`;

export const StyledLink = styled(Link)`
  display: flex;
  color: #666;
  &:hover {
    color: #000;
  }

  ${({ $isActive }) =>
    $isActive &&
    css`
      color: #000;
    `}
`;

export const StyledSignInButton = styled.button`
  background-color: #000;
  width: 100%;
  display: flex;
  padding: 0;
  background-color: transparent;
  font-size: inherit;
  border: none;
  cursor: pointer;
  /* background-color: #fff; */
  color: #666;

  &:hover {
    color: #000;
  }

  ${({ $isActive }) =>
    $isActive &&
    css`
      color: #000;
    `}
`;

export const DropdownMenu = styled.div`
  min-width: 15rem;
  position: absolute;
  top: 4.375rem;
  right: 1.5rem;
  background-color: #fff;
  border: 1px solid #eaeaea;
  border-radius: 0.5rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1;
  display: flex;
  flex-direction: column;
`;

export const DropdownItem = styled.div`
  padding: 0.5rem 1rem;
  color: #333;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f2f2f2;
  }
`;

export const StyledDropDownUserEmail = styled.span`
  padding: 0.5rem 1rem;
  cursor: default;
  color: #333;
  transition: background-color 0.3s ease;
`;
