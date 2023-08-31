import {
  AddJobSvg,
  StyledOpenModalButton,
  StyledSection,
} from "./JobsSection.styled";
import Job from "../Job";
export default function JobsSection({ jobs, openJobModal, onEdit, onDelete }) {
  return (
    <StyledSection>
      <StyledOpenModalButton onClick={openJobModal}>
        <AddJobSvg aria-label="Add Job" />
      </StyledOpenModalButton>
      {jobs.map((job) => (
        <Job job={job} key={job.id} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </StyledSection>
  );
}
