import React from "react";
import styled from "styled-components";
import { BsFillCalendar2WeekFill } from "react-icons/bs";
import { IoStatsChart } from "react-icons/io5";
import { BiGroup } from "react-icons/bi";
import { FiHome } from "react-icons/fi";
import { cardStyles } from "./ReusableStyles";
export default function Analytics() {
  return (
    <Section>
      <div className="analytic ">
        <div className="content">
          <h5>Spent this month</h5>
          <h2>$682.5</h2>
        </div>
        <div className="logo">
          <FiHome />
        </div>
      </div>
      <div className="analytic ">
        <div className="content">
          <h5>Spent this month</h5>
          <h2>$682.5</h2>
        </div>
        <div className="logo">
          <FiHome />
        </div>
      </div>
      <div className="analytic ">
        <div className="content">
          <h5>Spent this month</h5>
          <h2>$682.5</h2>
        </div>
        <div className="logo">
          <FiHome />
        </div>
      </div>
      <div className="analytic ">
        <div className="content">
          <h5>Spent this month</h5>
          <h2>$682.5</h2>
        </div>
        <div className="logo">
          <FiHome />
        </div>
      </div>
    </Section>
  );
}
const Section = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  .analytic {
    ${cardStyles};
    padding: 1rem;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 0.5rem;
    transition: 0.5s ease-in-out;
    &:hover {
      background-color: #ffc107;
      color: black;
      svg {
        color: white;
      }
    }
    .logo {
      background-color: black;
      border-radius: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1.5rem;
      svg {
        font-size: 1.5rem;
      }
    }
  }

  @media screen and (min-width: 280px) and (max-width: 720px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    .analytic {
      &:nth-of-type(3),
      &:nth-of-type(4) {
        flex-direction: row-reverse;
      }
    }
  }
`;
