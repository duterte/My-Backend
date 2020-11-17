function TypeSelect({ meta }) {
  const { name, handleChange, category, choice, parentValue, value } = meta;
  let { answers } = meta;
  if (!answers.length) {
    let string;
    for (const key in category) {
      let found = category[key].find(elem => elem === parentValue);
      if (found) {
        string = key;
        break;
      }
    }
    answers = choice[string];
  }
  return (
    <select
      className="input"
      name={name}
      onChange={handleChange}
      value={value ? value : ''}
    >
      {['', ...answers].map((answer, i) => (
        <option key={i} value={answer}>
          {answer}
        </option>
      ))}
    </select>
  );
}

export default TypeSelect;
