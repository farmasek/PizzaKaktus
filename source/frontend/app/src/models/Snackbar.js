/**
 * Created by Mish.k.a on 3. 12. 2016.
 */
import { Record } from 'immutable';

export const Snackbar = new Record({
  showSnackbar: false,
  icon: '',
  label: '',
});

export const mapSnackbar = (showSnackbar, icon, label) => new Snackbar({
  showSnackbar,
  icon,
  label,
});
