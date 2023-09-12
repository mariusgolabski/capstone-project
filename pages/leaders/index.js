import Header from "@/components/Header";
import useSWR from "swr";
import LeaderPreview from "@/components/LeaderPreview";
import {
  StyledHeading,
  StyledHeroDescription,
  StyledLeaderHeroSection,
  StyledSection,
} from "@/components/LeaderPreview/LeaderPreview.styled";

export default function Leaders() {
  const { data: leaders, error, isLoading } = useSWR(`/api/users`);

  if (error) return <p>Faild to load</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <Header />
      <StyledLeaderHeroSection>
        <StyledHeading>
          The Minds Behind the Missions: Discover Your Next Leader
        </StyledHeading>
        <StyledHeroDescription>
          {`
         Leadership matters. That's why CuioHead offers you a unique chance to get to know your future leaders. Explore, connect, and find a mission that moves you."
        `}
        </StyledHeroDescription>
      </StyledLeaderHeroSection>
      <StyledSection>
        {leaders.map((leader) => (
          <LeaderPreview key={leader._id} leader={leader} />
        ))}
      </StyledSection>
    </>
  );
}

("Connect With Leaders, Not Just Employers");
