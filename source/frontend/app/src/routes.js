import React from 'react';
import {
  Router,
  Route,
  IndexRoute
} from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';
/* eslint-disable */
import App from 'components/App';
import * as Pages from './pages';
import UserChanagePassword from './containers/UserChangePassword/index';
import { isAuthorized } from './network';
/* eslint-enable */

/*
 const requireAuth = (nextState, replace) => {
 if (!isAuthorized()) {
 replace({
 pathname: '/',
 state: { nextPathname: nextState.location.pathname },
 });
 }
 };
 */
const routes = (
  <Provider store={store}>
    <Router
      history={history} // Scroll to top on route transitions
      onUpdate={() => window.scrollTo(0, 0)} // eslint-disable-line
    >
      <Route path="/" component={App}>

        <IndexRoute component={Pages.LandingPage} />
        <Route path="/manager/category" component={Pages.ManageCategoryPage} />
        <Route path="/manager/ingredients" component={Pages.ManageIngredientsPage} />
        <Route path="/manager/orders/history" component={Pages.ManageOrdersPage} />
        <Route path="/manager/pizzas" component={Pages.ManagePizzasPage} />
        <Route path="/manager/users" component={Pages.ManageUsersPage} />
        <Route path="/manager/change-pw" component={UserChanagePassword} />

        <Route path="/cart" component={Pages.ShoppingCartPage} />
        <Route path="/menu" component={Pages.MenuPage} />

        <Route path="*" component={Pages.NotFoundPage} />

      </Route>
    </Router>
  </Provider>
);

export default routes;
