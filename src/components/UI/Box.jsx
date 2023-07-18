/* eslint-disable react/prop-types */
import { useState } from "react";
import ToggleButton from "./ToggleButton";

export default function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <ToggleButton
        isOpen={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      />
      {isOpen && children}
    </div>
  );
}
