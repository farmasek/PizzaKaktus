insert into role (id, role) VALUES (0,'ADMIN') on conflict (id) do nothing;
insert into role (id, role) VALUES (1,'EMPLOYEE') on conflict (id) do nothing;

INSERT INTO ingredient_db (id, amount, cost, cost_custom, name) VALUES (1, '10 g', 5.00, 10.00, 'tomatový základ') on conflict (id) do nothing;
INSERT INTO ingredient_db (id, amount, cost, cost_custom, name) VALUES (2, '10 g', 8.00, 15.00, 'smetanový základ') on conflict (id) do nothing;
INSERT INTO ingredient_db (id, amount, cost, cost_custom, name) VALUES (3, '25 g', 15.00, 20.00, 'šunka') on conflict (id) do nothing;
INSERT INTO ingredient_db (id, amount, cost, cost_custom, name) VALUES (4, '20 g', 15.00, 20.00, 'eidam') on conflict (id) do nothing;
INSERT INTO ingredient_db (id, amount, cost, cost_custom, name) VALUES (5, '10 g', 20.00, 25.00, 'niva') on conflict (id) do nothing;
INSERT INTO ingredient_db (id, amount, cost, cost_custom, name) VALUES (6, '15 g', 20.00, 25.00, 'ementál') on conflict (id) do nothing;
INSERT INTO ingredient_db (id, amount, cost, cost_custom, name) VALUES (8, '20 g', 20.00, 25.00, 'ananas') on conflict (id) do nothing;
INSERT INTO ingredient_db (id, amount, cost, cost_custom, name) VALUES (7, '10 g', 10.00, 15.00, 'pórek') on conflict (id) do nothing;
INSERT INTO ingredient_db (id, amount, cost, cost_custom, name) VALUES (9, '10 g', 10.00, 15.00, 'cibule') on conflict (id) do nothing;

INSERT INTO category_db (id, name) VALUES (1, 'Vegetariánské') on conflict (id) do nothing;
INSERT INTO category_db (id, name) VALUES (2, 'Masové') on conflict (id) do nothing;
INSERT INTO category_db (id, name) VALUES (3, 'Sýrové') on conflict (id) do nothing;
INSERT INTO category_db (id, name) VALUES (4, 'Speciální') on conflict (id) do nothing;

INSERT INTO pizza_db(id, active, price, title, category_id)	VALUES (1, true, 120.00, 'Šunková', 2) on conflict (id) do nothing;
INSERT INTO pizza_db(id, active, price, title, category_id)	VALUES (2, true, 139.00, 'Tři sýry', 3) on conflict (id) do nothing;

INSERT INTO pizza_db_ingredients(pizza_db_id, ingredients_id)	VALUES (1, 1);
INSERT INTO pizza_db_ingredients(pizza_db_id, ingredients_id)	VALUES (1, 3);
INSERT INTO pizza_db_ingredients(pizza_db_id, ingredients_id)	VALUES (1, 4);
INSERT INTO pizza_db_ingredients(pizza_db_id, ingredients_id)	VALUES (2, 2);
INSERT INTO pizza_db_ingredients(pizza_db_id, ingredients_id)	VALUES (2, 4);
INSERT INTO pizza_db_ingredients(pizza_db_id, ingredients_id)	VALUES (2, 5);
INSERT INTO pizza_db_ingredients(pizza_db_id, ingredients_id)	VALUES (2, 6);