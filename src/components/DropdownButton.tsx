import { DropdownProps } from '../utils/Types';
import './DropdownButton.css';
import Checkbox from './Checkbox';

function DropdownButton({title, icon, options, filter}: DropdownProps) {

  return (
    <details className="dropdown">
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
              />
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}

export default DropdownButton;
