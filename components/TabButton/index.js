import { StyledButton } from "./TabButton.styled";

export default function TabButton({ children, isActive, onClick }) {
  if (isActive) {
    return <StyledButton $isActive={isActive}>{children}</StyledButton>;
  }
  return (
    <StyledButton
      $isActive={isActive}
      onClick={() => {
        onClick();
      }}
    >
      {children}
    </StyledButton>
  );
}
