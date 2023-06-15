import { useRef } from 'react';
import { DropdownProps, OptionElement } from '../utils/Types';
import './DropdownButton.css';

function DropdownButton({title, icon, options}: DropdownProps) {
  const dropdownRef = useRef<HTMLDetailsElement>(null);
  const onClick = (option: OptionElement) => {
    const element = dropdownRef.current;
    if(element) element.removeAttribute("open")
    option.action();
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
            <a onClick={() => { onClick(option) }}>
              {option.name}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}

export default DropdownButton;
