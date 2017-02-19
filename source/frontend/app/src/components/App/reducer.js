/**
 * Created by e-myslivost on 6.11.2016.
 */
import {
  fromJS,
  OrderedSet,
} from 'immutable';
import {
  mapSrcToNotificationWithKey,
} from '../../models/Notification';

const InitialState = fromJS(
  {
    count: 0,
    notifications: new OrderedSet(),
  }
);

const notificationReducer =
  (state = InitialState, action) => {
    switch (action.type) {
      case 'NOTIF_REMOVE': {
        const oldNotif = state.get('notifications');
        const newNotification = oldNotif.filter(n => n.key !== action.element.key);
        return state.set('notifications', newNotification);
      }
      case 'NOTIF_ADD': {
        if (!action.notification.message) {
          return state;
        }
        const oldNotif = state.get('notifications');
        const newNotification =
          oldNotif.add(mapSrcToNotificationWithKey(action.notification, state.get('count')).toJS());
        return state.set('notifications', newNotification).set('count', state.get('count') + 1);
      }
      default:
        return state;
    }
  };

export default notificationReducer;
