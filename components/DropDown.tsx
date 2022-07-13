import React, { useState } from "react";
import theme from "../styles/theme";

interface InputProps {
    defaultValue?: string;
    disabled?: boolean;
    error?: string;
    width?: string;
    name: string;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => any;
    onClick?: (par) => any;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => any;
    value?: string;
    tabIndex?: number;
}

export default function DropDown({
  defaultValue,
  disabled,
  error,
  name,
  onBlur,
  onClick,
  onFocus,
  tabIndex,
  value,
  width
}: InputProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
      <div>
        <div className="dropdown">
            <button onClick={() => setIsOpen(!isOpen)} className="dropbtn">{!isOpen ? "˅" : "^"}  {name}  {!isOpen ? "˅" : "^"}</button>
            {isOpen ? 
                <div id="myDropdown" className="dropdown-content">
                    <a href="#" onClick={() => onClick('td')}>td</a>
                    <a href="#" onClick={() => onClick('bu')}>bu</a>
                    <a href="#" onClick={() => onClick('lr')}>lr</a>
                    <a href="#" onClick={() => onClick('rl')}>rl</a>
                    <a href="#" onClick={() => onClick('radial-out')}>radial-out</a>
                    <a href="#" onClick={() => onClick('radial-in')}>radial-in</a>
                    <a href="#" onClick={() => onClick('null')}>null</a>
                </div>
            : <></>}
        </div>
      <style jsx>{`
        .dropbtn {
            background-color: #CB6A13;
            color: white;
            font-size: 16px;
            border: none;
            cursor: pointer;
            border-radius: 0.5rem;
            font-size: 0.875rem;
            font-weight: 600;
            background: #CB6A13;
            color: #fff;
            0.25rem solid transparent;
            padding: 1.2rem 0.8rem;
        }
        
        /* Dropdown button on hover & focus */
        .dropbtn:hover, .dropbtn:focus {
            background-color: #CB6A13;
        }
        
        /* The container <div> - needed to position the dropdown content */
        .dropdown {
            position: relative;
            display: inline-block;
            border-radius: 0.5rem;
            font-size: 0.875rem;
            font-weight: 600;
            background: #CB6A13;
            color: #fff;
        }
        
        /* Dropdown Content (Hidden by Default) */
        .dropdown-content {
            position: absolute;
            background-color: #f1f1f1;
            min-width: 160px;
            box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
            z-index: 1;
        }
        
        /* Links inside the dropdown */
        .dropdown-content a {
            color: black;
            padding: 12px 16px;
            text-decoration: none;
            display: block;
        }
        button, .dropdown-content {
            padding: 0.5rem 0.75rem;
            font-size: .9rem;
            border-radius: ${theme.borderRadius.sm};
            border: 0.2rem solid transparent;
            border-color: ${error ? "red" : "transparent"};
            opacity: ${disabled ? "0.5" : "1"};
            background: ${theme.color.background.alt};
        }
        button:disabled {
            border-color: ${theme.color.border.alt};
            background: none;
            cursor: not-allowed;
        }
        button:focus {
            border-color: ${theme.color.brand.base};
            box-shadow: ${theme.elevation.two.brand};
            background: white;
        }
        button {
            width: ${width};
        }

      `}</style>
    </div>
  );
}
