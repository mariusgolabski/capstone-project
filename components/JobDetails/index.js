import { createKey } from "next/dist/shared/lib/router/router";
import {
  StyledApplyButton,
  StyledAvatarWrapper,
  StyledClock,
  StyledCompanyName,
  StyledDetailsSection,
  StyledEuro,
  StyledGlobe,
  StyledHeroFeature,
  StyledHeroFeaturesContainer,
  StyledHeroSection,
  StyledJobCard,
  StyledJobDetailsWrapper,
  StyledJobTitle,
  StyledLevel,
  StyledSkill,
  StyledSkillsTitle,
  StyledSkillsWrapper,
  StyledUserName,
} from "./JobDetails.styled";

import { Avatar } from "@/components/Avatar";
import Link from "next/link";

export default function JobDetails({ job }) {
  console.log(job);
  return (
    <StyledJobDetailsWrapper>
      <StyledJobCard>
        <StyledHeroSection>
          <StyledJobTitle>{job.jobTitle}</StyledJobTitle>
          <StyledHeroFeaturesContainer>
            <StyledHeroFeature>
              <i>
                <StyledLevel />
              </i>
              {job.seniorityLevel}
            </StyledHeroFeature>
            <StyledHeroFeature>
              <i>
                <StyledGlobe />
              </i>

              {job.location}
            </StyledHeroFeature>
            <StyledHeroFeature>
              <i>
                <StyledClock />
              </i>
              {job.employmentType}
            </StyledHeroFeature>
            <StyledHeroFeature>
              <i>
                <StyledEuro />
              </i>
              {`${job.annualSalaryRange[0]} - ${job.annualSalaryRange[1]} K`}
            </StyledHeroFeature>
          </StyledHeroFeaturesContainer>

          <a href={job.howToApply} target="_blank" rel="noopener noreferrer">
            <StyledApplyButton>Apply</StyledApplyButton>
          </a>
        </StyledHeroSection>
        <StyledDetailsSection>
          <StyledSkillsTitle>Must have:</StyledSkillsTitle>
          <StyledSkillsWrapper>
            {job.mustHaveSkills.map((skill) => (
              <StyledSkill key={skill.value}>{skill.value}</StyledSkill>
            ))}
          </StyledSkillsWrapper>
          <StyledSkillsTitle>Nice to have:</StyledSkillsTitle>
          <StyledSkillsWrapper>
            {job.niceToHaveSkills.map((skill) => (
              <StyledSkill key={skill.value}>{skill.value}</StyledSkill>
            ))}
          </StyledSkillsWrapper>
        </StyledDetailsSection>
        <StyledAvatarWrapper>
          <h2>Created by:</h2>
          <Link href={`/leaders/${job.user_id._id}`}>
            <Avatar userImage={job.user_id.userProfileImagePath} />
          </Link>
        </StyledAvatarWrapper>
      </StyledJobCard>
    </StyledJobDetailsWrapper>
  );
}
