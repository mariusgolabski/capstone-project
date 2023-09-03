import { mutate } from "swr";
import React, { useEffect, useState } from "react";
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
import ProfileHeader from "@/components/ProfileHeader";
import { ProfileTabNavWrapper } from "@/components/ProfileTabNavWrapper/ProfileTabNavWrapper.Styled";

export default function HomePage() {
  const [tab, setTab] = useState("interviews");
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

  function handleCategoryChange(categoryId) {
    setSelectedCategory(categoryId);
    setSelectedQuestion("");
    setInterviewAnswer("");
  }

  function handleQuestionChange(questionId) {
    setSelectedQuestion(questionId);
    setInterviewAnswer("");
  }

  function handleInterviewAnswerChange(event) {
    setInterviewAnswer(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const userId = "64f0c5a8b979a78d64d3b750"; //for now hardcoded - replace with the actual user ID

    const interviewData = {
      userId: userId,
      category: selectedCategory,
      question: selectedQuestion,
      answer: interviewAnswer,
    };

    if (isEditMode && selectedInterview) {
      try {
        const response = await fetch(
          `/api/interviews/${selectedInterview._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(interviewData),
          }
        );

        if (response.ok) {
          // Update the SWR cache by calling mutate with the appropriate key
          mutate(`/api/interviews/${userId}`);
          closeModal(true);
          setStep(1);
          setSelectedCategory("");
          setSelectedQuestion("");
          setInterviewAnswer("");
        } else {
          console.error("Failed to update interview");
        }
      } catch (error) {
        console.error("Error updating interview:", error);
      }
    } else {
      try {
        const response = await fetch(`/api/interviews`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(interviewData),
        });

        if (response.ok) {
          // Update the SWR cache by calling mutate with the appropriate key
          mutate(`/api/interviews/${userId}`);
          closeModal(true);
          setStep(1);
          setSelectedCategory("");
          setSelectedQuestion("");
          setInterviewAnswer("");
        } else {
          console.error("Failed to create interview");
        }
      } catch (error) {
        console.error("Error creating interview:", error);
      }
    }
  }

  function handleEdit(editedInterview) {
    openModal(true);
    setIsEditMode(true);
    setSelectedInterview(editedInterview);
    setSelectedCategory(editedInterview.category._id);
    setSelectedQuestion(editedInterview.question._id);
    setInterviewAnswer(editedInterview.answer);
  }

  const handleDelete = async (content, contentType) => {
    setContentToDelete(content);
    setDeleteContentType(contentType);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (contentToDelete && deleteContentType) {
      try {
        const response = await fetch(
          `/api/${deleteContentType}/${contentToDelete._id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          //update the cached data
          mutate(`/api/interviews/64f0c5a8b979a78d64d3b750`, (interviews) =>
            interviews.filter(
              (interview) => interview._id !== contentToDelete._id
            )
          );
        } else {
          console.error("Failed to delete content");
        }
      } catch (error) {
        console.error("Error deleting content:", error);
      }
      setIsDeleteModalOpen(false);
      setContentToDelete("");
      setDeleteContentType("");
    }
  };

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
      <ProfileTabNavWrapper>
        <ProfileHeader />
        <TabNav>
          <TabButton
            isActive={tab === "interviews"}
            onClick={() => selectTab("interviews")}
          >
            Interviews
          </TabButton>
          <TabButton
            isActive={tab === "jobs"}
            onClick={() => selectTab("jobs")}
          >
            Jobs
          </TabButton>
        </TabNav>
      </ProfileTabNavWrapper>
      {tab === "interviews" && (
        <InterviewSection
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
        id={contentToDelete ? contentToDelete.id : null}
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
