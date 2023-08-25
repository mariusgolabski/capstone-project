import { StyledButton } from "./TabButton.styled";

export default function TabButton({ children, isActive, onClick }) {
  return (
    <StyledButton $isActive={isActive} onClick={onClick ? onClick : null}>
      {children}
    </StyledButton>
  );
}
