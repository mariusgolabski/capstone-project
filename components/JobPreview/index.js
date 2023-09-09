import {
  StyledAvatarWrapper,
  StyledCard,
  StyledCompanyName,
  StyledContentWrapper,
  StyledFooter,
  StyledList,
  StyledListItem,
  StyledSkill,
  StyledSkillsWrapper,
} from "@/components/JobPreview/JobPreview.styled";
import { Avatar } from "@/components/Avatar";

export default function JobPreview({ job }) {
  console.log(job);
  return (
    <StyledCard>
      <StyledContentWrapper>
        <StyledAvatarWrapper>
          <Avatar userImage={job.user_id.userProfileImagePath} />
          <StyledCompanyName>{job.companyName}</StyledCompanyName>
        </StyledAvatarWrapper>
        <h2>{job.jobTitle}</h2>
        <p>{`€ ${job.annualSalaryRange[0]} - ${job.annualSalaryRange[1]} K`}</p>
        <StyledSkillsWrapper>
          {job.mustHaveSkills.map((mustHaveSkill) => (
            <StyledSkill key={mustHaveSkill.value}>
              {mustHaveSkill.value}
            </StyledSkill>
          ))}
        </StyledSkillsWrapper>
      </StyledContentWrapper>

      <StyledFooter>
        <StyledList>
          <StyledListItem>{job.location}</StyledListItem>
          <StyledListItem>{job.employmentType}</StyledListItem>
          <StyledListItem>{job.seniorityLevel}</StyledListItem>
        </StyledList>
      </StyledFooter>
    </StyledCard>
  );
}
