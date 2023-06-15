import { ChangeEvent } from 'react';
import { CheckboxProps } from '../utils/Types';
import './Checkbox.css';

function Checkbox({isChecked, option, onClick}: CheckboxProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onClick(option)
  }
  
  return (
    <div className='checkbox-container'>
      <label className="checkbox bounce">
        <input id={option.name} type="checkbox" onChange={handleChange} checked={isChecked} />
        <svg viewBox="0 0 21 21">
          <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
        </svg>
      </label>
      <label htmlFor={option.name}>
        {option.name}
      </label>
    </div>
  );
}

export default Checkbox;