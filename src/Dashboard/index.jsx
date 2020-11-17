import React from 'react';
import PageTemplate from '../global-components/page-template';
import LazyLoad from '../global-components/lazyload';

function Dashboard() {
  return (
    <PageTemplate>
      <h1>UsersDashboard</h1>
    </PageTemplate>
  );
}

export default LazyLoad(Dashboard);
