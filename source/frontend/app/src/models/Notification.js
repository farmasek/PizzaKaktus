import { fromJS } from 'immutable';

export const cNotification = {
  message: 'message',
  key: 'key',
  action: 'action',
  dismissAfter: 'dismissAfter',
  barStyle: 'barStyle',
};

export const Notification = () => fromJS({
  [cNotification.message]: '',
  [cNotification.key]: '',
  [cNotification.action]: 'Dismiss',
  [cNotification.dismissAfter]: 3400,
});

export const mapSrcToNotificationWithKey =
  ({ message, action, dismissAfter = 3000, barStyle }, key) =>
    fromJS({
      message: cheatTheMessage(message.message || message),
      key,
      action,
      dismissAfter,
      barStyle,
    });
export const powerMessage = 'YOU HAVE NO POWER HERE!'
export const weekMessage = 'Full authentication is required to access this resource'

const cheatTheMessage = (mess) =>
  mess === weekMessage?
    powerMessage : mess;
