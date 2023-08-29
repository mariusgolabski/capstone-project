import Select from "react-select";
import {
  StyledHeader,
  StyledContent,
  StyledModal,
  StyledFooter,
  Backdrop,
  StyledButton,
  CloseModalSvg,
  CloseModalButton,
  StyledInput,
  StyledSelect,
  StyledSlider,
  StyledThumb,
  StyledTrack,
  StyledLabel,
  StyledSalaryRangeOutput,
} from "./JobModal.styled";

export default function JobModal({
  isJobModalOpen,
  isJobModalEditMode,
  jobStep,
  skills,
  handlePreviousJobStep,
  handleNextJobStep,
  jobFormData,
  handleInputChange,
  handleMustHaveSkillsChange,
  handleNiceToHaveSkillsChange,
  handleSalaryRangeChange,
  handleJobSubmit,
  closeJobModal,
}) {
  function Thumb(props, state) {
    return <StyledThumb {...props}>{state.valueNow}</StyledThumb>;
  }

  function Track(props, state) {
    return <StyledTrack {...props} $index={state.index} />;
  }

  return (
    <>
      {isJobModalOpen && (
        <Backdrop>
          <StyledModal>
            <StyledHeader>
              {jobStep === 1 && <h2>Job information</h2>}
              {jobStep === 2 && <h2>Required Skills</h2>}
              {jobStep === 3 && <h2>Sallary and application</h2>}
              <CloseModalButton onClick={closeJobModal}>
                <CloseModalSvg />
              </CloseModalButton>
            </StyledHeader>
            <form onSubmit={handleJobSubmit}>
              <StyledContent>
                {jobStep === 1 && (
                  <>
                    <StyledLabel htmlFor="companyName">
                      Company name
                    </StyledLabel>
                    <StyledInput
                      required
                      type="text"
                      name="companyName"
                      id="companyName"
                      value={jobFormData.companyName}
                      onChange={handleInputChange}
                    />

                    <StyledLabel htmlFor="jobTitle">Job title</StyledLabel>
                    <StyledInput
                      required
                      type="text"
                      name="jobTitle"
                      id="jobTitle"
                      value={jobFormData.jobTitle}
                      onChange={handleInputChange}
                    />

                    <StyledLabel htmlFor="seniorityLevel">
                      Seniority level
                    </StyledLabel>
                    <StyledSelect
                      required
                      id="seniorityLevel"
                      name="seniorityLevel"
                      value={jobFormData.seniorityLevel}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled defaultValue hidden>
                        Choose a level
                      </option>
                      <option value="student">Student</option>
                      <option value="junior">Junior</option>
                      <option value="mid">Mid</option>
                      <option value="senior">Senior</option>
                      <option value="expert">Expert</option>
                    </StyledSelect>

                    <StyledLabel htmlFor="employmentType">Job type</StyledLabel>
                    <StyledSelect
                      required
                      id="employmentType"
                      name="employmentType"
                      value={jobFormData.employmentType}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled defaultValue hidden>
                        Choose a job type
                      </option>
                      <option value="Full time">Full time</option>
                      <option value="Part time">Part time</option>
                      <option value="Internship">Internship</option>
                      <option value="Cofounder">Cofounder</option>
                    </StyledSelect>

                    <StyledLabel htmlFor="location">Job location</StyledLabel>
                    <StyledInput
                      required
                      type="text"
                      name="location"
                      id="location"
                      value={jobFormData.location}
                      onChange={handleInputChange}
                    />
                  </>
                )}

                {jobStep === 2 && (
                  <>
                    <StyledLabel htmlFor="mustHaveSkills">
                      Must have
                    </StyledLabel>
                    <Select
                      required
                      isMulti={true}
                      menuPortalTarget={document.body}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,

                          borderColor: state.isSelected ? "#000" : "#E5E5E5",
                          borderColor: state.isFocused ? "#000" : "#E5E5E5",
                          boxShadow: "none",
                          "&:hover": {
                            border: "1px solid #000",
                            cursor: "pointer",
                          },
                          marginBottom: "1rem",
                        }),
                        menuPortal: (base) => ({ ...base, zIndex: 50 }),
                      }}
                      name="mustHaveSkills"
                      options={skills}
                      value={jobFormData.mustHaveSkills}
                      onChange={handleMustHaveSkillsChange}
                      inputId="mustHaveSkills"
                    />

                    <StyledLabel htmlFor="niceToHaveSkills">
                      Nice to have
                    </StyledLabel>
                    <Select
                      required
                      isMulti={true}
                      menuPortalTarget={document.body}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,

                          borderColor: state.isSelected ? "#000" : "#E5E5E5",
                          borderColor: state.isFocused ? "#000" : "#E5E5E5",
                          boxShadow: "none",
                          "&:hover": {
                            border: "1px solid #000",
                            cursor: "pointer",
                          },
                          marginBottom: "1rem",
                        }),
                        menuPortal: (base) => ({ ...base, zIndex: 50 }),
                      }}
                      name="niceToHaveSkills"
                      options={skills}
                      value={jobFormData.niceToHaveSkills}
                      onChange={handleNiceToHaveSkillsChange}
                      inputId="niceToHaveSkills"
                    />
                  </>
                )}

                {jobStep === 3 && (
                  <>
                    <StyledLabel htmlFor="annualSalaryRange">
                      Annual salary
                    </StyledLabel>
                    <StyledSlider
                      max={150}
                      defaultValue={jobFormData.annualSalaryRange}
                      renderTrack={Track}
                      renderThumb={Thumb}
                      onChange={handleSalaryRangeChange}
                      id="annualSalaryRange"
                    />
                    <StyledSalaryRangeOutput>
                      {jobFormData.annualSalaryRange[0] ===
                      jobFormData.annualSalaryRange[1]
                        ? `€ ${jobFormData.annualSalaryRange[0]}K`
                        : `€ ${jobFormData.annualSalaryRange[0]}K - € ${jobFormData.annualSalaryRange[1]}K`}
                    </StyledSalaryRangeOutput>
                    <StyledLabel htmlFor="howToApply">
                      Application Submission Link
                    </StyledLabel>
                    <StyledInput
                      required
                      id="howToApply"
                      type="url"
                      name="howToApply"
                      placeholder="https://example.jobs.personio.de/job/376780"
                      value={jobFormData.howToApply}
                      onChange={handleInputChange}
                    />
                  </>
                )}
              </StyledContent>

              <StyledFooter>
                {jobStep === 1 && (
                  <StyledButton type="submit" onClick={handleNextJobStep}>
                    Next
                  </StyledButton>
                )}

                {jobStep === 2 && (
                  <>
                    <StyledButton onClick={handlePreviousJobStep}>
                      Back
                    </StyledButton>
                    <StyledButton type="submit" onClick={handleNextJobStep}>
                      Next
                    </StyledButton>
                  </>
                )}

                {jobStep === 3 && (
                  <>
                    <StyledButton onClick={handlePreviousJobStep}>
                      Back
                    </StyledButton>
                    <StyledButton type="submit">
                      {isJobModalEditMode ? "Save" : "Post"}
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
