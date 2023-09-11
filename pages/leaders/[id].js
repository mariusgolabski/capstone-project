import Header from "@/components/Header";
import LeaderDetails from "@/components/LeaderDetails";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function LeaderDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: leader,
    isLoading,
    error,
  } = useSWR(id && `/api/users/preview/${id}`);

  if (error) return <p>{error.message}</p>;
  if (isLoading || !id) return <div>Loading...</div>;

  return (
    <>
      <Header />
      <LeaderDetails leader={leader} />
    </>
  );
}
