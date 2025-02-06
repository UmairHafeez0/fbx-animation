import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";

const HeaderContainer = styled.header<{ scrolled: boolean }> `
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1rem 2rem;
  transition: all 0.3s ease-in-out;
  background: ${(props) => (props.scrolled ? "#000" : "transparent")};
  box-shadow: ${(props) => (props.scrolled ? "0 4px 6px rgba(0, 0, 0, 0.1)" : "none")};
  z-index: 1000;
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  &:hover .dropdown-menu {
    display: block;
  }
`;

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <HeaderContainer scrolled={scrolled} className="container-fluid">
      <div className="container d-flex justify-content-between align-items-center">
        <h1 className="text-light fw-bold">Emperotech Solutions</h1>
        <nav className="d-flex gap-3">
          <Dropdown title="Services" items={["Web Development", "Mobile Apps", "AI Solutions", "Cloud Services"]} />
          <Dropdown title="Portfolio" items={["Our Projects", "Case Studies", "Client Testimonials"]} />
          <Dropdown title="Company" items={["About Us", "Careers", "Blog"]} />
          <Dropdown title="Contact" items={["Support", "Sales", "Partnerships"]} />
        </nav>
      </div>
    </HeaderContainer>
  );
};

const Dropdown: React.FC<{ title: string; items: string[] }> = ({ title, items }) => {
  return (
    <DropdownContainer className="dropdown">
      <button className="btn btn-dark dropdown-toggle" type="button">
        {title} <FaChevronDown className="ms-1" />
      </button>
      <ul className="dropdown-menu bg-dark text-light">
        {items.map((item, index) => (
          <li key={index}>
            <a className="dropdown-item text-light" href="#">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </DropdownContainer>
  );
};

export default Header;
