import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

// Import all of your reducers here:
import featureComponent from 'containers/FeatureFirstContainer/reducer';
import ingredientContainer from 'containers/IngredientContainer/reducer';
import pizzaContainer from 'containers/PizzaContainer/reducer';
import categoryContainer from 'containers/CategoryContainer/reducer';
import userContainer from 'containers/UserContainer/reducer';
import menuContainer from 'containers/MenuContainer/reducer';
import shoppingCartContainer from 'containers/ShoppingCartDetail/reducer';
import historyContainer from 'containers/HistoryContainer/reducer';
import notificationReducer from './containers/AppContainer/reducer';
import loginReducer from './containers/LoginContainer/reducer';
import orderContainer from 'containers/OrderContainer/reducer';
import statisticsReducer from 'containers/StatisticsContainer/reducer';

const rootReducer = combineReducers({
  // Apply all of the reducers here.
  featureComponent,
  ingredientContainer,
  pizzaContainer,
  categoryContainer,
  userContainer,
  menuContainer,
  shoppingCartContainer,
  notificationReducer,
  historyContainer,
  loginReducer,
  orderContainer,
  statisticsReducer,
  routing: routerReducer,
  form: formReducer,
});

export default rootReducer;
