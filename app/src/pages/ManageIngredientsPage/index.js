import React from 'react';
import cssModules from 'react-css-modules';
import * as styles from './index.module.scss';
import IngredientContainer from '../../containers/IngredientContainer';
import CheckPermission from '../../containers/CheckPermission';

const ManageIngredientsPage = () => (

  <CheckPermission permissions={['ADMIN']} redirect>
    <div className={styles.container}>
      <IngredientContainer/>
    </div>
  </CheckPermission>
);

export default cssModules(ManageIngredientsPage, styles);
