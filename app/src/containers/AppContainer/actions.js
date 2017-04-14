import { browserHistory } from 'react-router';
import { isLoggedIn } from '../../network';
// import { FETCH_MENU } from '../../containers/MenuContainer/constants';

export const removeNotification = (element) => ({
  type: 'NOTIF_REMOVE',
  element,
});
export const epicClearTheMessAfterMK = (action) =>
  action.ofType('NOTIF_ADD')
    .filter(a => a.notification.message
    === 'Full authentication is required to access this resource')
    .do(() => browserHistory.push('/'))
    .map(() => ({ type: 'USER_LOGOUT_CLEAR_EVERYTHING_FOREVER-_-' }));

export const epicClearTheMessAfterMKRoutes = (action) =>
  action.ofType('@@router/LOCATION_CHANGE')
    .filter(a => a.payload.pathname !== '/'
    && a.payload.pathname !== '/cart'
    && a.payload.pathname !== '/menu')
    .filter(() => !isLoggedIn())
    .switchMap(() => [
      { type: 'USER_LOGOUT_CLEAR_EVERYTHING_FOREVER-_-' },
      {
        type: `NOTIF_ADD`,
        notification: {
          message: 'Level 0 activated',
        },
      }]);

export const handleInvalidTokenEpic = (action) =>
  action.ofType('NOTIF_ADD').filter(() => false);
// .filter(a => a.notification.message && a.notification.message.includes('Invalid access token'))
// .do(() => {
//   removeToken();
//   browserHistory.push('/');
// })
// .switchMap(() => [
//   {
//     type: `NOTIF_ADD`,
//     notification: {
//       message: 'Platnost přihlášení vyprchala.',
//     },
//   },
//   {
//     type: 'USER_LOGOUT_CLEAR_EVERYTHING_FOREVER-_-',
//   },
//   {
//     type: FETCH_MENU,
//   },
// ]);
