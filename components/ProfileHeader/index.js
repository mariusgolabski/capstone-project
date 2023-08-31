import { user } from "../../db/user";

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
  return (
    <StyledWrapper>
      <StyledProfileHeaderWrapper>
        <SyledProfileCoverWrapper>
          <StyledCoverImage
            priority={true}
            src={user.userCoverImagePath}
            alt="profile-cover"
            width={1110}
            height={160}
          />
        </SyledProfileCoverWrapper>
        <StyledUserProfileCard>
          <StyledUserProfileImageWrapper>
            <StyledUserProfileImage
              src={user.userProfileImagePath}
              alt="avatar"
              width={168}
              height={168}
            />
          </StyledUserProfileImageWrapper>
          <StyledProfileInfo>
            <h1>{`${user.firstName} ${user.lastName}`}</h1>
            <StyledDescriptionText>{`${user.jobTitle} @${user.companyName}`}</StyledDescriptionText>
          </StyledProfileInfo>
        </StyledUserProfileCard>
      </StyledProfileHeaderWrapper>
    </StyledWrapper>
  );
}
