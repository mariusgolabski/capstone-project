import {
  AddJobSvg,
  StyledOpenModalButton,
  StyledSection,
} from "./JobsSection.styled";
import Job from "../Job";
export default function JobsSection({ jobs, openJobModal }) {
  return (
    <StyledSection>
      <StyledOpenModalButton onClick={openJobModal}>
        <AddJobSvg />
      </StyledOpenModalButton>
      {jobs.map((job) => (
        <Job job={job} key={job.id}></Job>
      ))}
    </StyledSection>
  );
}
