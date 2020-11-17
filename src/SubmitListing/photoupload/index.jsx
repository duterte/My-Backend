import { useRef, useState, useEffect } from 'react';
import { BiImageAdd } from 'react-icons/bi';
import Carousel from 'global-components/carousel';
import ImageSlot from './imageslot';

const FILE = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'].toString();
const allowedFileExt = ['png', 'jpg', 'jpeg', 'webp'];

function PhotoUpload({ meta }) {
  const { images = [], setImageFiles } = meta;
  const [imageProps, setImageProps] = useState([]);
  const [pushTracker, setPushTracker] = useState(1);
  const [pushTrackerCommand, setPushTrackerCommand] = useState(true);
  const [deleteCommand, setDeleteCommand] = useState(undefined);
  const [popperCheck, setPopperCheck] = useState(false);
  const [marketing, setMarketing] = useState(undefined);
  const [property, setProperty] = useState(undefined);
  const [price, setPrice] = useState(undefined);
  const input = useRef();
  const addImageIcon = useRef();
  const dropzone = useRef();
  const photoupload = useRef();

  function dragover(e) {
    e.preventDefault();
    dropzone.current.classList.add('active');
    photoupload.current.classList.add('dragover');
  }

  function dragleave(e) {
    e.preventDefault();
    dropzone.current.classList.remove('active');
    photoupload.current.classList.remove('dragover');
  }

  function drop(e) {
    e.preventDefault();
    dropzone.current.classList.remove('active');
    photoupload.current.classList.remove('dragover');
    const element = e.target.tagName.toLowerCase();
    let files;
    if (element === 'input') files = e.target.files;
    else files = e.dataTransfer.files;

    function readedFile(e) {
      setImageProps(imageProps => {
        const newImg = { url: e.target.result, name: 'Add Caption' };
        return [...imageProps, newImg];
      });
    }

    for (let i = 0; i < files.length; i++) {
      let { name } = files[i];
      let split = name.split('.');
      let fileExt = split[split.length - 1];
      let found = allowedFileExt.find(ext => ext === fileExt);
      if (found) {
        const readFile = new FileReader();
        readFile.readAsDataURL(files[i]);
        readFile.addEventListener('load', readedFile);
        setImageFiles(image => [...image, files[i]]);
      }
    }
  }

  function click(e) {
    const element = e.currentTarget;
    element.classList.add('spinner');
    const i = element.querySelector('i');
    i.classList.add('show');
    setTimeout(() => {
      element.classList.remove('spinner');
      i.classList.add('remove');
    }, 2000);
    input.current.click();
  }

  function deleteImageProps(tracker, popperCheck) {
    setPopperCheck(popperCheck);
    setImageProps(imageProps => {
      const copiedImgs = [...imageProps];
      copiedImgs.splice(tracker, 1);
      return copiedImgs;
    });

    setImageFiles(image => {
      const copiedImgs = [...image];
      copiedImgs.splice(tracker, 1);
      return copiedImgs;
    });

    setDeleteCommand(tracker);
  }

  function slideToTarget(index) {
    setPushTracker(index);
    setPushTrackerCommand(pushTrackerCommand => !pushTrackerCommand);
  }

  useEffect(() => {
    if (images.length) {
      setImageProps(() => images);
    }
  }, [images]);

  useEffect(() => {
    const { snippets } = meta;
    if (snippets.property) {
      setProperty(snippets.property.toUpperCase());
    } else {
      setProperty(undefined);
    }
    if (snippets.marketing) {
      const str = snippets.marketing.toLowerCase();
      let propertyMarketing;
      if (str === 'My property is for sale'.toLowerCase()) {
        propertyMarketing = 'for sale';
      } else if (str === 'My property is for rent'.toLowerCase()) {
        propertyMarketing = 'for rent';
      } else if (str === 'This is a foreclosed property') {
        propertyMarketing = 'foreclosed property';
      }
      propertyMarketing = propertyMarketing.toUpperCase();
      setMarketing(propertyMarketing);
    } else {
      setMarketing(undefined);
    }
    if (snippets.price) {
      setPrice(snippets.price);
    } else {
      setPrice(undefined);
    }
  }, [meta]);

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //  To be implemented soon
  //
  // useEffect(() => {
  //   const element = document.querySelector('.images-slots');
  //   element.scrollTo(element.scrollWidth, 0);
  // }, [imageProps]);
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  return (
    <div className="photo-upload" onDragOver={dragover} ref={photoupload}>
      <Carousel
        meta={{
          imageProps,
          deleteImageProps,
          property,
          marketing,
          price,
          pushTracker,
          pushTrackerCommand,
          deleteCommand,
          popperCheck,
        }}
      />
      <div className="images-slots">
        {imageProps.map((img, i) => {
          const { url, name } = img;
          return (
            <ImageSlot
              key={i}
              meta={{
                url,
                name,
                index: i + 1,
                slideToTarget,
                deleteImageProps,
                popperCheck,
              }}
            />
          );
        })}
        <div className="upload-button" onClick={click}>
          <input
            type="file"
            name="image"
            accept={FILE}
            multiple
            onChange={drop}
            ref={input}
          />
          <i ref={addImageIcon}>
            <BiImageAdd />
          </i>
        </div>
      </div>
      <div
        className="dropzone"
        ref={dropzone}
        onDragLeave={dragleave}
        onDrop={drop}
      ></div>
    </div>
  );
}

export default PhotoUpload;
