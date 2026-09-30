import {showMessage} from 'react-native-flash-message';

import {colors} from '../theme';

type NotificationOptions = {
  description?: string;
  message: string;
};

export const notifications = {
  error({description, message}: NotificationOptions): void {
    showMessage({
      backgroundColor: colors.status.danger,
      color: colors.text.primary,
      description,
      duration: 4000,
      message,
      type: 'danger',
    });
  },

  success({description, message}: NotificationOptions): void {
    showMessage({
      backgroundColor: colors.status.success,
      color: colors.text.inverse,
      description,
      duration: 4000,
      message,
      type: 'success',
    });
  },
};
