import { Record } from 'immutable';

export const Category = new Record({
  id: null,
  name: '',
});

export const mapCategory = (category) => new Category({
  id: category.id,
  name: category.name,
});

export const mapCategoryData = (id, name) => new Category({
  id,
  name,
});
