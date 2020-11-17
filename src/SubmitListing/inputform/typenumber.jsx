import NumberFormat from './numberFormatter';

function TypeNumber({ meta }) {
  const { name, value, handleChange, format } = meta;

  function handler(e) {
    const { target } = e;
    const arg = {
      value: target.value,
      selectionRange: {
        start: target.selectionStart,
        valueLen: target.value.length,
      },
    };

    if (format === 'currency') {
      arg.prefix = String.fromCharCode(8369);
    } else if (format === 'meter') {
      arg.postfix = 'sqm';
    }

    const number = new NumberFormat(arg);
    const currency = number.formatValue();
    target.value = currency;
    handleChange(e);
    number.stickCursor(target);
  }

  return (
    <input
      type="text"
      inputMode="numeric"
      spellCheck="false"
      name={name}
      className="input"
      value={value ? value : ''}
      onChange={handler}
    />
  );
}

export default TypeNumber;
