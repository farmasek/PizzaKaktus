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

const rootReducer = combineReducers({
  // Apply all of the reducers here.
  featureComponent,
  ingredientContainer,
  pizzaContainer,
  categoryContainer,
  userContainer,
  menuContainer,
  routing: routerReducer,
  form: formReducer,
});

export default rootReducer;
