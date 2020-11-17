import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import About from './About';
import Listing from './Listing';
import FeaturedProperty from './FeaturedProperty';
import SubmitListing from './SubmitListing';
import Account from './Account';
import Dashboard from './Dashboard';
import Register from './Register';
import NotFound from './NotFound';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/listings">
          <Listing />
        </Route>
        <Route exact path="/featuredproperty">
          <FeaturedProperty />
        </Route>
        <Route exact path="/draft">
          <SubmitListing />
        </Route>
        <Route exact path="/account">
          <Account />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/index.php">
          <Home />
        </Route>
        <Route exact path="/index.html">
          <Home />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}
