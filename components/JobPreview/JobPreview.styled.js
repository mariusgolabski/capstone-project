import styled from "styled-components";

export const StyledSection = styled.section`
  margin: 3rem auto;
  padding: 0 1rem;
  max-width: 1030px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const StyledCard = styled.article`
  border: 1px solid #eaeaea;
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.04);
  background-color: #ffffff;
`;

export const StyledCompanyName = styled.span`
  display: block;
  color: #666;
  font-size: 0.8rem;
  text-transform: uppercase;
  border-radius: 1rem;
`;

export const StyledFooter = styled.div`
  display: flex;
  border-top: 1px solid #eaeaea;
  padding: 1rem 2rem;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
`;

export const StyledSkillsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const StyledSkill = styled.span`
  padding: 0.25rem 0.5rem;
  border: 1px solid #eaeaea;
  border-radius: 100px;
  white-space: nowrap;
  font-size: 14px;
  line-height: 1rem;
  background-color: #fafafa;
  color: #666;
`;

export const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 2rem;
`;

export const StyledList = styled.ul`
  font-size: 0.8rem;
  color: #666;
  padding: 0px;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0 1.5rem;
  margin: 0;
  flex: auto;
  @media (min-width: 600px) {
    flex-direction: row;
    align-items: center;
  }
`;

export const StyledListItem = styled.li`
  position: relative;

  @media (min-width: 600px) {
    &:not(:last-child)::after {
      position: absolute;
      top: 0.4rem;
      right: -0.875rem;
      width: 0.3125rem;
      height: 0.3125rem;
      background-color: #000;
      border-radius: 0.3125rem;
      content: "";
    }
  }
`;

export const StyledAvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
