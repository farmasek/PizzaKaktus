insert into role (id,role) VALUES (0,'ADMIN') on conflict (id) do nothing;
insert into role (id,role) VALUES (1,'EMPLOYEE') on conflict (id) do nothing;
--
-- INSERT INTO ingredient_db (`amount`, `cost`, `cost_custom`, `name`) VALUES ("10 g", 5.00, 10.00, "tomatový základ");
-- INSERT INTO ingredient_db (`amount`, `cost`, `cost_custom`, `name`) VALUES ("10 g", 8.00, 15.00, "smetanový základ");
-- INSERT INTO ingredient_db (`amount`, `cost`, `cost_custom`, `name`) VALUES ("25 g", 15.00, 20.00, "šunka");
-- INSERT INTO ingredient_db (`amount`, `cost`, `cost_custom`, `name`) VALUES ("20 g", 15.00, 20.00, "eidam");
-- INSERT INTO ingredient_db (`amount`, `cost`, `cost_custom`, `name`) VALUES ("10 g", 20.00, 25.00, "niva");
-- INSERT INTO ingredient_db (`amount`, `cost`, `cost_custom`, `name`) VALUES ("15 g", 20.00, 25.00, "ementál");
-- INSERT INTO ingredient_db (`amount`, `cost`, `cost_custom`, `name`) VALUES ("20 g", 20.00, 25.00, "ananas");
-- INSERT INTO ingredient_db (`amount`, `cost`, `cost_custom`, `name`) VALUES ("10 g", 10.00, 15.00, "pórek");
-- INSERT INTO ingredient_db (`amount`, `cost`, `cost_custom`, `name`) VALUES ("10 g", 10.00, 15.00, "cibule");
--
-- INSERT INTO category_db (`name`) VALUES ("Vegetariánské");
-- INSERT INTO category_db (`name`) VALUES ("Masové");
-- INSERT INTO category_db (`name`) VALUES ("Sýrové");
-- INSERT INTO category_db (`name`) VALUES ("Speciální");