import Header from "@/components/Header";
import useSWR from "swr";
import JobPreview from "@/components/JobPreview";
import { StyledSection } from "@/components/JobPreview/JobPreview.styled";

export default function Jobs() {
  const { data: jobs, error, isLoading } = useSWR(`/api/jobs`);

  if (error) return <p>Failed to load</p>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Header />
      <StyledSection>
        {jobs.map((job) => (
          <JobPreview key={job._id} job={job} />
        ))}
      </StyledSection>
    </>
  );
}
