/**
 * Created by Farmas on 21.10.2016.
 */
import { combineEpics } from 'redux-observable';
import {
  fetchIngredientListEpic,
  saveIngredientListEpic,
  updateIngredientEpic,
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
  fetchAllPizzasEpic,
} from './containers/PizzaContainer/actions';
import {
  fetchOrderListEpic,
  fetchOrdersAfterPaginationChange,
  changeTimePaginationEpic,
} from './containers/HistoryContainer/actions';
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
  changePizzaIngredientsNotifEpic,
} from './containers/ShoppingCartDetail/actions';
import {
  loginEpic,
  loggedInEpic,
  logoutEpic,
  userpwdConfirmChange,
  fetchMyselfEpic,
  logoutWindowsEpic,
} from './containers/LoginContainer/actions';
import {
  fetchOrdersEpic,
  changeOrderStatusesEpic,
} from './containers/OrderContainer/actions';

import {
  epicClearTheMessAfterMK,
  epicClearTheMessAfterMKRoutes,
  handleInvalidTokenEpic,
} from './containers/AppContainer/actions';

import {
  fetchStatsFieldsEpic,
  fetchStatsGraphEpic,
} from './containers/StatisticsContainer/actions';

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
  epicClearTheMessAfterMK,
  loggedInEpic,
  logoutEpic,
  userpwdConfirmChange,
  fetchMyselfEpic,
  logoutWindowsEpic,
  fetchOrdersEpic,
  epicClearTheMessAfterMKRoutes,
  changeOrderStatusesEpic,
  updateIngredientEpic,
  fetchStatsFieldsEpic,
  fetchStatsGraphEpic,
  changePizzaIngredientsNotifEpic,
  handleInvalidTokenEpic,
  fetchAllPizzasEpic,
);
