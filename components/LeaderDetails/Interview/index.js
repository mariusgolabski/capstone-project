import {
  StyledCard,
  StyledCategory,
  StyledHeader,
  StyledQuestion,
  StyledAnswer,
} from "./Interview.styled";

export default function Interview({ category, question, answer }) {
  return (
    <StyledCard>
      <StyledHeader>
        <StyledCategory>{category}</StyledCategory>
        <StyledQuestion>{question}</StyledQuestion>
      </StyledHeader>
      <StyledAnswer>{answer}</StyledAnswer>
    </StyledCard>
  );
}
