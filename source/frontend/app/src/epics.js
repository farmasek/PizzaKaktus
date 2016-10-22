/**
 * Created by Farmas on 21.10.2016.
 */
import { combineEpics } from 'redux-observable';
import { fetchIngredientListEpic } from './containers/IngredientContainer/actions';

export default combineEpics(
  fetchIngredientListEpic,
);
