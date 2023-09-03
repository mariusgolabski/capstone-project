// import { categoriesQuestionsData } from "../../db/categoriesQuestions";
import useSWR from "swr";

import {
  StyledHeader,
  StyledContent,
  StyledModal,
  StyledFooter,
  Backdrop,
  RadioButtonLabel,
  RadioButton,
  StyledTextarea,
  StyledButton,
  CloseModalSvg,
  CloseModalButton,
} from "./Modal.styled";

export default function Modal({
  isOpen,
  isEditMode,
  handleSubmit,
  step,
  selectedCategory,
  selectedQuestion,
  handlePreviousStep,
  handleNextStep,
  handleQuestionChange,
  handleCategoryChange,
  handleInterviewAnswerChange,
  interviewAnswer,
  closeModal,
}) {
  const { data, error, isLoading } = useSWR("/api/categories");

  if (error) {
    return <p>Failed to load category data.</p>;
  }

  if (isLoading) {
    return <p>Loading Categories...</p>;
  }

  if (!data) {
    return <p>No category data available.</p>;
  }

  return (
    <>
      {isOpen && (
        <Backdrop>
          <StyledModal>
            <StyledHeader>
              {step === 1 && <h2>Setting the Interview Focus</h2>}
              {step === 2 && <h2>Unveil Your Story</h2>}
              {step === 3 && <h2>Let’s Hear Your Insights</h2>}
              <CloseModalButton onClick={closeModal}>
                <CloseModalSvg />
              </CloseModalButton>
            </StyledHeader>
            <form onSubmit={handleSubmit}>
              <StyledContent>
                {step === 1 && (
                  <>
                    <label>Choose a Category:</label>
                    {data ? (
                      <>
                        {data.map((category) => (
                          <RadioButtonLabel
                            key={category._id}
                            data-category-name={category.name}
                            selected={selectedCategory === category._id}
                          >
                            <RadioButton
                              type="radio"
                              name="category"
                              value={category._id}
                              checked={selectedCategory === category._id}
                              onChange={() =>
                                handleCategoryChange(category._id)
                              }
                            />
                            {category.name}
                          </RadioButtonLabel>
                        ))}
                      </>
                    ) : (
                      <p>Loading categories...</p>
                    )}
                  </>
                )}

                {step === 2 && selectedCategory && (
                  <>
                    <label>Pick Your Query:</label>
                    <>
                      {data
                        .find((category) => category._id === selectedCategory)
                        ?.questions.map((question) => (
                          <RadioButtonLabel
                            key={question._id}
                            data-question-name={question.name}
                            selected={selectedQuestion === question._id}
                          >
                            <RadioButton
                              type="radio"
                              name="question"
                              value={question._id}
                              checked={selectedQuestion === question._id}
                              onChange={() =>
                                handleQuestionChange(question._id)
                              }
                            />
                            {question.name}
                          </RadioButtonLabel>
                        ))}
                    </>
                  </>
                )}

                {step === 3 && selectedQuestion && (
                  <>
                    <label htmlFor="interviewAnswer">Craft Your Answer:</label>
                    <>
                      <StyledTextarea
                        name="interviewAnswer"
                        id="interviewAnswer"
                        placeholder={`${
                          data.find(
                            (category) => category._id === selectedCategory
                          ).name
                        } - ${
                          data
                            .find(
                              (category) => category._id === selectedCategory
                            )
                            .questions.find(
                              (question) => question._id === selectedQuestion
                            ).name
                        }`}
                        value={interviewAnswer}
                        onChange={handleInterviewAnswerChange}
                        required
                        maxLength={1000}
                      />
                    </>
                  </>
                )}
              </StyledContent>

              <StyledFooter>
                {step === 1 && (
                  <StyledButton
                    disabled={!selectedCategory}
                    onClick={handleNextStep}
                  >
                    Next
                  </StyledButton>
                )}

                {step === 2 && (
                  <>
                    <StyledButton onClick={handlePreviousStep}>
                      Back
                    </StyledButton>
                    <StyledButton
                      disabled={!selectedQuestion}
                      onClick={handleNextStep}
                    >
                      Next
                    </StyledButton>
                  </>
                )}

                {step === 3 && (
                  <>
                    <StyledButton onClick={handlePreviousStep}>
                      Back
                    </StyledButton>
                    <StyledButton type="submit">
                      {isEditMode ? "Save" : "Post"}
                    </StyledButton>
                  </>
                )}
              </StyledFooter>
            </form>
          </StyledModal>
        </Backdrop>
      )}
    </>
  );
}
