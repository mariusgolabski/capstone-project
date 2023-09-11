import { StyledImage } from "./Avatar.styled";

export function Avatar({ userImage }) {
  return <StyledImage src={userImage} alt="me" width="64" height="64" />;
}
