import React, { useEffect, useState } from "react";
import { interviewsData as initialInterviews } from "../db/interviewQuestionsData";
import { jobs as initialJobs } from "../db/jobs";
import { skills } from "../db/skills";
import { uid } from "uid";
import TabNav from "@/components/TabNav";
import InterviewSection from "@/components/InterviewsSection";
import Modal from "@/components/Modal";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import TabButton from "@/components/TabButton";
import JobsSection from "@/components/JobsSection";
import JobModal from "@/components/JobModal";

export default function HomePage() {
  const [tab, setTab] = useState("interviews");
  const [interviews, setInterviews] = useState(initialInterviews);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [interviewAnswer, setInterviewAnswer] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState("");

  const [contentToDelete, setContentToDelete] = useState("");
  const [deleteContentType, setDeleteContentType] = useState("");

  const [jobs, setJobs] = useState(initialJobs);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [jobStep, setJobStep] = useState(1);
  const [isJobModalEditMode, setIsJobModalEditMode] = useState(false);
  const [selectedJob, setSelectedJob] = useState("");
  const [jobFormData, setJobFormData] = useState({
    companyName: "",
    jobTitle: "",
    seniorityLevel: "",
    employmentType: "",
    location: "",
    mustHaveSkills: [],
    niceToHaveSkills: [],
    annualSalaryRange: [50, 75],
    howToApply: "",
  });

  function handleInputChange(event) {
    const { name, value } = event.target;
    setJobFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleMustHaveSkillsChange(selectedMustHaveSkills) {
    setJobFormData((prevData) => ({
      ...prevData,
      mustHaveSkills: selectedMustHaveSkills,
    }));
  }

  function handleNiceToHaveSkillsChange(selectedNicetoHaveSkills) {
    setJobFormData((prevData) => ({
      ...prevData,
      niceToHaveSkills: selectedNicetoHaveSkills,
    }));
  }

  function handleSalaryRangeChange(values) {
    setJobFormData((prevData) => ({
      ...prevData,
      annualSalaryRange: values,
    }));
  }

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow =
      isOpen || isJobModalOpen || isDeleteModalOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, isJobModalOpen, isDeleteModalOpen]);

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

  function handleDelete(content, contentType) {
    setContentToDelete(content);
    setDeleteContentType(contentType);
    setIsDeleteModalOpen(true);
  }

  function handleConfirmDelete() {
    if (contentToDelete) {
      if (deleteContentType === "interview") {
        const updatedInterviews = interviews.filter(
          (interview) => interview.id !== contentToDelete.id
        );
        setInterviews(updatedInterviews);
      } else if (deleteContentType === "job") {
        const updatedJobs = jobs.filter((job) => job.id !== contentToDelete.id);
        setJobs(updatedJobs);
      }
      setContentToDelete("");
      setDeleteContentType("");
    }
    setIsDeleteModalOpen(false);
  }

  function handleCancelDelete() {
    setContentToDelete("");
    setDeleteContentType("");
    setIsDeleteModalOpen(false);
  }

  function selectTab(nextTab) {
    setTab(nextTab);
  }

  function openJobModal() {
    setIsJobModalOpen(true);
  }

  function closeJobModal() {
    setIsJobModalOpen(false);
    setJobStep(1);
    setIsJobModalEditMode(false);
    setSelectedJob("");
    setJobFormData({
      companyName: "",
      jobTitle: "",
      seniorityLevel: "",
      employmentType: "",
      location: "",
      mustHaveSkills: [],
      niceToHaveSkills: [],
      annualSalaryRange: [50, 75],
      howToApply: "",
    });
  }

  function handlePreviousJobStep() {
    setJobStep((prevStep) => prevStep - 1);
  }

  function handleNextJobStep(event) {
    const formElement = event.target.closest("form"); // Find the closest <form> element
    if (formElement) {
      if (formElement.checkValidity()) {
        // If the form is valid, prevent default form submission
        event.preventDefault();

        // Proceed to the next step
        setJobStep((prevStep) => prevStep + 1);
      } else {
        // If the form is invalid, display validation errors
        formElement.reportValidity();
      }
    }
  }

  function handleJobEdit(editedJob) {
    openJobModal(true);
    setIsJobModalEditMode(true);
    setSelectedJob(editedJob);
    setJobFormData({
      companyName: editedJob.companyName,
      jobTitle: editedJob.jobTitle,
      seniorityLevel: editedJob.seniorityLevel,
      employmentType: editedJob.employmentType,
      location: editedJob.location,
      mustHaveSkills: editedJob.mustHaveSkills,
      niceToHaveSkills: editedJob.niceToHaveSkills,
      annualSalaryRange: editedJob.annualSalaryRange,
      howToApply: editedJob.howToApply,
    });
  }

  function handleJobSubmit(event) {
    event.preventDefault();

    if (isJobModalEditMode) {
      console.log("You are in Edit mode");
      // Update existing job in the jobs array
      const updatedJobs = jobs.map((job) =>
        job.id === selectedJob.id
          ? {
              ...job,
              companyName: jobFormData.companyName,
              jobTitle: jobFormData.jobTitle,
              seniorityLevel: jobFormData.seniorityLevel,
              employmentType: jobFormData.employmentType,
              location: jobFormData.location,
              mustHaveSkills: jobFormData.mustHaveSkills,
              niceToHaveSkills: jobFormData.niceToHaveSkills,
              annualSalaryRange: jobFormData.annualSalaryRange,
              howToApply: jobFormData.howToApply,
            }
          : job
      );

      setJobs(updatedJobs);
    } else {
      // Create a new job and add it to the jobs array
      const newJob = {
        id: uid(),
        companyName: jobFormData.companyName,
        jobTitle: jobFormData.jobTitle,
        seniorityLevel: jobFormData.seniorityLevel,
        employmentType: jobFormData.employmentType,
        location: jobFormData.location,
        mustHaveSkills: jobFormData.mustHaveSkills,
        niceToHaveSkills: jobFormData.niceToHaveSkills,
        annualSalaryRange: jobFormData.annualSalaryRange,
        howToApply: jobFormData.howToApply,
      };

      setJobs((prevJobs) => [newJob, ...prevJobs]);
    }

    closeJobModal();
  }

  return (
    <>
      <TabNav>
        <TabButton
          isActive={tab === "interviews"}
          onClick={() => selectTab("interviews")}
        >
          Interviews
        </TabButton>

        <TabButton isActive={tab === "jobs"} onClick={() => selectTab("jobs")}>
          Jobs
        </TabButton>
      </TabNav>

      {tab === "interviews" && (
        <InterviewSection
          interviews={interviews}
          openModal={openModal}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {tab === "jobs" && (
        <JobsSection
          jobs={jobs}
          openJobModal={openJobModal}
          onEdit={handleJobEdit}
          onDelete={handleDelete}
        />
      )}

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

      <JobModal
        isJobModalOpen={isJobModalOpen}
        isJobModalEditMode={isJobModalEditMode}
        jobStep={jobStep}
        skills={skills}
        setJobs={setJobs}
        closeJobModal={closeJobModal}
        handleNextJobStep={handleNextJobStep}
        handlePreviousJobStep={handlePreviousJobStep}
        handleInputChange={handleInputChange}
        handleMustHaveSkillsChange={handleMustHaveSkillsChange}
        handleNiceToHaveSkillsChange={handleNiceToHaveSkillsChange}
        handleSalaryRangeChange={handleSalaryRangeChange}
        handleJobSubmit={handleJobSubmit}
        jobFormData={jobFormData}
        selectedJob={selectedJob}
      />
    </>
  );
}
