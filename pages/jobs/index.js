import Header from "@/components/Header";
import useSWR from "swr";
import JobPreview from "@/components/JobPreview";
import {
  StyledCleare,
  StyledHeading,
  StyledHeroDescription,
  StyledJobHeroSection,
  StyledParagraph,
  StyledResult,
  StyledSearch,
  StyledSearchInput,
  StyledSearchWrapper,
  StyledSection,
  StyledStrong,
} from "@/components/JobPreview/JobPreview.styled";
import React, { useState } from "react";

export default function Jobs() {
  const { data: jobs, error, isLoading } = useSWR(`/api/jobs`);
  const [searchQuery, setSearchQuery] = useState("");

  function clearSearch() {
    setSearchQuery("");
  }

  if (error) return <p>Failed to load</p>;
  if (isLoading) return <div>Loading...</div>;

  const filteredJobs = jobs.filter((job) => {
    return (
      job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.mustHaveSkills.some((skill) =>
        skill.value.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  });

  return (
    <>
      <Header />

      <StyledJobHeroSection>
        <StyledHeading>Align Your Passion With Your Profession</StyledHeading>
        <StyledHeroDescription>
          {`
         Don't settle for just any job. Use CuioHead to find a position where you can thrive, working under leaders who share your goals and values.
        `}
        </StyledHeroDescription>
        <StyledSearchWrapper>
          <StyledSearch />
          <StyledSearchInput
            type="text"
            placeholder="Search jobs or skills..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
          {searchQuery && <StyledCleare onClick={clearSearch} />}
        </StyledSearchWrapper>
        {searchQuery && (
          <>
            {searchQuery && (
              <StyledResult>
                <StyledStrong>{filteredJobs.length}</StyledStrong>
                {` result${
                  filteredJobs.length !== 1 ? "s" : ""
                } for jobs matching "`}
                <StyledStrong>{searchQuery}</StyledStrong>
                {'"'}
              </StyledResult>
            )}
          </>
        )}
      </StyledJobHeroSection>

      <StyledSection>
        {filteredJobs.map((job) => (
          <JobPreview key={job._id} job={job} />
        ))}
      </StyledSection>
    </>
  );
}
