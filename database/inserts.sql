INSERT INTO `language` (description) VALUES ('Portugês'), ('Espanho'), ('Inglês'), ('Italiano');
INSERT INTO project (description) VALUES ('TradOps');
INSERT INTO project_language (project_id, language_id) VALUES (1,1), (1,2);
INSERT INTO request (project_id, delivery_date, feature, description, info) VALUES (1, '2019-12-25 10:00:00', 'Feature', 'Description', 'Information');
INSERT INTO request_language (request_id, language_id) VALUES (1,1), (1,2);
INSERT INTO label (`key`, `text`, translated, request_id) VALUES ('key_1', 'Text 1', 0, 1), ('key_2', 'Text 2', 0, 1), ('key_3', 'Text 3', 0, 1);
INSERT INTO comments (`text`, request_id) VALUES ('Comment 1', 1), ('Comment 2', 1), ('Comment 3', 1);

