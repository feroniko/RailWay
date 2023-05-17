import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MdSpaceDashboard, MdTrain } from "react-icons/md";
import { RiDashboard2Fill } from "react-icons/ri";
import { FaAddressCard, FaTrain } from "react-icons/fa";
import { GiTwirlCenter } from "react-icons/gi";
import { BsFillChatTextFill } from "react-icons/bs";
import { IoSettings } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { GiNetworkBars } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";
import { FaWarehouse } from "react-icons/fa";
import { AiOutlineUserDelete } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import scrollreveal from "scrollreveal";
import { MdHandyman } from "react-icons/md";
import { MdOutlineTrain } from "react-icons/md";
import { MdAddRoad } from "react-icons/md";
import { Link } from "react-router-dom";
import { MdOutlineGpsFixed } from "react-icons/md";
import { MdHomeRepairService } from "react-icons/md";
import { MdCategory } from "react-icons/md";
import { useHistory ,useLocation } from 'react-router-dom';
import img from '../img/AI.png'
import { MdOutlineCamera } from "react-icons/md";


export default function SideBarMaster() {
  const [currentLink, setCurrentLink] = useState(2);
  const [navbarState, setNavbarState] = useState(false);
  const html = document.querySelector("html");
  html.addEventListener("click", () => setNavbarState(false));


  const removeToken = ()=> {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem('permissions')
  }
  

  
  


  useEffect(() => {
    const sr = scrollreveal({
      origin: "left",
      distance: "80px",
      duration: 1000,
      reset: false,
    });

    sr.reveal(
      `
          .brand,
          .links>ul>li:nth-of-type(1),
      .links>ul>li:nth-of-type(2),
      .links>ul>li:nth-of-type(3),
      .links>ul>li:nth-of-type(4),
      .links>ul>li:nth-of-type(5),
      .links>ul>li:nth-of-type(6),
      .logout
      `,
      {
        opacity: 0,
        interval: 300,
      }
    );
  }, []);

  return (
    <>
      <Section>
        <div className="top">
          <div className="brand">
            <img className="loco_locomotive" src={img}/>
            <span>Dashboard</span>
          </div>
          <div className="toggle">
            {navbarState ? (
              <VscChromeClose onClick={() => setNavbarState(false)} />
            ) : (
              <GiNetworkBars
                onClick={(e) => {
                  e.stopPropagation();
                  setNavbarState(true);
                }}
              />
            )}
          </div>
          <div  className={navbarState===true ? "links show":"links"}>
            <ul>
              <Link to={'/master_board/workers'}>
              <li
                className={currentLink === 2 ? "active" : "none"}
                onClick={() => setCurrentLink(2)}
              >
                <a>
                  <AiOutlineUserDelete />
                  <span> Worker</span>
                </a>
              </li>
              </Link>
              <Link to={'/master_board/fixing'}>
                <li
                  className={currentLink === 5 ? "active" : "none"}
                  onClick={() => setCurrentLink(5)}
                >
                  <a href="#">
                    <MdOutlineGpsFixed />
                    <span> Fixing </span>
                  </a>
                </li>
              </Link>
              <Link to={'/master_board/category'}>
                <li
                  className={currentLink === 6 ? "active" : "none"}
                  onClick={() => setCurrentLink(6)}
                >
                  <a href="#">
                    <MdCategory />
                    <span> Category Fixing </span>
                  </a>
                </li>
              </Link>
              <Link to={'/master_board/trips'}>
                <li
                  className={currentLink === 7 ? "active" : "none"}
                  onClick={() => setCurrentLink(7)}
                >
                  <a href="#">
                    <MdAddRoad />
                    <span>Trips</span>
                  </a>
                </li>
              </Link>
              <Link to={'/master_board/repair'}>
                <li
                  className={currentLink === 8 ? "active" : "none"}
                  onClick={() => setCurrentLink(8)}
                >
                  <a href="#">
                    <MdHomeRepairService />
                    <span>Repair</span>
                  </a>
                </li>
              </Link>
              
            </ul>
          </div>
        </div>
        <div className="logout" onClick={removeToken}>
          <a href="/">
            <FiLogOut  />
            <span className="logout">Logout</span>
          </a>
        </div>
      </Section>
      {/* <ResponsiveNav state={navbarState} className={navbarState ? "show" : ""}>
        <div className="responsive__links">
          <ul>
            <li
              className={currentLink === 1 ? "active" : "none"}
              onClick={() => setCurrentLink(1)}
            >
              <a href="#">
                <MdSpaceDashboard />
                <span> Dashboard</span>
              </a>
            </li>
            <li
              className={currentLink === 2 ? "active" : "none"}
              onClick={() => setCurrentLink(2)}
            >
              <a href="#">
                <RiDashboard2Fill />
                <span> Riders</span>
              </a>
            </li>
            <li
              className={currentLink === 3 ? "active" : "none"}
              onClick={() => setCurrentLink(3)}
            >
              <a href="#">
                <FaAddressCard />
                <span> Payment Details</span>
              </a>
            </li>
            <li
              className={currentLink === 4 ? "active" : "none"}
              onClick={() => setCurrentLink(4)}
            >
              <a href="#">
                <GiTwirlCenter />
                <span> Learning Center</span>
              </a>
            </li>
            <li
              className={currentLink === 5 ? "active" : "none"}
              onClick={() => setCurrentLink(5)}
            >
              <a href="#">
                <BsFillChatTextFill />
                <span> FAQs</span>
              </a>
            </li>
            <li
              className={currentLink === 6 ? "active" : "none"}
              onClick={() => setCurrentLink(6)}
            >
              <a href="#">
                <IoSettings />
                <span> Settings</span>
              </a>
            </li>
          </ul>
        </div>
      </ResponsiveNav> */}
    </>
  );
}
const Section = styled.section`
  position: fixed;
  left: 0;
  background-color: #212121;
  height: 100vh;
  width: 18vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 0;
  gap: 2rem;
  .top {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;

    .toggle {
      display: none;
    }
    .brand {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      svg {
        color: #ffc107;
        font-size: 2rem;
      }
      span {
        font-size: 2rem;
        color: #ffc107;
        font-family: "Permanent Marker", cursive;
        
      }
    }
    .links {
      display: flex;
      justify-content: center;
      ul {
        list-style-type: none;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        li {
          padding: 0.6rem 1rem;
          border-radius: 0.6rem;
          &:hover {
            background-color: #ffc107;
            a {
              color: black;
            }
          }
          a {
            text-decoration: none;
            display: flex;
            gap: 1rem;
            color: white;
          }
        }
        .active {
          background-color: #ffc107;
          a {
            color: black;
          }
        }
      }
    }
  }

  .logout {
    padding: 0.3rem 1rem;
    border-radius: 0.6rem;
    &:hover {
      background-color: #da0037;
    }
    a {
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      color: white;
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    position: initial;
    width: 100%;
    height: max-content;
    padding: 1rem;
    .top {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 0 1rem;
      .toggle {
        display: block;
        color: white;
        z-index: 99;
        svg {
          font-size: 1.4rem;
        }
      }
      .brand {
        gap: 1rem;
        justify-content: flex-start;
      }
    }
    .top > .links,
    .logout {
      display: none;
    }
  }
`;

const ResponsiveNav = styled.div`
  position: fixed;
  right: -10vw;
  top: 0;
  z-index: 10;
  background-color: black;
  height: 100vh;
  width: ${({ state }) => (state ? "60%" : "0%")};
  transition: 0.4s ease-in-out;
  display: flex;
  opacity: 0;
  visibility: hidden;
  padding: 1rem;
  .responsive__links {
    ul {
      list-style-type: none;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 3rem;
      li {
        padding: 0.6rem 1rem;
        border-radius: 0.6rem;
        &:hover {
          background-color: #ffc107;
          a {
            color: black;
          }
        }
        a {
          text-decoration: none;
          display: flex;
          gap: 1rem;
          color: white;
        }
      }
      .active {
        background-color: #ffc107;
        a {
          color: black;
        }
      }
    }
  }
`;
