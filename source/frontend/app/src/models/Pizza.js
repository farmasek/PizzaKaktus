import { Record, Map, fromJS, List } from 'immutable';

export const Pizza = new Record({
  id: null,
  title: '',
  categoryId: null,
  ingredientsId: new List(),
  price: 0,
  active: false,
});

export const mapPizza = (pizza) => new Pizza({
  id: pizza.id,
  title: pizza.title,
  categoryId: pizza.categoryId,
  ingredientsId: fromJS(pizza.ingredientsId),
  price: pizza.price,
  active: pizza.active,
});

export const mapPizzaData = (id, title, categoryId, ingredientsId, price, active) => new Pizza({
  id,
  title,
  categoryId,
  ingredientsId: fromJS(ingredientsId),
  price,
  active,
});

export const mapPizzaForm = (pizza) => new Map({
  title: pizza.get('title'),
  categoryId: pizza.get('categoryId'),
  ingredientsId: fromJS(pizza.get('ingredientsId')),
  price: pizza.get('price'),
  active: true,
});
