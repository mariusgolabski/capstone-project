import { Search, XCircle } from "@styled-icons/bootstrap";
import Link from "next/link";
import styled from "styled-components";

export const StyledLink = styled(Link)`
  text-decoration: none;
  a {
    text-decoration: none;
  }
`;

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
  &:hover {
    border-color: #999;
  }
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

export const StyledJobHeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem;
  max-width: 1030px;
  margin: 0 auto;
  text-align: center;
`;

export const StyledHeading = styled.h1`
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 1rem;
  margin-top: 3.5rem;
  @media (min-width: 768px) {
    max-width: 800px;
    font-size: 64px;
    line-height: 74px;
  }
`;

export const StyledHeroDescription = styled.p`
  margin-bottom: 3rem;
  font-size: 1.2rem;
  color: #666;
  font-weight: 300;
`;

export const StyledSearchWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const StyledSearchInput = styled.input`
  height: 2.5rem;
  font-size: inherit;
  width: 100%;
  padding-left: 40px; /* make room for the icon */
  border: 1px solid #e5e5e5;
  border-radius: 0.375rem;
  &:focus {
    outline: none;
    border: 1px solid #000;
  }
`;

export const StyledSearch = styled(Search)`
  color: #8f8f8f;
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  z-index: 10;
`;

export const StyledCleare = styled(XCircle)`
  color: #8f8f8f;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  z-index: 10;
  cursor: pointer;
  &:hover {
    color: #000;
  }
`;

export const StyledResult = styled.p`
  margin-top: 1rem;
  align-self: flex-start;
  color: #171717;
`;

export const StyledStrong = styled.strong`
  font-weight: bold;
`;
