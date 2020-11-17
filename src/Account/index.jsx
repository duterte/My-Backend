import React, { Fragment } from 'react';
import PageTemplate from '../global-components/page-template';
import './index.css';
import LazyLoad from '../global-components/lazyload';
import { Stab } from '../global-components/cards';
import DummyPicture from '../resource-images/profile.jpg';

function Main() {
  return (
    <Fragment>
      <div className="grid-wrapper">
        <div className="profile-box">
          <figure>
            <img src={DummyPicture} alt="profile" />
            <span>German Ochea</span>
          </figure>
          <div className="center">Report</div>
          <div className="center">
            <button className="prim page-button primary">Contact Me</button>
          </div>
          <hr />
          <div className="space">
            From <b>Philippines</b>
          </div>
          <div className="space">
            Member since <b>April 2020</b>
          </div>
          <div className="space">
            Avg. Response Time <b>11 hours</b>
          </div>
          <hr />
          <h4>Description</h4>
          <p className="profile-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos porro
            harum unde a cupiditate aliquam, delectus error magnam illo quis
            iure earum assumenda minus, natus dolore quos ipsum. Ea minima sed
            eum excepturi aspernatur itaque, rem error provident aliquid
            voluptates? Pariatur animi quidem obcaecati recusandae laudantium
            totam minus expedita voluptatem!
          </p>
        </div>
      </div>
      <div className="stab-content">
        <Stab />
        <Stab />
        <Stab />
        <Stab />
        <Stab />
        <Stab />
      </div>
    </Fragment>
  );
}

function AccountPage() {
  return (
    <PageTemplate className="user-dashboard">
      <Main />
    </PageTemplate>
  );
}

export default LazyLoad(AccountPage);
