import { Record, Map } from 'immutable';

export const DOUGH_PRICE = 80;

export const Ingredient = new Record({
  id: null,
  name: '',
  amount: '',
  cost: null,
  costCustom: null,
});

export const mapIngredient = (ingredient) => new Ingredient({
  id: ingredient.id,
  name: ingredient.name,
  amount: ingredient.amount,
  cost: ingredient.cost,
  costCustom: ingredient.costCustom,
});

export const mapIngredientData = (id, name, amount, cost, costCustom) => new Ingredient({
  id,
  name,
  amount,
  cost,
  costCustom,
});

export const mapIngredientForm = (ingredient) => new Map({
  id: ingredient.get('id'),
  name: ingredient.get('name'),
  amount: ingredient.get('amount'),
  cost: ingredient.get('cost'),
  costCustom: ingredient.get('costCustom'),
});
