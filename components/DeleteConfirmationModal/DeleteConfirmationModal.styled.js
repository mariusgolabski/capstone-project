import { styled, css } from "styled-components";
import { X } from "@styled-icons/bootstrap";

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(3px);
  z-index: 15;
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
  justify-content: end;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem 1rem;
  color: #333;
  overflow-y: auto;
  max-height: calc(100vh - 215px);
`;

export const StyledButton = styled.button`
  width: 100%;
  padding: 0.8rem 1.6rem;
  border: none;
  border-radius: 0.375rem;
  background-color: #f2f2f2;
  cursor: pointer;
  &:hover {
    background-color: #e5e5e5;
  }
  ${({ $danger }) =>
    $danger &&
    css`
      border: none;
      background-color: #fff;
      color: #fc5e75;
      &:hover {
        background-color: #f7d4d5;
      }
    `}
`;
