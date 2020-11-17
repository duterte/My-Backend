import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function DeleteModal({ meta }) {
  const { popperCheck, fn } = meta;
  const [check, setCheck] = useState(false);
  function okHandler() {
    fn('ok', check);
  }
  function cancelHandler() {
    fn('cancel', check);
  }
  function checkboxHandler() {
    setCheck(check => !check);
  }

  useEffect(() => {
    setCheck(popperCheck);
  }, [popperCheck]);

  return (
    <div className="delete-holder">
      <div className="delete-confirmation no-select">
        <div className="confirmation">
          Did you wish to delete this picture ?
        </div>
        <div className="btns">
          <button className="page-button cancel" onClick={cancelHandler}>
            cancel
          </button>
          <button className="page-button primary" onClick={okHandler}>
            Yes
          </button>
        </div>
        <label>
          <input type="checkbox" checked={check} onChange={checkboxHandler} />
          <span>Remember my choice</span>
        </label>
      </div>
    </div>
  );
}

function NotificationModal() {
  return (
    <div className="notification-holder no-select">
      <div className="notification">
        <div>Uploaded Successfully 1</div>
      </div>
      <div className="notification">
        <div>Uploaded Successfully 2</div>
      </div>
      <div className="notification">
        <div>Uploaded Successfully 3</div>
      </div>
    </div>
  );
}

function Popper({ meta }) {
  const { component, ...rest } = meta;
  return ReactDOM.createPortal(
    <>
      {component === 'delete' ? <DeleteModal meta={rest} /> : null}
      {component === 'notificaton' ? <NotificationModal /> : null}
    </>,
    document.getElementById('popper')
  );
}

export default Popper;
