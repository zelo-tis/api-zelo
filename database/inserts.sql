NSERT INTO zelo.bed (id, number, observation, station_id) VALUES (1, 1, null, 1);
INSERT INTO zelo.bed (id, number, observation, station_id) VALUES (2, 2, null, 1);
INSERT INTO zelo.bed (id, number, observation, station_id) VALUES (3, 3, null, 1);
INSERT INTO zelo.change_record (id, patient_id, responsible_user_id, prevision_date, treatment_id, status, completed_by_user_id, completed_at, created_at) VALUES (1, 2, null, '2020-05-02 23:05:00', 1, 'TODO', null, null, null);
INSERT INTO zelo.movement_frequency (id, frequency) VALUES (1, 2);
INSERT INTO zelo.movement_frequency (id, frequency) VALUES (2, 3);
INSERT INTO zelo.patient (id, name, attendance_number, braden, observation) VALUES (1, 'Flávio Cunha dos Santos', 1234512, 50, null);
INSERT INTO zelo.patient (id, name, attendance_number, braden, observation) VALUES (2, 'Gabriela Nolasco', 1234514, 60, null);
INSERT INTO zelo.patient (id, name, attendance_number, braden, observation) VALUES (3, 'Victor de Souza', 534413, 45, null);
INSERT INTO zelo.patient_hospitalization (id, patient_id, bed_id, start_date, end_date, observation, active) VALUES (1, 1, 1, '2020-02-25 17:56:56', null, null, 1);
INSERT INTO zelo.patient_hospitalization (id, patient_id, bed_id, start_date, end_date, observation, active) VALUES (2, 2, 2, '2020-03-25 20:10:31', null, null, 1);
INSERT INTO zelo.patient_monitoring (id, start_date, end_date, observation, active, patient_id, movement_frequency_id) VALUES (1, '2020-05-01 11:07:54', null, null, 1, 1, 1);
INSERT INTO zelo.patient_monitoring (id, start_date, end_date, observation, active, patient_id, movement_frequency_id) VALUES (2, '2020-05-02 20:08:23', null, null, 1, 2, 2);
INSERT INTO zelo.patient_restriction (patient_id, restriction_id) VALUES (1, 1);
INSERT INTO zelo.restriction (id, description, treatment_id) VALUES (1, null, 1);
INSERT INTO zelo.station (id, name, description) VALUES (1, 'Posto 1', null);
INSERT INTO zelo.treatment (id, name, description) VALUES (1, 'Decúbito Lateral Direito', null);
INSERT INTO zelo.treatment (id, name, description) VALUES (2, 'Decúbito Lateral Esquerdo', null);
INSERT INTO zelo.treatment (id, name, description) VALUES (3, 'Dorsal', null);
