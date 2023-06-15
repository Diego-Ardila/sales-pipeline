import { useRef, useState } from 'react';
import { DropdownProps, OptionElement, Status } from '../utils/Types';
import './DropdownButton.css';
import Checkbox from './Checkbox';

function DropdownButton({title, icon, options, filter}: DropdownProps) {
  const dropdownRef = useRef<HTMLDetailsElement>(null);
  const onClick = (option: OptionElement) => {
    option.action();
    const element = dropdownRef.current;
    if(element) {
      setTimeout(() => {
        element.removeAttribute("open")
      }, 1000);
    }
  }

  return (
    <details ref={dropdownRef} className="dropdown">
      <summary role="button">
        <a className="button">
          {icon}
          &nbsp;
          {title}
        </a>
      </summary>
      <ul>
        {options.map(option => (
          <li key={option.name}>
            <a>
              <Checkbox
                isChecked={filter.includes(option.name)}
                option={option}
                onClick={onClick}
              />
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}

export default DropdownButton;
