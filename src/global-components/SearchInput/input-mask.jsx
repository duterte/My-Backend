import React, { useState, useEffect } from 'react';
import './input-mask.css';

export default function InputMask(props) {
  const [className, setClassName] = useState('input-mask');
  const inputType = props.children[1].props.type;
  useEffect(() => {
    if (inputType === 'password') {
      setClassName('input-mask pwd');
    } else if (inputType === 'checkbox') {
      setClassName('checkbox-mask');
    }
  }, [inputType]);

  return <label className={className}>{props.children}</label>;
}

export function CheckboxMask() {
  return null;
}
