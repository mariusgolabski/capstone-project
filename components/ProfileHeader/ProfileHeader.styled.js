import Image from "next/image";
import styled from "styled-components";

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
