import { StyledButton } from "./FilterButton.styled";

export default function FilterButton({
  category,
  isActive,
  handleCategoryChange,
}) {
  function handleClick() {
    if (!isActive) {
      handleCategoryChange(category);
    }
  }

  return (
    <StyledButton onClick={handleClick} $isActive={isActive}>
      {category}
    </StyledButton>
  );
}
