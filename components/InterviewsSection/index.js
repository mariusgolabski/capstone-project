import { Fragment, useState } from "react";
import {
  StyledSection,
  StyledOpenModalButton,
  AddInterviewSvg,
} from "./InterviewsSection.styled";
import InterviewFilter from "../InterviewFilter";
import FilterButton from "../FilterButton";
import Interview from "../Interview/index";

const interviewCategories = [
  "All",
  "About",
  "Work",
  "Recruitment",
  "Workplace",
  "Leadership",
];

export default function InterviewSection({
  interviews,
  openModal,
  onEdit,
  onDelete,
}) {
  const [selectedCategory, setSelectedCategory] = useState(
    interviewCategories[0]
  );

  const filteredInterviews =
    selectedCategory === "All"
      ? interviews
      : interviews.filter(
          (interview) =>
            interview.interviewQuestionCategory === selectedCategory
        );

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  return (
    <StyledSection>
      <StyledOpenModalButton onClick={openModal}>
        <AddInterviewSvg />
      </StyledOpenModalButton>
      <InterviewFilter>
        {interviewCategories.map((category) => (
          <FilterButton
            key={category}
            category={category}
            isActive={category === selectedCategory}
            handleCategoryChange={handleCategoryChange}
          />
        ))}
      </InterviewFilter>
      {filteredInterviews.map((interview) => {
        return (
          <Fragment key={interview.id}>
            <Interview
              key={interview.id}
              interview={interview}
              category={interview.interviewQuestionCategory}
              question={interview.question}
              answer={interview.answer}
              openModal={openModal}
              onEdit={() => onEdit(interview)}
              onDelete={() => onDelete(interview, "interview")}
            />
          </Fragment>
        );
      })}
    </StyledSection>
  );
}
