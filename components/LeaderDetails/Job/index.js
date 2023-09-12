import { Avatar } from "../../Avatar";

import {
  StyledCard,
  StyledCompanyName,
  StyledFooter,
  StyledSkillsWrapper,
  StyledSkill,
  StyledContentWrapper,
  StyledList,
  StyledListItem,
  StyledAvatarWrapper,
  StyledLink,
} from "../Job/Job.styled";

export default function Job({ job, userProfileImagePath }) {
  return (
    <StyledLink href={`/jobs/${job._id}`}>
      <StyledCard>
        <StyledContentWrapper>
          <StyledAvatarWrapper>
            <Avatar userImage={userProfileImagePath} />
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
        </StyledFooter>
      </StyledCard>
    </StyledLink>
  );
}
