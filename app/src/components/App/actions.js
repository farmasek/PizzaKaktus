const GLOBAL_ACTION = 'GLOBAL_ACTION';

// globalAction :: None -> {Action}
export const removeNotification = (element) => ({
  type: 'NOTIF_REMOVE',
  element,
});
