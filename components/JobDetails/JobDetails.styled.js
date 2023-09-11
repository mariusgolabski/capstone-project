import styled from "styled-components";
import {
  Controller,
  Globe,
  Clock,
  CurrencyEuro,
} from "@styled-icons/bootstrap";

export const StyledJobDetailsWrapper = styled.div`
  margin: 3rem auto;
  padding: 0 1rem;
  max-width: 1030px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const StyledJobCard = styled.div`
  border: 1px solid #eaeaea;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.04);
  background-color: #ffffff;
`;

export const StyledHeroSection = styled.section`
  text-align: center;
  /* position: relative; */
  padding-top: 1.5rem;
`;

export const StyledJobTitle = styled.h1`
  font-weight: 700;
  font-size: 48px;
  margin-bottom: 3rem;
  @media screen and (max-width: 640px) {
    font-size: 40px;
  }
`;

export const StyledHeroFeaturesContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const StyledHeroFeature = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  white-space: nowrap;
`;

export const StyledLevel = styled(Controller)`
  text-align: right;
  width: 1.5rem;
  height: 1.5rem;
  color: #444;
  margin-right: 6px;
`;

export const StyledGlobe = styled(Globe)`
  text-align: right;
  width: 1.5rem;
  height: 1.5rem;
  color: #444;
  margin-right: 6px;
`;

export const StyledClock = styled(Clock)`
  text-align: right;
  width: 1.5rem;
  height: 1.5rem;
  color: #444;
  margin-right: 6px;
`;

export const StyledEuro = styled(CurrencyEuro)`
  text-align: right;
  width: 1.5rem;
  height: 1.5rem;
  color: #444;
  margin-right: 6px;
`;

export const StyledApplyButton = styled.button`
  margin-top: 3rem;
  width: 50%;
  height: 3rem;
  font-size: 1.1rem;
  font-weight: 500;
  border-radius: 0.375rem;
  padding: 0 0.75rem;
  cursor: pointer;
  border: none;
  background-color: #000;
  color: #fff;
`;

export const StyledDetailsSection = styled.div``;
export const StyledSkillsTitle = styled.h2`
  margin: 1.25rem 0;
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
