import { Fragment, useState } from "react";
import { interviews } from "../../lib/interviewQuestionsData";
import { StyledSection } from "./InterviewSection.styled";
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

export default function InterviewSection() {
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
              category={interview.interviewQuestionCategory}
              question={interview.question}
              answer={interview.answer}
            />
          </Fragment>
        );
      })}
    </StyledSection>
  );
}
