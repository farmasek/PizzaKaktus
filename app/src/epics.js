/**
 * Created by Farmas on 21.10.2016.
 */
import { combineEpics } from 'redux-observable';
import {
  fetchIngredientListEpic,
  saveIngredientListEpic,
} from './containers/IngredientContainer/actions';
import {
  fetchCategoryListEpic,
  saveCategoryListEpic,
} from './containers/CategoryContainer/actions';
import {
  fetchPizzaListEpic,
  savePizzaListEpic,
} from './containers/PizzaContainer/actions';
import {
  fetchUserListEpic,
  saveUserListEpic,
  updateUserEpic,
} from './containers/UserContainer/actions';
import {
  saveUserRegistrationEpic,
} from './containers/RegistrationContainer/actions';

export default combineEpics(
  fetchIngredientListEpic,
  saveIngredientListEpic,
  fetchPizzaListEpic,
  savePizzaListEpic,
  fetchCategoryListEpic,
  saveCategoryListEpic,
  fetchUserListEpic,
  saveUserListEpic,
  saveUserRegistrationEpic,
  updateUserEpic,
);
