import {
  AddJobSvg,
  StyledOpenModalButton,
  StyledSection,
} from "./JobsSection.styled";
import Job from "../Job";
export default function JobsSection({ jobs, openJobModal, onEdit, onDelete }) {
  return (
    <StyledSection>
      <StyledOpenModalButton onClick={openJobModal} aria-label="Add Job">
        <AddJobSvg />
      </StyledOpenModalButton>
      {jobs.map((job) => (
        <Job job={job} key={job._id} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </StyledSection>
  );
}
