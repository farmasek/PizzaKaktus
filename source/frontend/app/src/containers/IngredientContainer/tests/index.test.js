// import IngredientContainer from '../index';
// import IngredientList from '../../../components/IngredientList'
// import { Provider } from 'react-redux';
// import store, { history } from '../../../store';
// import expect from 'expect';
// import { shallow } from 'enzyme';
// import React from 'react';
//
// function setup() {
//   const props = {
//     isLoading: false,
//   };
//   const wrapper = shallow(
//     <Provider store={store}>
//     <IngredientContainer isLoading={props.isLoading} />
//     </Provider>
//   );
//   return {
//     props,
//     wrapper,
//   };
// }
//
// describe('INGREDIENT CONTAINER', () => {
//   it('it should not render table while loading', () => {
//     const {
//       wrapper,
//     } = setup();
//     expect(
//       wrapper.contains(
//         <IngredientList/>
//       )
//     ).toBe(true);
//   });
// });
