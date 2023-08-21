import { categoriesQuestionsData } from "../../db/categoriesQuestions";

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
  toggleModal,
}) {
  return (
    <>
      {isOpen && (
        <Backdrop>
          <StyledModal>
            <StyledHeader>
              {step === 1 && <h2>Setting the Interview Focus</h2>}
              {step === 2 && <h2>Unveil Your Story</h2>}
              {step === 3 && <h2>Let’s Hear Your Insights</h2>}
              <CloseModalButton onClick={toggleModal}>
                <CloseModalSvg />
              </CloseModalButton>
            </StyledHeader>
            <form onSubmit={handleSubmit}>
              <StyledContent>
                {step === 1 && (
                  <>
                    <label>Choose a Category:</label>
                    {categoriesQuestionsData ? (
                      <>
                        {categoriesQuestionsData.map((category) => (
                          <RadioButtonLabel
                            key={category.id}
                            selected={selectedCategory === category.name}
                          >
                            <RadioButton
                              type="radio"
                              name="category"
                              value={category.name}
                              checked={selectedCategory === category.name}
                              onChange={() =>
                                handleCategoryChange(category.name)
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
                      {categoriesQuestionsData
                        .find((category) => category.name === selectedCategory)
                        ?.questions.map((question) => (
                          <RadioButtonLabel
                            key={question.id}
                            selected={selectedQuestion === question.name}
                          >
                            <RadioButton
                              type="radio"
                              name="question"
                              value={question.name}
                              checked={selectedQuestion === question.name}
                              onChange={() =>
                                handleQuestionChange(question.name)
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
                        placeholder={`${selectedCategory} - ${selectedQuestion}`}
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
                    <StyledButton type="submit">Save</StyledButton>
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
