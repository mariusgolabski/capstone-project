import { styled } from "styled-components";
import { X } from "@styled-icons/bootstrap";

export const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(3px);
  z-index: 5;
`;

export const StyledModal = styled.div`
  background-color: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  border-radius: 0.5rem;
  transform: translate(-50%, -50%);
  width: 600px;
  max-width: calc(100% - 80px);
  max-height: calc(100% - 80px);
`;
export const StyledHeader = styled.div`
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: white;
  border-bottom: 1px solid #eaeaea;
`;

export const CloseModalButton = styled.button`
  border: none;
  padding: 0;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    background-color: #eaeaea;
    border-radius: 50%;
  }
`;

export const CloseModalSvg = styled(X)`
  text-align: right;
  width: 2rem;
  height: 2rem;
  color: #666;
  &:hover {
    color: #000;
  }
`;

export const StyledContent = styled.div`
  padding: 1rem;
  color: #333;
  overflow-y: auto;
  max-height: calc(100vh - 215px);
`;

export const RadioButtonLabel = styled.label`
  display: block;
  margin: 1rem 0rem;
  padding: 0.7rem 1.5rem;
  color: ${({ selected }) => (selected ? "#000" : "#666")};
  cursor: pointer;
  border: 1px solid ${({ selected }) => (selected ? "#000" : "#E5E5E5")};
  border-radius: 0.375rem;
  background-color: ${({ selected }) => (selected ? "#fff" : "#fafafa")};

  &:hover {
    background-color: #fff;
    color: #000;
  }
`;

export const RadioButton = styled.input.attrs({ type: "radio" })`
  display: none;
`;

export const StyledTextarea = styled.textarea`
  font: inherit;
  height: 10rem;
  margin: 1rem 0;
  padding: 0.625rem 0.75rem;
  width: 100%;
  border-radius: 0.375rem;
  resize: none;
  border: 1px solid #e5e5e5;
  &:focus {
    outline: none;
    border: 1px solid #000;
  }
`;

export const StyledFooter = styled.div`
  border-top: 1px solid #eaeaea;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  background-color: #fff;
  padding: 1rem;
`;

export const StyledButton = styled.button`
  font-size: 0.8rem;
  text-transform: uppercase;
  border-radius: 0.375rem;
  padding: 0.7rem 1.5rem;
  cursor: pointer;

  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  background-color: ${({ disabled }) => (disabled ? "#fafafa" : "#000")};
  color: ${({ disabled }) => (disabled ? "#666" : "#fff")};
  border: 1px solid ${({ disabled }) => (disabled ? "#666" : "#000")};
`;
