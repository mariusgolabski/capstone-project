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

export default function Job({ job }) {
  return (
    <StyledCard>
      <StyledContentWrapper>
        <StyledAvatarWrapper>
          <Avatar />
          <StyledCompanyName>{job.companyName}</StyledCompanyName>
        </StyledAvatarWrapper>
        <h2>{job.title}</h2>
        <p>{job.annualSalary}</p>
        <StyledSkillsWrapper>
          {job.mustHaveSkills.map((skill) => (
            <StyledSkill key={skill}>{skill}</StyledSkill>
          ))}
        </StyledSkillsWrapper>
      </StyledContentWrapper>

      <StyledFooter>
        <StyledList>
          <StyledListItem>{job.location}</StyledListItem>
          <StyledListItem>{job.employmentType}</StyledListItem>
          <StyledListItem>{job.seniorityLevel}</StyledListItem>
        </StyledList>
        <StyledButton>Edit</StyledButton>
        <StyledButton>Delete</StyledButton>
      </StyledFooter>
    </StyledCard>
  );
}
