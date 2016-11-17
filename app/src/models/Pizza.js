import { Record } from 'immutable';

export const Pizza = new Record({
  id: null,
  title: '',
  categoryId: null,
  ingredientsId: {},
  active: false,
});

export const mapPizza = (pizza) => new Pizza({
  id: pizza.id,
  title: pizza.title,
  categoryId: pizza.categoryId,
  ingredientsId: pizza.ingredientsId,
  active: pizza.active,
});

export const mapPizzaData = (id, title, categoryId, ingredientsId, active) => new Pizza({
  id,
  title,
  categoryId,
  ingredientsId,
  active,
});
