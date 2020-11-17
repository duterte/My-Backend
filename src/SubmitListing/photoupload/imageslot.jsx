import { useState, useEffect } from 'react';
import { BsFillTrashFill } from 'react-icons/bs';
import Popper from 'global-components/popper';

function ImageSlot({ meta }) {
  const {
    url,
    name,
    index,
    slideToTarget,
    deleteImageProps,
    popperCheck,
  } = meta;
  const [imageSlotPopperCheck, setImageSlotPopperCheck] = useState(false);
  const [popper, setPopper] = useState({ activate: false, payload: undefined });

  function deleteImg(button, popperCheck) {
    if (button === 'ok') {
      deleteImageProps(index - 1, popperCheck);
    }
    // setPopperCheck(check);
    setPopper({ activate: false, payload: undefined });
  }

  function slideHandler(e) {
    e.stopPropagation();
    slideToTarget(index);
  }

  function trashHandler(e) {
    e.stopPropagation();
    if (popper.activate) return;

    if (!popperCheck) {
      setPopper(popper => {
        let { activate, payload } = popper;
        activate = true;
        payload = {
          component: 'delete',
          fn: deleteImg,
          popperCheck,
        };
        return { activate, payload };
      });
    } else {
      deleteImageProps(index - 1, imageSlotPopperCheck);
    }
  }

  useEffect(() => {
    setImageSlotPopperCheck(popperCheck);
  }, [popperCheck]);

  return (
    <>
      <div className="used no-select">
        <img onClick={slideHandler} src={url} alt={name} />
        <i>
          <BsFillTrashFill onClick={trashHandler} />
        </i>
      </div>
      {popper.activate ? <Popper meta={popper.payload} /> : null}
    </>
  );
}

export default ImageSlot;
