/**
 *  Control point of the carousel slider
 *  Accept props from the main component
 *  Then deliver it to the varios child component
 *  to to process the slider
 *
 *
 */

import { useRef, useState, useEffect } from 'react';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';
import { FaExpand } from 'react-icons/fa';
import Popper from 'global-components/popper';
import Slider from './slider';
import Panel from './panel';
import './index.css';

const SECONDS = 5; /* Slider interval */
const TRANS = 680; /* translateX in px */
const SLIDE_SPEED = 700; /* transition speed in milliseconds */
let interval; /* auto transition interval */
let timeout; /* use to clear setTimeout */

function Carousel({ meta }) {
  // Destructuring Props
  const {
    imageProps,
    deleteImageProps,
    pushTracker = 1,
    pushTrackerCommand,
    deleteCommand = undefined,
    popperCheck,
    property,
    marketing,
    price,
  } = meta;

  // ==========================Component States===========================
  const [freese, setFreese] = useState(false);
  const [popper, setPopper] = useState({ activate: false, payload: undefined });
  const [tracker, setTracker] = useState(1);
  const imageSlider = useRef();
  const trash = useRef();

  // ==========================Component Functions=========================
  function transition(tracker) {
    const element = imageSlider.current;
    element.style.transition = `transform ${SLIDE_SPEED / 1000}s ease-out`;
    element.style.transform = `translateX(${-TRANS * tracker}px)`;
  }

  function slideRight() {
    clearTimeout(timeout);
    setTracker(tracker => {
      const images = imageSlider.current.children;
      if (tracker >= images.length - 1) return tracker;
      tracker = tracker + 1;
      transition(tracker);
      return tracker;
    });
    trash.current.classList.add('hide');
    timeout = setTimeout(() => {
      trash.current.classList.remove('hide');
    }, SLIDE_SPEED);
  }

  function slideLeft() {
    clearTimeout(timeout);
    setTracker(tracker => {
      if (tracker <= 0) return tracker;
      tracker = tracker - 1;
      transition(tracker);
      return tracker;
    });
    trash.current.classList.add('hide');
    timeout = setTimeout(() => {
      trash.current.classList.remove('hide');
    }, SLIDE_SPEED);
  }

  function transitionend() {
    const images = imageSlider.current;
    if (images.children.length >= 1) {
      setTracker(tracker => {
        if (images.children[tracker]) {
          if (images.children[tracker].id === 'last') {
            images.style.transition = 'none';
            tracker = images.children.length - 2;
            images.style.transform = `translateX(${-TRANS * tracker}px)`;
          }
          if (images.children[tracker].id === 'first') {
            images.style.transition = 'none';
            tracker = images.children.length - tracker;
            images.style.transform = `translateX(${-TRANS * tracker}px)`;
          }
          return tracker;
        }
        return tracker;
      });
    }
  }

  function mouseOver() {
    clearInterval(interval);
  }

  function mouseLeave() {
    clearInterval(interval);
    if (freese) return;
    if (!imageProps.length) return;

    interval = setInterval(() => {
      setTracker(tracker => {
        const images = imageSlider.current.children;
        if (tracker >= images.length - 1) return tracker;
        tracker = tracker + 1;
        transition(tracker);
        return tracker;
      });
      trash.current.classList.add('hide');
      setTimeout(() => {
        trash.current.classList.remove('hide');
      }, SLIDE_SPEED);
    }, 1000 * SECONDS);
  }

  function deleteImg(button, popperCheck) {
    if (button === 'ok') {
      deleteImageProps(tracker - 1, popperCheck);
    }
    setPopper({ activate: false, payload: undefined });
    setFreese(freese => !freese);
    interval = setInterval(() => {
      setTracker(tracker => {
        const images = imageSlider.current.children;
        if (tracker >= images.length - 1) return tracker;
        tracker = tracker + 1;
        transition(tracker);
        return tracker;
      });
    }, 1000 * SECONDS);
  }

  function trashHandler() {
    clearInterval(interval);
    if (popper.activate) return;
    if (!popperCheck) {
      setFreese(freese => !freese);
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
      deleteImageProps(tracker - 1, popperCheck);
    }
  }

  // ==============================UseEffects================================

  // runs on the first render and in every time users click image slots
  // from the PhotoUpload

  useEffect(() => {
    const images = imageSlider.current;
    if (pushTrackerCommand || !pushTrackerCommand) {
      if (images.children.length > 1) {
        transition(pushTracker);
        setTracker(pushTracker);
        interval = setInterval(() => {
          setTracker(tracker => {
            if (tracker >= images.children.length - 1) return tracker;
            tracker = tracker + 1;
            transition(tracker);
            return tracker;
          });
        }, 1000 * SECONDS);
      }
    }
    return () => {
      clearInterval(interval);
    };
  }, [pushTracker, pushTrackerCommand]);

  // runs on first render and in every images added to this component
  // Sets the auto slide of the carousel

  useEffect(() => {
    clearInterval(interval);
    const images = imageSlider.current;
    if (imageProps.length > 1) {
      interval = setInterval(() => {
        setTracker(tracker => {
          if (tracker >= images.children.length - 1) return tracker;
          tracker = tracker + 1;
          transition(tracker);
          return tracker;
        });
        trash.current.classList.add('hide');
        setTimeout(() => {
          trash.current.classList.remove('hide');
        }, SLIDE_SPEED);
      }, 1000 * SECONDS);

      if (deleteCommand) {
      }

      images.style.transform = `translateX(${-TRANS * 1}px)`;
      images.addEventListener('transitionend', transitionend);
    } else {
      images.style.transform = `translateX(0px)`;
      setTracker(1);
    }

    return () => {
      clearInterval(interval);
      images.removeEventListener('transitionend', transitionend);
    };
  }, [imageProps, deleteCommand]);

  // ===============================View===================================
  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  return (
    <div
      className="image-viewer no-select"
      onMouseOver={mouseOver}
      onMouseLeave={mouseLeave}
    >
      {imageProps.length > 1 ? (
        <Panel meta={{ fn: slideLeft, side: 'left' }}>
          <i className="icon">
            <AiFillCaretLeft />
          </i>
        </Panel>
      ) : null}
      <div className="slider">
        <div ref={imageSlider} className="images">
          {imageProps.length >= 1 ? <Slider meta={{ imageProps }} /> : null}
        </div>
      </div>
      {imageProps.length > 1 ? (
        <Panel meta={{ fn: slideRight, side: 'right' }}>
          <i className="icon">
            <AiFillCaretRight />
          </i>
        </Panel>
      ) : null}
      {imageProps.length >= 1 ? (
        <div className="image-overlay">
          <div className="top-label">
            <div className="label-holder">
              {property ? <div className="property">{property}</div> : null}
              {marketing ? <div className="property">{marketing}</div> : null}
            </div>
            <div className="label-holder">
              {price ? <div className="property">{price}</div> : null}
            </div>
          </div>
          <i className="image-util expand">
            <FaExpand />
          </i>
          <i className="image-util trash" onClick={trashHandler} ref={trash}>
            <BsFillTrashFill />
          </i>
        </div>
      ) : null}
      {popper.activate ? <Popper meta={popper.payload} /> : null}
    </div>
  );
}

export default Carousel;
