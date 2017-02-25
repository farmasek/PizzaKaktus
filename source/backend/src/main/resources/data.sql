INSERT INTO role (id, role) VALUES (0,'ADMIN') ON CONFLICT (id) DO NOTHING;
INSERT INTO role (id, role) VALUES (1,'EMPLOYEE') ON CONFLICT (id) DO NOTHING;

INSERT INTO ingredient_db (id, amount, cost, cost_custom, name) VALUES (1, '10 g', 5.00, 10.00, 'tomatový základ') ON CONFLICT (id) DO NOTHING;
INSERT INTO ingredient_db (id, amount, cost, cost_custom, name) VALUES (2, '10 g', 8.00, 15.00, 'smetanový základ') ON CONFLICT (id) DO NOTHING;
INSERT INTO ingredient_db (id, amount, cost, cost_custom, name) VALUES (3, '25 g', 15.00, 20.00, 'šunka') ON CONFLICT (id) DO NOTHING;
INSERT INTO ingredient_db (id, amount, cost, cost_custom, name) VALUES (4, '20 g', 15.00, 20.00, 'eidam') ON CONFLICT (id) DO NOTHING;
INSERT INTO ingredient_db (id, amount, cost, cost_custom, name) VALUES (5, '10 g', 20.00, 25.00, 'niva') ON CONFLICT (id) DO NOTHING;
INSERT INTO ingredient_db (id, amount, cost, cost_custom, name) VALUES (6, '15 g', 20.00, 25.00, 'ementál') ON CONFLICT (id) DO NOTHING;
INSERT INTO ingredient_db (id, amount, cost, cost_custom, name) VALUES (8, '20 g', 20.00, 25.00, 'ananas') ON CONFLICT (id) DO NOTHING;
INSERT INTO ingredient_db (id, amount, cost, cost_custom, name) VALUES (7, '10 g', 10.00, 15.00, 'pórek') ON CONFLICT (id) DO NOTHING;
INSERT INTO ingredient_db (id, amount, cost, cost_custom, name) VALUES (9, '10 g', 10.00, 15.00, 'cibule') ON CONFLICT (id) DO NOTHING;

INSERT INTO category_db (id, name) VALUES (1, 'Vegetariánské') ON CONFLICT (id) DO NOTHING;
INSERT INTO category_db (id, name) VALUES (2, 'Masové') ON CONFLICT (id) DO NOTHING;
INSERT INTO category_db (id, name) VALUES (3, 'Sýrové') ON CONFLICT (id) DO NOTHING;
INSERT INTO category_db (id, name) VALUES (4, 'Speciální') ON CONFLICT (id) DO NOTHING;

INSERT INTO pizza_db(id, active, price, title, category_id)	VALUES (1, true, 120.00, 'Šunková', 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO pizza_db(id, active, price, title, category_id)	VALUES (2, true, 139.00, 'Tři sýry', 3) ON CONFLICT (id) DO NOTHING;

INSERT INTO pizza_db_ingredients(pizza_db_id, ingredients_id)	VALUES (1, 1);
INSERT INTO pizza_db_ingredients(pizza_db_id, ingredients_id)	VALUES (1, 3);
INSERT INTO pizza_db_ingredients(pizza_db_id, ingredients_id)	VALUES (1, 4);
INSERT INTO pizza_db_ingredients(pizza_db_id, ingredients_id)	VALUES (2, 2);
INSERT INTO pizza_db_ingredients(pizza_db_id, ingredients_id)	VALUES (2, 4);
INSERT INTO pizza_db_ingredients(pizza_db_id, ingredients_id)	VALUES (2, 5);
INSERT INTO pizza_db_ingredients(pizza_db_id, ingredients_id)	VALUES (2, 6);

INSERT INTO customer_db(id, name, surname, phone, email, street, city, zip)
VALUES (1, 'Martina', 'Svobodná', '+420730256325', 'martina.svobodna@centrum.cz', 'Varenská 17', 'Ostrava', '70200') ON CONFLICT (id) DO NOTHING;
INSERT INTO customer_db(id, name, surname, phone, email, street, city, zip)
VALUES (2, 'Jarek', 'Černý', '+420603589632', 'jarek969@seznam.cz', 'Dolejší 566/4', 'Ostrava', '70800') ON CONFLICT (id) DO NOTHING;
INSERT INTO customer_db(id, name, surname, phone, email, street, city, zip)
VALUES (3, 'Jakub', 'Marný', '+420733521456', 'jakubik@yahoo.cz', 'Horní 174', 'Ostrava', '70600') ON CONFLICT (id) DO NOTHING;
INSERT INTO customer_db(id, name, surname, phone, email, street, city, zip)
VALUES (4, 'Hana', 'Malá', '+420605265986', 'hana666@gmail.cz', 'Kubánská 12', 'Ostrava', '70800') ON CONFLICT (id) DO NOTHING;

INSERT INTO order_status (id, status) VALUES (1,'CREATED') ON CONFLICT (id) DO NOTHING;
INSERT INTO order_status (id, status) VALUES (2,'OPENED') ON CONFLICT (id) DO NOTHING;
INSERT INTO order_status (id, status) VALUES (3,'CLOSED') ON CONFLICT (id) DO NOTHING;
INSERT INTO order_status (id, status) VALUES (4,'CANCELLED') ON CONFLICT (id) DO NOTHING;

INSERT INTO order_db(id, date_created, date_modified, customer_id, order_status_id)
VALUES (1, TO_TIMESTAMP('2017-02-21 19:21:00.914000', 'YYYY-MM-DD HH24-MI-SS.FF'),
        TO_TIMESTAMP('2017-02-21 19:56:00.914000', 'YYYY-MM-DD HH24-MI-SS.FF'), 1, 3) ON CONFLICT (id) DO NOTHING;
INSERT INTO order_db(id, date_created, date_modified, customer_id, order_status_id)
VALUES (2, TO_TIMESTAMP('2017-02-21 19:46:00.914000', 'YYYY-MM-DD HH24-MI-SS.FF'),
        TO_TIMESTAMP('2017-02-21 19:46:00.914000', 'YYYY-MM-DD HH24-MI-SS.FF'), 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO order_db(id, date_created, date_modified, customer_id, order_status_id)
VALUES (3, TO_TIMESTAMP('2017-02-22 11:10:00.914000', 'YYYY-MM-DD HH24-MI-SS.FF'),
        TO_TIMESTAMP('2017-02-22 11:10:00.914000', 'YYYY-MM-DD HH24-MI-SS.FF'), 1, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO order_db(id, date_created, date_modified, customer_id, order_status_id)
VALUES (4, TO_TIMESTAMP('2017-02-23 10:45:00.914000', 'YYYY-MM-DD HH24-MI-SS.FF'),
        TO_TIMESTAMP('2017-02-23 10:45:00.914000', 'YYYY-MM-DD HH24-MI-SS.FF'), 4, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO order_db(id, date_created, date_modified, customer_id, order_status_id)
VALUES (5, TO_TIMESTAMP('2017-02-23 12:25:00.914000', 'YYYY-MM-DD HH24-MI-SS.FF'),
        TO_TIMESTAMP('2017-02-23 12:25:00.914000', 'YYYY-MM-DD HH24-MI-SS.FF'), 3, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO order_db(id, date_created, date_modified, customer_id, order_status_id)
VALUES (6, TO_TIMESTAMP('2017-02-23 14:45:00.914000', 'YYYY-MM-DD HH24-MI-SS.FF'),
        TO_TIMESTAMP('2017-02-23 14:45:00.914000', 'YYYY-MM-DD HH24-MI-SS.FF'), 2, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO order_db(id, date_created, date_modified, customer_id, order_status_id)
VALUES (7, TO_TIMESTAMP('2017-02-23 18:20:00.914000', 'YYYY-MM-DD HH24-MI-SS.FF'),
        TO_TIMESTAMP('2017-02-23 18:20:00.914000', 'YYYY-MM-DD HH24-MI-SS.FF'), 4, 1) ON CONFLICT (id) DO NOTHING;

INSERT INTO order_db_pizzas_ids(order_db_id, pizzas_ids) VALUES (1, 1);
INSERT INTO order_db_pizzas_ids(order_db_id, pizzas_ids) VALUES (1, 2);
INSERT INTO order_db_pizzas_ids(order_db_id, pizzas_ids) VALUES (2, 2);
INSERT INTO order_db_pizzas_ids(order_db_id, pizzas_ids) VALUES (2, 1);
INSERT INTO order_db_pizzas_ids(order_db_id, pizzas_ids) VALUES (3, 2);
INSERT INTO order_db_pizzas_ids(order_db_id, pizzas_ids) VALUES (3, 1);
INSERT INTO order_db_pizzas_ids(order_db_id, pizzas_ids) VALUES (3, 2);
INSERT INTO order_db_pizzas_ids(order_db_id, pizzas_ids) VALUES (4, 1);
INSERT INTO order_db_pizzas_ids(order_db_id, pizzas_ids) VALUES (5, 2);
INSERT INTO order_db_pizzas_ids(order_db_id, pizzas_ids) VALUES (6, 2);
INSERT INTO order_db_pizzas_ids(order_db_id, pizzas_ids) VALUES (7, 2);
INSERT INTO order_db_pizzas_ids(order_db_id, pizzas_ids) VALUES (7, 1);