/**
 * Created by Farmas on 21.10.2016.
 */
import { combineEpics } from 'redux-observable';
import {
  fetchIngredientListEpic,
  saveIngredientListEpic,
} from './containers/IngredientContainer/actions';
import {
  fetchUserListEpic,
  saveUserListEpic,
} from './containers/UserContainer/actions';
import {
  saveUserRegistrationEpic,
} from './containers/RegistrationContainer/actions';

export default combineEpics(
  fetchIngredientListEpic,
  saveIngredientListEpic,
  fetchUserListEpic,
  saveUserListEpic,
  saveUserRegistrationEpic,
);
