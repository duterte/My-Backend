import { Provinces } from './philippine-address';

const ADDRESS = {
  PROVINCE: 'province',
  CITY: 'city',
  STREET: 'street',
};

function Address({ meta }) {
  const { dispatch, value = {} } = meta;
  function onChangeHandler({ target }) {
    const { value, id, parentNode } = target;
    const array = (function () {
      if (id === ADDRESS.PROVINCE) return Provinces;
      return [];
    })();

    function callDispatch(value) {
      dispatch({ payload: { name: 'address', value: { [id]: value } } });
    }

    function closeAllLists(element) {
      let dc = document.querySelectorAll('.autocomplete-items');
      for (let i = 0; i < dc.length; i++) {
        if (element !== dc[i] && element !== value) {
          dc[i].parentNode.removeChild(dc[i]);
        }
      }
    }
    closeAllLists();
    callDispatch(value);
    if (!value.trim()) return;
    let list = document.createElement('div');
    list.setAttribute('id', `${id}-list`);
    list.setAttribute('class', 'autocomplete-items');
    parentNode.appendChild(list);
    // array.length
    let count = 0;
    for (let i = 0; i < array.length; i++) {
      if (count === 5) break;
      const string = array[i].substr(0, value.length).toUpperCase();
      if (string === value.toUpperCase()) {
        let entry = document.createElement('div');
        entry.innerHTML = `<b>${array[i].substr(0, value.length)}</b>`;
        entry.innerHTML += `${array[i].substr(value.length)}`;
        entry.innerHTML += `<input type='hidden' value='${array[i]}'/>`;
        entry.addEventListener('click', ({ currentTarget }) => {
          target.value = currentTarget.querySelector('input').value;
          closeAllLists();
          callDispatch(target.value);
        });
        list.appendChild(entry);
        count++;
      }
    }
  }

  function keyDownHandler({ target, keyCode }) {
    const { id } = target;
    const element = target.parentNode.querySelector(`#${id}-list`);
    if (!element) return;
    if (keyCode === 40) {
      down(element.children);
    } else if (keyCode === 38) {
      up(element.children);
      // return key
    } else if (keyCode === 13) {
      activate(element.children);
    }
    function down(elements) {
      let active = undefined;
      for (let i = 0; i < elements.length; i++) {
        if (elements[i].classList.contains('autocomplete-active')) {
          active = i + 1;
        }
        elements[i].classList.remove('autocomplete-active');
      }
      const i = active !== undefined ? active : 0;
      if (elements[i]) {
        elements[i].classList.add('autocomplete-active');
      } else {
        elements[0].classList.add('autocomplete-active');
      }
    }
    function up(elements) {
      let active = undefined;
      for (let i = elements.length - 1; i > -1; i--) {
        if (elements[i].classList.contains('autocomplete-active')) {
          active = i - 1;
        }
        elements[i].classList.remove('autocomplete-active');
      }
      const i = active !== undefined ? active : elements.length - 1;
      if (elements[i]) {
        elements[i].classList.add('autocomplete-active');
      } else {
        elements[elements.length - 1].classList.add('autocomplete-active');
      }
    }
    function activate(elements) {
      for (let i = 0; i < elements.length; i++) {
        if (elements[i].classList.contains('autocomplete-active')) {
          elements[i].click();
          break;
        }
      }
    }
  }

  return (
    <>
      <div className="autocomplete">
        <input
          className="input"
          type="text"
          placeholder="Country"
          value="Philippines"
          disabled
        />
      </div>
      <div className="autocomplete">
        <input
          className="input"
          id={ADDRESS.PROVINCE}
          type="text"
          placeholder="Province"
          onChange={onChangeHandler}
          onKeyDown={keyDownHandler}
          autoComplete="off"
          value={value.province ? value.province : ''}
        />
      </div>
      <div className="autocomplete">
        <input
          className="input"
          id={ADDRESS.CITY}
          type="text"
          placeholder="City"
          onChange={onChangeHandler}
          onKeyDown={keyDownHandler}
          autoComplete="off"
          value={value.city ? value.city : ''}
        />
      </div>
      <div className="autocomplete">
        <input
          className="input"
          id={ADDRESS.STREET}
          type="text"
          placeholder="Street Address"
          onChange={onChangeHandler}
          onKeyDown={keyDownHandler}
          autoComplete="off"
          value={value.street ? value.street : ''}
        />
      </div>
    </>
  );
}

export default Address;
