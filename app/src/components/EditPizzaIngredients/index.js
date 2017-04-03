import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Dialog from 'react-toolbox/lib/dialog';
import Checkbox from 'react-toolbox/lib/checkbox';
import cssModules from 'react-css-modules';
import * as styles from './index.module.scss';

class EditPizzaIngredients extends Component {

  render() {
    return (
      <div>
        <Dialog
          active={this.props.active}
          onEscKeyDown={() => this.props.toggleDialog()}
          onOverlayClick={() => this.props.toggleDialog()}
          title={'Zvolte ingredience'}
        >
          <ul className={styles.ingredientsList}>
            { this.props.ingredients.toIndexedSeq().map((ingredient) =>
              <li className={styles.ingredientItem} key={ingredient.get('id')}>
                {
                  this.props.cart.get(this.props.index)
                    ? <Checkbox
                      checked={(this.props.cart
                      .get(this.props.index)
                      .ingredientsIds
                      .indexOf(ingredient.get('id')) > -1)}
                      label={`${ingredient.get('name')} (${ingredient.get('cost')} Kč)`}
                      onChange={() =>
                        this.props.changePizzaIngredients(this.props.index, ingredient.get('id'))}
                    />
                    : null
                }
              </li>
            )}
          </ul>
        </Dialog>
      </div>
    );
  }

}

EditPizzaIngredients.propTypes = {
  index: PropTypes.number.isRequired,
  cart: ImmutablePropTypes.map.isRequired,
  ingredients: ImmutablePropTypes.map.isRequired,
  toggleDialog: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  changePizzaIngredients: PropTypes.func.isRequired,
};

export default cssModules(EditPizzaIngredients);
