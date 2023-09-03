import useSWR from "swr";
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

const userId = "64f0c5a8b979a78d64d3b750";
export default function InterviewSection({ openModal, onEdit, onDelete }) {
  const {
    data: interviews,
    error,
    isLoading,
  } = useSWR(`/api/interviews/${userId}`);

  const [selectedCategory, setSelectedCategory] = useState(
    interviewCategories[0]
  );

  const filteredInterviews =
    selectedCategory === "All"
      ? interviews
      : interviews.filter(
          (interview) => interview.category.name === selectedCategory
        );

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  if (error) {
    return <p>Failed to load interview data.</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!interviews) {
    return <p>No interview data available.</p>;
  }

  return (
    <StyledSection>
      <StyledOpenModalButton onClick={openModal} aria-label="Add Interview">
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
          <Fragment key={interview._id}>
            <Interview
              key={interview._id}
              interview={interview}
              category={interview.category.name}
              question={interview.question.name}
              answer={interview.answer}
              openModal={openModal}
              onEdit={() => onEdit(interview)}
              onDelete={() => onDelete(interview, "interviews")}
            />
          </Fragment>
        );
      })}
    </StyledSection>
  );
}
