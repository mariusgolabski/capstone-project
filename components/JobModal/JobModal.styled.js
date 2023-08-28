import ReactSlider from "react-slider";
import { styled } from "styled-components";
import { X } from "@styled-icons/bootstrap";

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(3px);
  z-index: 50;
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

  cursor: pointer;
  background-color: #000;
  color: #fff;
  border: 1px solid #000;
`;

export const StyledLabel = styled.label`
  display: block;
  font-size: 13px;
  color: #666;
  margin-bottom: 0.5rem;
  max-width: 100%;
`;

export const StyledInput = styled.input`
  height: 2.5rem;
  font-size: inherit;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.7rem;
  border: 1px solid #e5e5e5;
  border-radius: 0.375rem;
  &:focus {
    outline: none;
    border: 1px solid #000;
  }
`;

export const StyledSelect = styled.select`
  color: #000;
  height: 2.5rem;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0 0.4rem;
  border: 1px solid #e5e5e5;
  border-radius: 0.375rem;
  font-size: inherit;
  &:focus {
    outline: none;
    border: 1px solid #000;
  }
`;

export const StyledSlider = styled(ReactSlider)`
  width: 100%;
  height: 1.563rem;
`;

export const StyledSalaryRangeOutput = styled.div`
  margin-top: 0.4rem;
  margin-bottom: 1rem;
`;

export const StyledThumb = styled.div`
  height: 1.563rem;
  line-height: 1.563rem;
  width: 1.563rem;
  text-align: center;
  background-color: #000;
  color: #fff;
  border-radius: 50%;
  cursor: grab;
`;

export const StyledTrack = styled.div`
  top: 0;
  bottom: 0;
  border-radius: 999px;
  background: ${({ $index }) => ($index === 1 ? "#444" : "#888")};
`;
