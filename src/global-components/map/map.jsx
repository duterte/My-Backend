import React, { useEffect } from 'react';
import './map.css';

export function GeoLocation(props) {
  useEffect(() => {
    const { mapKey, children } = props;
    const domain = 'maps.googleapis.com';
    const source = 'maps/api/js?';
    const key = mapKey;
    const callback = 'initMap';
    const id = children.props.id;

    const googleapis = document.createElement('script');
    googleapis.src = `https://${domain}/${source}key=${key}&callback=${callback}`;
    googleapis.defer = true;
    googleapis.async = true;
    document.head.append(googleapis);

    const script = document.createElement('script');
    script.append(`
    function ${callback}() {
      new google.maps.Map(document.getElementById('${id}'), {
        center: { lat: 10.3157, lng: 123.8854 },
        zoom: 8,
        streetViewControl: false,
        mapTypeControl: false
      });
    }`);
    document.body.append(script);
  }, [props]);
  return props.children;
}

function Map(props) {
  return (
    <GeoLocation mapKey={props.googleapiskey}>
      <div id="map"></div>
    </GeoLocation>
  );
}

export default Map;
