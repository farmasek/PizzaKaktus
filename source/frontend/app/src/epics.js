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
  updatePizzaEpic,
  fetchPizzaAfterPaginationChange,
} from './containers/PizzaContainer/actions';
import {
  fetchOrderListEpic,
  fetchOrdersAfterPaginationChange,
  changeTimePaginationEpic,
} from './containers/OrderContainer/actions';
import {
  fetchUserListEpic,
  saveUserListEpic,
  updateUserEpic,
} from './containers/UserContainer/actions';
import {
  deleteUserEpic,
} from './containers/UserContainer/actions';
import {
  fetchMenuEpic,
} from './containers/MenuContainer/actions';
import {
  showAddedNotification,
  showRemovePizzaNotification,
  sendOrderEpic,
  prefillByEmailEpic,
} from './containers/ShoppingCartDetail/actions';
import {
  loginEpic,
  logoutEpic,
} from './containers/LoginContainer/actions';

export default combineEpics(
  fetchIngredientListEpic,
  saveIngredientListEpic,
  fetchPizzaListEpic,
  savePizzaListEpic,
  updatePizzaEpic,
  fetchCategoryListEpic,
  saveCategoryListEpic,
  fetchUserListEpic,
  saveUserListEpic,
  updateUserEpic,
  deleteUserEpic,
  fetchPizzaAfterPaginationChange,
  fetchMenuEpic,
  showAddedNotification,
  showRemovePizzaNotification,
  sendOrderEpic,
  fetchOrderListEpic,
  fetchOrdersAfterPaginationChange,
  prefillByEmailEpic,
  changeTimePaginationEpic,
  loginEpic,
  logoutEpic,
);
