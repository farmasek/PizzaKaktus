import IngredientContainer from '../index';
import IngredientList from '../../../components/IngredientList'
import { Provider } from 'react-redux';
import { expect } from 'chai';
import React from 'react';
import thunk from 'redux-thunk';
import { mount, shallow } from 'enzyme';
import { List, fromJS } from 'immutable'
import events from 'events';

import configureMockStore from 'redux-mock-store';


const mockStore = configureMockStore([thunk]);


describe('INGREDIENT CONTAINER', () => {

  let store, component;

  const storeToMock = {
    ingredientContainer: {
      isLoading: false,
      ingredients: new List(),
      ingredientForm: fromJS({
        name: '',
        weight: null,
        cost: null,
        customCost: null,
      }),
    }
  }
  const storeToMockIsLoading = {
    ingredientContainer: {
      isLoading: true,
      ingredients: new List(),
      ingredientForm: fromJS({
        name: '',
        weight: null,
        cost: null,
        customCost: null,
      }),
    }
  }


  it('should render Ingredient list if not loading', () => {
    store = mockStore(storeToMock);
    component = shallow(<IngredientContainer store={store}/>).shallow();
    expect(component.contains(<IngredientList ingredients={new List()}/>)).to.be.equal(true);
  });

  it('should not render Ingredient list if loading', () => {
    store = mockStore(storeToMockIsLoading);
    component = shallow(<IngredientContainer store={store}/>).shallow();
    expect(component.contains(<IngredientList ingredients={new List()}/>)).to.be.equal(false);
  });

});
