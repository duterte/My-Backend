function TypeRadio({ meta }) {
  const { name, answers, handleChange } = meta;
  return answers.map((elem, i) => (
    <label key={i}>
      <input type="radio" name={name} value={elem} onChange={handleChange} />
      {`  ${elem}`}
    </label>
  ));
}

export default TypeRadio;
