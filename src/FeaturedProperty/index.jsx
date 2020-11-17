import React, { Fragment } from 'react';
import './index.css';
import PageTemplate from '../global-components/page-template';
import Card from '../global-components/cards';
import LazyLoad from '../global-components/lazyload';

function FeaturedProperty() {
  return (
    <Fragment>
      <PageTemplate className="featuredproperty" search="true">
        <h1>Featured Properties</h1>
        <div className="content">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </PageTemplate>
    </Fragment>
  );
}

export default LazyLoad(FeaturedProperty);
