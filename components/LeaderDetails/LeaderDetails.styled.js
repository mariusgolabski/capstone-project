import Image from "next/image";
import styled, { css } from "styled-components";

export const ProfileTabNavWrapper = styled.div`
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(234, 234, 234, 1);
`;

export const StyledWrapper = styled.div`
  margin: 0 auto;
  max-width: 1100px;
`;

export const StyledProfileHeaderWrapper = styled.div`
  margin-bottom: 1rem;
`;

export const SyledProfileCoverWrapper = styled.div`
  width: 100%;
  height: 22rem;
  @media (max-width: 600px) {
    height: 10rem;
  }
`;

export const StyledCoverImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
`;

export const StyledUserProfileCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem;
  margin: 0 auto;
  max-width: 1030px;

  @media (min-width: 600px) {
    flex-direction: row;
    align-items: center;
  }
`;

export const StyledProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 600px) {
    align-items: flex-start;
  }
`;

export const StyledUserProfileImageWrapper = styled.div`
  @media (min-width: 600px) {
    margin-right: 1.5rem;
  }
`;

export const StyledUserProfileImage = styled(Image)`
  background-color: #fff;
  padding: 0.25rem;
  margin-top: -4rem;
  border-radius: 50%;
  @media (min-width: 600px) {
    margin-top: -5rem;
  }
`;

export const StyledDescriptionText = styled.div`
  color: #666;
  text-align: center;
`;

export const StyledTabNavWrapper = styled.div`
  background-color: #fff;
  margin: 2rem auto;
  padding: 0 1rem;
  max-width: 1030px;
  display: flex;
  border-radius: 0.5rem;
`;

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
      color: #000;
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

export const StyledIntervieSection = styled.section`
  margin: 0 auto 4rem auto;
  padding: 0 1rem;
  max-width: 1030px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const StyledInterviewWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export const StyledFilterButton = styled.button`
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


export const StyledJobSection = styled.section`
margin: 0 auto;
padding: 0 1rem;
max-width: 1030px;
display: flex;
flex-direction: column;
gap: 1.5rem;
`;