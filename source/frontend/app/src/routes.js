import React from 'react';
import {
  Router,
  Route,
  IndexRoute,
} from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';
/* eslint-disable */
import App from 'containers/AppContainer';
import * as Pages from './pages';
import { isLoggedIn } from './network';

const requireAuth = (nextState, replace) => {
  if (!isLoggedIn()) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

const routes = (
  <Provider store={store}>
    <Router
      history={history} // Scroll to top on route transitions
      onUpdate={() => window.scrollTo(0, 0)} // eslint-disable-line
    >
      <Route path="/" component={App}>

        <IndexRoute component={Pages.MenuPage}/>
        <Route path="/manager/category" component={Pages.ManageCategoryPage} oEnter={requireAuth} />
        <Route path="/manager/ingredients" component={Pages.ManageIngredientsPage} oEnter={requireAuth} />
        <Route path="/manager/orders/history" component={Pages.ManageOrdersPage} oEnter={requireAuth} />
        <Route path="/manager/pizzas" component={Pages.ManagePizzasPage} oEnter={requireAuth} />
        <Route path="/manager/users" component={Pages.ManageUsersPage} oEnter={requireAuth} />

        <Route path="/cart" component={Pages.ShoppingCartPage}/>
        <Route path="/menu" component={Pages.MenuPage}/>

        <Route path="*" component={Pages.NotFoundPage}/>

      </Route>
    </Router>
  </Provider>
);
/* eslint-enable */

export default routes;
