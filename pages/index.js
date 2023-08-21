import React, { useEffect, useState } from "react";
import { interviewsData as initialInterviews } from "../db/interviewQuestionsData";
import { uid } from "uid";
import InterviewSection from "@/components/InterviewSection";
import Modal from "@/components/Modal";

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [interviewAnswer, setInterviewAnswer] = useState("");
  // TODO
  const [interviews, setInterviews] = useState(initialInterviews);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  function handlePreviousStep() {
    setStep((prevStep) => prevStep - 1);
  }

  function handleNextStep() {
    setStep((prevStep) => prevStep + 1);
  }

  function handleCategoryChange(categoryName) {
    setSelectedCategory(categoryName);
    setSelectedQuestion("");
  }

  function handleQuestionChange(question) {
    setSelectedQuestion(question);
  }

  const handleInterviewAnswerChange = (event) => {
    setInterviewAnswer(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newInterviewEntry = {
      id: uid(),
      interviewQuestionCategory: selectedCategory,
      question: selectedQuestion,
      answer: interviewAnswer,
    };

    setInterviews([newInterviewEntry, ...interviews]);

    toggleModal(!isOpen);
    setStep(1);
    setSelectedCategory("");
    setSelectedQuestion("");
    setInterviewAnswer("");
  };

  return (
    <>
      <InterviewSection toggleModal={toggleModal} interviews={interviews} />
      <Modal
        isOpen={isOpen}
        toggleModal={toggleModal}
        step={step}
        selectedCategory={selectedCategory}
        selectedQuestion={selectedQuestion}
        handlePreviousStep={handlePreviousStep}
        handleNextStep={handleNextStep}
        handleQuestionChange={handleQuestionChange}
        handleCategoryChange={handleCategoryChange}
        interviewAnswer={interviewAnswer}
        handleInterviewAnswerChange={handleInterviewAnswerChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
