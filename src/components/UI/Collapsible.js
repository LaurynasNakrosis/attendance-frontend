import React, { useState } from "react";
import "./Collapsible.scss";

const Collapsible = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="collapsible">
      <header
        className="collapsible__header"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="collapsible__title">{title}</span>
        <span className="collapsible__icon" >
          {isOpen 
          ? <i  className="fas fa-chevron-up" message="Click to hide table"></i> 
          : 
          <i className="fas fa-chevron-down"></i>
          }
        </span>
      </header>
      {isOpen && (
        <main className="collapsible__body">{children}</main>
      )}
    </div>
  );
};

export default Collapsible;

