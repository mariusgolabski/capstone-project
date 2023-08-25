import {
  AddJobSvg,
  StyledOpenModalButton,
  StyledSection,
} from "./JobsSection.styled";
import Job from "../Job";
export default function JobsSection({ jobs }) {
  return (
    <StyledSection>
      <StyledOpenModalButton>
        <AddJobSvg />
      </StyledOpenModalButton>
      {jobs.map((job) => (
        <Job job={job} key={job.id}></Job>
      ))}
    </StyledSection>
  );
}
