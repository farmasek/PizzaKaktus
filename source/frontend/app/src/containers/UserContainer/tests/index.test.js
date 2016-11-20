import UserContainer from '../index';
import UserList from '../../../components/UserList'
import { Provider } from 'react-redux';
import { expect } from 'chai';
import React from 'react';
import thunk from 'redux-thunk';
import { mount, shallow } from 'enzyme';
import { List, fromJS } from 'immutable'
import events from 'events';

import configureMockStore from 'redux-mock-store';


const mockStore = configureMockStore([thunk]);


describe('USER CONTAINER', () => {

  let store, component;

  const storeToMock = {
    userContainer: {
      loading: false,
      users: new List(),
      userForm: fromJS({
        firstName: '',
        lastName: '',
        password: '',
        login: '',
        roles: [],
        phone: '',
      }),
    }
  }
  const storeToMockIsLoading = {
    userContainer: {
      loading: false,
      users: new List(),
      userForm: fromJS({
        firstName: '',
        lastName: '',
        password: '',
        login: '',
        roles: [],
        phone: '',
      }),
    }
  }


  it('should render User list if not loading', () => {
    store = mockStore(storeToMock);
    component = shallow(<UserContainer store={store}/>).shallow();
    expect(component.contains(<UserList users={new List()}/>)).to.be.equal(true);
  });

  it('should not render User list if loading', () => {
    store = mockStore(storeToMockIsLoading);
    component = shallow(<UserContainer store={store}/>).shallow();
    expect(component.contains(<UserList users={new List()}/>)).to.be.equal(false);
  });

});
