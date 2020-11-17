import { IoIosClose } from 'react-icons/io';

function List({ meta }) {
  const { name, dispatch, value = [] } = meta;
  function updateList(textValue, add) {
    if (!textValue.trim()) return;
    const nameValue = name.toLowerCase();
    const targetValue = (function () {
      const filter = [...value].filter(
        item => item.toLowerCase() !== textValue.toLowerCase()
      );
      if (add) return [...filter, textValue.toLowerCase()];
      return filter;
    })();
    dispatch({ payload: { name: nameValue, value: targetValue } });
  }

  function remove(e) {
    const value = e.currentTarget.parentElement.firstElementChild.innerText;
    updateList(value, false);
  }

  function keyDown(e) {
    const { target, keyCode } = e;
    const key = (function () {
      const keys = [13, 188];
      return keys.find(key => key === keyCode);
    })();
    if (!key) return;
    e.preventDefault();
    const value = target.value;
    updateList(value, true);
    target.value = '';
  }

  function buttonClick({ target }) {
    const value = target.previousSibling.value;
    updateList(value, true);
    target.previousSibling.value = '';
  }

  return (
    <>
      <div className="features-list">
        {value.map((item, i) => (
          <div className="list" key={i}>
            <span>{item}</span>
            <i onClick={remove}>
              <IoIosClose />
            </i>
          </div>
        ))}
      </div>
      <div className="autocomplete">
        <input className="input" type="text" onKeyDown={keyDown} />
        <button className="page-button" onClick={buttonClick}>
          ADD
        </button>
      </div>
      <span className="no-select">{`if  your property has ${name.toLowerCase()} add it here.`}</span>
    </>
  );
}

export default List;
