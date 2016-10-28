import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

// Import all of your reducers here:
import featureComponent from 'containers/FeatureFirstContainer/reducer';
import ingredientContainer from 'containers/IngredientContainer/reducer';
import userContainer from 'containers/UserContainer/reducer';
import registrationContainer from 'containers/RegistrationContainer/reducer';

const rootReducer = combineReducers({
  // Apply all of the reducers here.
  featureComponent,
  ingredientContainer,
  userContainer,
  registrationContainer,
  routing: routerReducer,
  form: formReducer,
});

export default rootReducer;
