import styled from "styled-components";
import { PlusCircleFill } from "@styled-icons/bootstrap";

export const StyledSection = styled.section`
  margin: 0 auto 4rem auto;
  padding: 0 1rem;
  max-width: 1030px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const AddInterviewSvg = styled(PlusCircleFill)`
  width: 2.25rem;
  color: #08ce6b;
`;

export const StyledOpenModalButton = styled.button`
  cursor: pointer;
  border-radius: 0.375rem;
  padding: 1rem 0;
  border: 1px dashed #000;
  background-color: #fff;
  &:hover {
    ${AddInterviewSvg} {
      color: #05bc60;
    }
  }
`;
