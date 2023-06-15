import React from 'react';
import { BagdeProps } from '../utils/Types';
import './Badge.css';

function Badge({text, variant = 'success'}: BagdeProps) {
  return (
    <div className={`badge ${variant}`}>
      {text}
    </div>
  );
}

export default Badge;
