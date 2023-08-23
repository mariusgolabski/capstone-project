import {
  StyledCard,
  StyledCategory,
  StyledHeader,
  StyledQuestion,
  StyledAnswer,
  StyledFooter,
  StyledButton,
} from "./Interview.styled";

export default function Interview({
  interview,
  category,
  question,
  answer,
  onEdit,
  onDelete,
}) {
  return (
    <StyledCard>
      <StyledHeader>
        <StyledCategory>{category}</StyledCategory>
        <StyledQuestion>{question}</StyledQuestion>
      </StyledHeader>
      <StyledAnswer>{answer}</StyledAnswer>
      <StyledFooter>
        <StyledButton onClick={() => onEdit(interview)}>Edit</StyledButton>
        <StyledButton onClick={() => onDelete(interview)}>Delete</StyledButton>
      </StyledFooter>
    </StyledCard>
  );
}
