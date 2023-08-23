import {
  Backdrop,
  StyledModal,
  StyledHeader,
  CloseModalSvg,
  StyledContent,
  StyledButton,
} from "./DeleteConfirmationModal.styled";
import { CloseModalButton } from "../Modal/Modal.styled";

export default function DeleteConfirmationModal({
  isOpen,
  onCancel,
  onConfirmDelete,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <Backdrop>
      <StyledModal>
        <StyledHeader>
          <CloseModalButton onClick={onCancel}>
            <CloseModalSvg />
          </CloseModalButton>
        </StyledHeader>
        <StyledContent>
          <h2>Are you sure?</h2>
          <p>Your content will be lost</p>
          <StyledButton onClick={onCancel}>Cancel</StyledButton>
          <StyledButton onClick={onConfirmDelete} $danger>
            Confirm
          </StyledButton>
        </StyledContent>
      </StyledModal>
    </Backdrop>
  );
}
