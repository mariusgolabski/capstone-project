import Link from "next/link";
import styled from "styled-components";



export const StyledLeaderHeroSection = styled.section`
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

export const StyledProfileInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

export const StyledWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 14px;
  color: #666;
  background: #fafafa;
  border: 1px solid #eaeaea;
  padding: 6px 8px 6px 6px;
  border-radius: 999px;
  text-decoration: none;
  transition-property: color, border-color;
  transition-duration: 0.2s;
  line-height: 20px;
  @media (min-width: 600px) {
    flex-direction: row;
    align-items: center;
  }
`;

export const StyledCount = styled.span`
  font-size: 12px;
  font-weight: 500;
  height: 20px;
  line-height: 20px;
  padding: 0 8px;
  background: #000;
  color: #fff;
  border-radius: 999px;
`;

export const StyledAvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
