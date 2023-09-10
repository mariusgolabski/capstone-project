import useSWR from "swr";
import { Avatar } from "../Avatar";
import {
  Flex,
  StyledAvatarWrapper,
  StyledCard,
  StyledCompanyName,
  StyledContentWrapper,
  StyledCount,
  StyledFooter,
  StyledLink,
  StyledProfileInfoWrapper,
  StyledWrapper,
} from "./LeaderPreview.styled";

export default function LeaderPreview({ leader }) {
  const { data: jobsCountData } = useSWR(`/api/users/${leader._id}/job-count`);
  const { data: interviewsCountData } = useSWR(
    `/api/users/${leader._id}/interview-count`
  );

  return (
    <StyledLink href={`/users/${leader._id}`}>
      <StyledCard>
        <StyledContentWrapper>
          <StyledAvatarWrapper>
            <Avatar userImage={leader.userProfileImagePath} />
            <StyledProfileInfoWrapper>
              <h2>
                {leader.firstName} {leader.lastName}
              </h2>

              <StyledCompanyName>
                {leader.jobTitle} @{leader.companyName}
              </StyledCompanyName>
            </StyledProfileInfoWrapper>
          </StyledAvatarWrapper>
        </StyledContentWrapper>

        <StyledFooter>
          <StyledWrapper>
            <StyledCount>{jobsCountData?.jobsCount}</StyledCount>
            <span>Jobs</span>
          </StyledWrapper>

          <StyledWrapper>
            <StyledCount>{interviewsCountData?.interviewsCount}</StyledCount>
            <span>Interviews</span>
          </StyledWrapper>
        </StyledFooter>
      </StyledCard>
    </StyledLink>
  );
}
