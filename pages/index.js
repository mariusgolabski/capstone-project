import React, { useEffect, useState } from "react";
import { interviewsData as initialInterviews } from "../db/interviewQuestionsData";
import { uid } from "uid";
import InterviewSection from "@/components/InterviewSection";
import Modal from "@/components/Modal";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [interviewAnswer, setInterviewAnswer] = useState("");
  const [interviews, setInterviews] = useState(initialInterviews);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState("");

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow =
      isOpen || isDeleteModalOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, isDeleteModalOpen]);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setSelectedCategory("");
    setSelectedQuestion("");
    setInterviewAnswer("");
    setStep(1);
    setIsEditMode(false);
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
    setInterviewAnswer("");
  }

  function handleQuestionChange(question) {
    setSelectedQuestion(question);
    setInterviewAnswer("");
  }

  function handleInterviewAnswerChange(event) {
    setInterviewAnswer(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (isEditMode && selectedInterview) {
      const updatedInterviews = interviews.map((interview) =>
        interview.id === selectedInterview.id
          ? {
              ...interview,
              interviewQuestionCategory: selectedCategory,
              question: selectedQuestion,
              answer: interviewAnswer,
            }
          : interview
      );
      setInterviews(updatedInterviews);
    } else {
      const newInterviewEntry = {
        id: uid(),
        interviewQuestionCategory: selectedCategory,
        question: selectedQuestion,
        answer: interviewAnswer,
      };
      setInterviews([newInterviewEntry, ...interviews]);
    }

    closeModal(true);
    setStep(1);
    setSelectedCategory("");
    setSelectedQuestion("");
    setInterviewAnswer("");
  }

  function handleEdit(editedInterview) {
    openModal(true);
    setIsEditMode(true);
    setSelectedInterview(editedInterview);
    setSelectedCategory(editedInterview.interviewQuestionCategory);
    setSelectedQuestion(editedInterview.question);
    setInterviewAnswer(editedInterview.answer);
  }

  function handleDelete(interviewToDelete) {
    setSelectedInterview(interviewToDelete);
    setIsDeleteModalOpen(true);
  }

  function handleConfirmDelete() {
    if (selectedInterview) {
      const updatedInterviews = interviews.filter(
        (interview) => interview.id !== selectedInterview.id
      );
      setInterviews(updatedInterviews);
      closeModal();
      setIsDeleteModalOpen(false);
    }
  }

  function handleCancelDelete() {
    setIsDeleteModalOpen(false);
  }

  return (
    <>
      <InterviewSection
        openModal={openModal}
        onEdit={handleEdit}
        onDelete={handleDelete}
        interviews={interviews}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onCancel={handleCancelDelete}
        onConfirmDelete={handleConfirmDelete}
      />

      <Modal
        closeModal={closeModal}
        isOpen={isOpen}
        isEditMode={isEditMode}
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
