import { Fragment, useState } from "react";
import TabButton from "../TabButton";
import {
  ProfileTabNavWrapper,
  StyledCoverImage,
  StyledDescriptionText,
  StyledIntervieSection,
  StyledInterviewWrapper,
  StyledJobSection,
  StyledProfileHeaderWrapper,
  StyledProfileInfo,
  StyledTabNavWrapper,
  StyledUserProfileCard,
  StyledUserProfileImage,
  StyledUserProfileImageWrapper,
  StyledWrapper,
  SyledProfileCoverWrapper,
} from "./LeaderDetails.styled";
import FilterButton from "../FilterButton";
import Interview from "./Interview/index";
import Job from "./Job";

export default function LeaderDetails({ leader }) {
  const interviewCategories = [
    "All",
    "About",
    "Work",
    "Recruitment",
    "Workplace",
    "Leadership",
  ];
  const interviews = leader.data.interviews;

  const jobs = leader.data.jobs;

  const userProfileImagePath = leader.data.user.userProfileImagePath;

  const [selectedCategory, setSelectedCategory] = useState(
    interviewCategories[0]
  );

  const filteredInterviews =
    selectedCategory === "All"
      ? interviews
      : interviews.filter(
          (interview) => interview.category.name === selectedCategory
        );

  const [tab, setTab] = useState("interviews");

  function selectTab(nextTab) {
    setTab(nextTab);
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  return (
    <>
      <ProfileTabNavWrapper>
        <StyledWrapper>
          <StyledProfileHeaderWrapper>
            <SyledProfileCoverWrapper>
              <StyledCoverImage
                priority={true}
                src={leader.data.user.userCoverImagePath}
                alt="profile-cover"
                width={1110}
                height={160}
              />
            </SyledProfileCoverWrapper>
            <StyledUserProfileCard>
              <StyledUserProfileImageWrapper>
                <StyledUserProfileImage
                  src={leader.data.user.userProfileImagePath}
                  alt="avatar"
                  width={168}
                  height={168}
                />
              </StyledUserProfileImageWrapper>
              <StyledProfileInfo>
                <h1>
                  {leader.data.user.firstName} {leader.data.user.lastName}
                </h1>
                <StyledDescriptionText>
                  {leader.data.user.jobTitle} @{leader.data.user.companyName}
                </StyledDescriptionText>
              </StyledProfileInfo>
            </StyledUserProfileCard>
          </StyledProfileHeaderWrapper>
        </StyledWrapper>
        <StyledTabNavWrapper>
          <TabButton
            isActive={tab === "interviews"}
            onClick={() => selectTab("interviews")}
          >
            Interviews
          </TabButton>
          <TabButton
            isActive={tab === "jobs"}
            onClick={() => selectTab("jobs")}
          >
            Jobs
          </TabButton>
        </StyledTabNavWrapper>
      </ProfileTabNavWrapper>

      {tab === "interviews" && (
        <StyledIntervieSection>
          <StyledInterviewWrapper>
            {interviewCategories.map((category) => (
              <FilterButton
                key={category}
                category={category}
                isActive={category === selectedCategory}
                handleCategoryChange={handleCategoryChange}
              />
            ))}
          </StyledInterviewWrapper>
          {filteredInterviews.map((interview) => {
            return (
              <Fragment key={interview._id}>
                <Interview
                  key={interview._id}
                  interview={interview}
                  category={interview.category.name}
                  question={interview.question.name}
                  answer={interview.answer}
                />
              </Fragment>
            );
          })}
        </StyledIntervieSection>
      )}

      {tab === "jobs" && (
        <StyledJobSection>
          {jobs.map((job) => (
            <Job
              job={job}
              key={job._id}
              userProfileImagePath={userProfileImagePath}
            />
          ))}
        </StyledJobSection>
      )}
    </>
  );
}
