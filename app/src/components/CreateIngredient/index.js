import React, { PropTypes } from 'react';

import styles from './index.module.scss';
import cssModules from 'react-css-modules';

const CreateIngredient = () => (
  <div className={styles.createIngredient}>
  </div>
);

CreateIngredient.propTypes = {
  ingredientProp: PropTypes.any,
};

export default cssModules(CreateIngredient, styles);
