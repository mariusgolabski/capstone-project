// import { user } from "../../db/user";
import useSWR from "swr";

import {
  StyledWrapper,
  StyledProfileHeaderWrapper,
  StyledCoverImage,
  StyledUserProfileImageWrapper,
  StyledProfileInfo,
  StyledDescriptionText,
  StyledUserProfileCard,
  StyledUserProfileImage,
  SyledProfileCoverWrapper,
} from "./ProfileHeader.styled";

export default function ProfileHeader() {
  const { data, error, isLoading } = useSWR(
    "/api/users/64f0c5a8b979a78d64d3b750"
  );

  if (error) {
    return <div>Failed to load user data.</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No user data available.</div>;
  }

  return (
    <StyledWrapper>
      <StyledProfileHeaderWrapper>
        <SyledProfileCoverWrapper>
          <StyledCoverImage
            priority={true}
            src={data.userCoverImagePath}
            alt="profile-cover"
            width={1110}
            height={160}
          />
        </SyledProfileCoverWrapper>
        <StyledUserProfileCard>
          <StyledUserProfileImageWrapper>
            <StyledUserProfileImage
              src={data.userProfileImagePath}
              alt="avatar"
              width={168}
              height={168}
            />
          </StyledUserProfileImageWrapper>
          <StyledProfileInfo>
            <h1>{`${data.firstName} ${data.lastName}`}</h1>
            <StyledDescriptionText>{`${data.jobTitle} @${data.companyName}`}</StyledDescriptionText>
          </StyledProfileInfo>
        </StyledUserProfileCard>
      </StyledProfileHeaderWrapper>
    </StyledWrapper>
  );
}
