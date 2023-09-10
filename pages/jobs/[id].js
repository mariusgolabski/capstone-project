import Header from "@/components/Header";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function JobDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  //prevent an unnecessary API call to an endpoint that includes undefined
  const { data: job, isLoading, error } = useSWR(id && `/api/jobs/${id}`);

  if (error) return <p>{error.message}</p>;
  if (isLoading || !id) return <div>Loading...</div>;

  // Render the job details
  return (
    <>
      <Header />
      <div>
        <h1>{job.jobTitle}</h1>
      </div>
    </>
  );
}
