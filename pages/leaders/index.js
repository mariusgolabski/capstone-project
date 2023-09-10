import Header from "@/components/Header";
import useSWR from "swr";
import LeaderPreview from "@/components/LeaderPreview";
import { StyledSection } from "@/components/LeaderPreview/LeaderPreview.styled";

export default function Leaders() {
  const { data: leaders, error, isLoading } = useSWR(`/api/users`);
  

  if (error) return <p>Faild to load</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <Header />
      <StyledSection>
        {leaders.map((leader) => (
          <LeaderPreview key={leader._id} leader={leader} />
        ))}
      </StyledSection>
    </>
  );
}
