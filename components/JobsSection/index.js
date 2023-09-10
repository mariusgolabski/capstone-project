import useSWR from "swr";

import {
  AddJobSvg,
  StyledOpenModalButton,
  StyledSection,
} from "./JobsSection.styled";
import Job from "../Job";
export default function JobsSection({
  userId,
  openJobModal,
  onEdit,
  onDelete,
}) {
  const { data: jobs, error, isLoading } = useSWR(`/api/jobs/user`);

  if (error) {
    return <p>Failed to load job data.</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!jobs) {
    return <p>No job data available.</p>;
  }

  return (
    <StyledSection>
      <StyledOpenModalButton onClick={openJobModal} aria-label="Add Job">
        <AddJobSvg />
      </StyledOpenModalButton>
      {jobs.map((job) => (
        <Job
          userId={userId}
          job={job}
          key={job._id}
          onEdit={onEdit}
          onDelete={() => onDelete(job, "jobs")}
        />
      ))}
    </StyledSection>
  );
}
