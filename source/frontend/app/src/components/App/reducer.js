/**
 * Created by e-myslivost on 6.11.2016.
 */
import {
  fromJS,
  Map,
  List,
  Record,
  OrderedSet,
} from 'immutable';
import { mapSnackbar } from '../../models/Snackbar';
import {
  cNotification,
  Notification,
  mapSrcToNotificationWithKey
} from '../../models/Notification';

const InitialState = fromJS(
  {
    count: 0,
    notifications: OrderedSet(),
  }
);

const notificationReducer =
  (state = InitialState, action) => {
    switch (action.type) {
      case 'NOTIF_REMOVE': {
        const oldNotif = state.get('notifications');
        const newNotification = oldNotif.filter(n => n.key !== action.element.key)
        return state.set('notifications', newNotification);
      }
      case 'NOTIF_ADD': {
        const oldNotif = state.get('notifications');
        const newNotification = oldNotif.add(mapSrcToNotificationWithKey(action.notification, oldNotif.size).toJS())
        return state.set('notifications', newNotification).set('count', state.get('count') + 1);
      }
      default:
        return state;
    }
  };

export default notificationReducer;
