// Details of using lazyload image

// Step 1: <img> tag should have lazy classname
// Step 2: <img> tag should have data-src attr which
// value is set to the url of the image

import React, { Component } from 'react';

export default function LazyLoad(OriginalComponent) {
  class NewComponent extends Component {
    componentDidMount() {
      const element = document.createElement('script');
      element.append(
        `(function () {
          const images = document.querySelectorAll('img.lazy');
          const options = {
            root: null,
            rootMargin: '200px',
          };
          const observer = new IntersectionObserver(function (entries, observer) {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const target = entry.target;
                target.src = target.dataset.src;
                observer.unobserve(target);
              }
            });
          }, options);
          images.forEach((entries) => {
            observer.observe(entries);
          });
        })();`
      );
      document.body.append(element);
    }
    render() {
      return <OriginalComponent />;
    }
  }
  return NewComponent;
}
