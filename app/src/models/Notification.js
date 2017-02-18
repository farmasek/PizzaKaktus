import { fromJS } from 'immutable';

export const cNotification = {
  message: 'message',
  key: 'key',
  action: 'action',
  dismissAfter: 'dismissAfter',
};

export const Notification = () => fromJS({
  [cNotification.message]: '',
  [cNotification.key]: '',
  [cNotification.action]: 'Dismiss',
  [cNotification.dismissAfter]: 3400,
});

export const mapSrcToNotificationWithKey = ({ message, action, dismissAfter }, key) =>
  fromJS({
    message,
    key,
    action,
    dismissAfter,
  });
