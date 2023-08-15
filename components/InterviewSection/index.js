import { Fragment } from "react";
import { interviews } from "../../lib/interviewQuestionsData";
import { StyledSection } from "./InterviewSection.styled";
import Interview from "../Interview/index";

export default function InterviewSection() {
  return (
    <StyledSection>
      {interviews.map((interview) => {
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
