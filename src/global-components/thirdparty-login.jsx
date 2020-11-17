import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

export function FBLogin() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v7.0&appId=711459533017360&autoLogAppEvents=1';
    script.asyc = true;
    script.defer = true;
    script.crossorigin = 'anonymmous';
    document.body.append(script);
    return function () {
      document.body.removeChild(script);
    };
  }, []);
  return ReactDOM.createPortal(<div id="fb-root"></div>, document.body);
}
