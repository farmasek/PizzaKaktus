import { Record } from 'immutable';

export const Pizza = new Record({
  id: null,
  title: '',
  category: null,
  ingredients: {},
  active: false,
});

export const mapPizza = (pizza) => new Pizza({
  id: pizza.id,
  title: pizza.title,
  category: pizza.category,
  ingredients: pizza.ingredients,
  active: pizza.active,
});

export const mapPizzaData = (id, title, category, ingredients, active) => new Pizza({
  id,
  title,
  category,
  ingredients,
  active,
});
