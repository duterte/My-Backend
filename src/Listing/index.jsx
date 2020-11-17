import './index.css';
import PageTemplate from '../global-components/page-template';
import { Stab } from '../global-components/cards';
import LazyLoad from '../global-components/lazyload';

function Listings() {
  return (
    <PageTemplate className="list" search="true">
      <h1>New Listings</h1>
      <div className="left-ads"></div>
      <div className="stab-content">
        <Stab />
        <Stab />
        <Stab />
        <Stab />
        <Stab />
        <Stab />
      </div>
      <div className="right-ads"></div>
    </PageTemplate>
  );
}

export default LazyLoad(Listings);
