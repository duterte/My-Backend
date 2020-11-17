function Picture({ meta }) {
  const { imageProps, id } = meta;
  return (
    <div className="picture" id={id ? id : undefined}>
      <img src={imageProps.url} alt={imageProps.name} />
      <div className="caption">
        <span>{imageProps.name}</span>
      </div>
    </div>
  );
}

function Slider({ meta }) {
  const { imageProps } = meta;

  if (imageProps.length === 1) {
    return [<Picture key={0} meta={{ imageProps: imageProps[0] }} />];
  } else {
    return [
      <Picture
        key={0}
        meta={{ imageProps: imageProps[imageProps.length - 1], id: 'last' }}
      />,
      ...imageProps.map((imageProp, i) => (
        <Picture key={i + 1} meta={{ imageProps: imageProp }} />
      )),
      <Picture
        key={imageProps.length + 1}
        meta={{ imageProps: imageProps[0], id: 'first' }}
      />,
    ];
  }
}

export default Slider;
