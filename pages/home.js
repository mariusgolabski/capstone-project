import { useSession } from "next-auth/react";
import useSWR from "swr";
import { mutate } from "swr";
import React, { useEffect, useState } from "react";
import TabNav from "@/components/TabNav";
import InterviewSection from "@/components/InterviewsSection";
import Modal from "@/components/Modal";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import TabButton from "@/components/TabButton";
import JobsSection from "@/components/JobsSection";
import JobModal from "@/components/JobModal";
import ProfileHeader from "@/components/ProfileHeader";
import { ProfileTabNavWrapper } from "@/components/ProfileTabNavWrapper/ProfileTabNavWrapper.Styled";
import Header from "@/components/Header";
import Link from "next/link";

export default function Home() {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;

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

  const { data: skills } = useSWR(`/api/skills`);

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

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow =
      isOpen || isJobModalOpen || isDeleteModalOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, isJobModalOpen, isDeleteModalOpen]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

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

    const interviewData = {
      // id: userId,
      category: selectedCategory,
      question: selectedQuestion,
      answer: interviewAnswer,
    };

    if (isEditMode && selectedInterview) {
      try {
        console.log(interviewData);
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

  function handleDelete(content, contentType) {
    setContentToDelete(content);
    setDeleteContentType(contentType);
    setIsDeleteModalOpen(true);
    console.log(contentToDelete);
  }

  async function handleConfirmDelete() {
    if (contentToDelete && deleteContentType) {
      try {
        const response = await fetch(
          `/api/${deleteContentType}/${contentToDelete._id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          if (deleteContentType === "interviews") {
            mutate(`/api/${deleteContentType}/${contentToDelete.userId}`);
          } else if (deleteContentType === "jobs") {
            mutate(`/api/${deleteContentType}/${userId}`);
          }
        } else {
          console.error(`Failed to delete ${deleteContentType}`);
        }
      } catch (error) {
        console.error(`Error deleting ${deleteContentType}:`, error);
      }
      setIsDeleteModalOpen(false);
      setContentToDelete("");
      setDeleteContentType("");
    }
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

  function handleJobEdit(job) {
    openJobModal(true);
    setIsJobModalEditMode(true);
    setSelectedJob(job);
    setJobFormData({
      _id: job._id,
      companyName: job.companyName,
      jobTitle: job.jobTitle,
      seniorityLevel: job.seniorityLevel,
      employmentType: job.employmentType,
      location: job.location,
      mustHaveSkills: job.mustHaveSkills,
      niceToHaveSkills: job.niceToHaveSkills,
      annualSalaryRange: job.annualSalaryRange,
      howToApply: job.howToApply,
    });
  }

  async function handleJobSubmit(event) {
    event.preventDefault();

    const mustHaveSkillIds = jobFormData.mustHaveSkills.map(
      (skill) => skill._id
    );
    const niceToHaveSkillIds = jobFormData.niceToHaveSkills.map(
      (skill) => skill._id
    );

    const formData = {
      user_id: userId,
      _id: jobFormData._id,
      companyName: jobFormData.companyName,
      jobTitle: jobFormData.jobTitle,
      seniorityLevel: jobFormData.seniorityLevel,
      employmentType: jobFormData.employmentType,
      location: jobFormData.location,
      mustHaveSkills: mustHaveSkillIds,
      niceToHaveSkills: niceToHaveSkillIds,
      annualSalaryRange: jobFormData.annualSalaryRange,
      howToApply: jobFormData.howToApply,
    };

    if (isJobModalEditMode) {
      try {
        const response = await fetch(`/api/jobs/${selectedJob._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jobFormData), // Send the updated job data
        });

        if (response.ok) {
          mutate(`/api/jobs/${userId}`);
          closeJobModal();
        } else {
          console.error("Failed to update job");
        }
      } catch (error) {
        console.error("Error updating job:", error);
      }
    } else {
      try {
        const response = await fetch(`/api/jobs`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          mutate(`/api/jobs/${userId}`);
        } else {
          console.error("Failed to create job");
        }
      } catch (error) {
        console.error("Error creating job:", error);
      }
    }
    closeJobModal();
  }

  if (status === "authenticated") {
    return (
      <>
        <Header />

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
            userId={userId}
            openModal={openModal}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

        {tab === "jobs" && (
          <JobsSection
            userId={userId}
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

  return <Link href="/api/auth/signin">Sign in</Link>;
}
