import { Avatar } from "../Avatar";

import {
  StyledCard,
  StyledCompanyName,
  StyledFooter,
  StyledButton,
  StyledSkillsWrapper,
  StyledSkill,
  StyledContentWrapper,
  StyledList,
  StyledListItem,
  StyledAvatarWrapper,
} from "./Job.Styled";

export default function Job({ job, onEdit, onDelete }) {
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
          {job.mustHaveSkills.map((skill) => (
            <StyledSkill key={skill.value}>{skill.value}</StyledSkill>
          ))}
        </StyledSkillsWrapper>
      </StyledContentWrapper>

      <StyledFooter>
        <StyledList>
          <StyledListItem>{job.location}</StyledListItem>
          <StyledListItem>{job.employmentType}</StyledListItem>
          <StyledListItem>{job.seniorityLevel}</StyledListItem>
        </StyledList>
        <StyledButton onClick={() => onEdit(job)}>Edit</StyledButton>
        <StyledButton onClick={() => onDelete(job, "jobs")}>
          Delete
        </StyledButton>
      </StyledFooter>
    </StyledCard>
  );
}
