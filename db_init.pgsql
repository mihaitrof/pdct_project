--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.2
-- Dumped by pg_dump version 9.6.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: balance_due; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE balance_due (
    contract_id integer,
    creditors character varying(50),
    balance_due character varying(50),
    account_number character varying(50),
    checked_date date,
    informants character varying(50),
    signature character varying(50)
);


ALTER TABLE balance_due OWNER TO postgres;

--
-- Name: body; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE body (
    body_id integer NOT NULL,
    side_member boolean,
    crossbeam boolean,
    floor boolean,
    wheel_arch boolean,
    other boolean,
    declaration_id integer NOT NULL
);


ALTER TABLE body OWNER TO postgres;

--
-- Name: braking_system; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE braking_system (
    braking_system_id integer NOT NULL,
    service_brake_front boolean,
    service_brake_back boolean,
    service_brake_movement boolean,
    brake_hose boolean,
    battery boolean,
    other boolean,
    declaration_id integer NOT NULL
);


ALTER TABLE braking_system OWNER TO postgres;

--
-- Name: buyer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE buyer (
    contract_id integer,
    date date,
    city character varying(50),
    representative character varying(50)
);


ALTER TABLE buyer OWNER TO postgres;

--
-- Name: car_condition; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE car_condition (
    car_condition_id integer NOT NULL,
    coupling character varying(45),
    gearbox character varying(45),
    end_gear character varying(45),
    heating character varying(45),
    battery character varying(45),
    starter character varying(45),
    generator character varying(45),
    engine character varying(45),
    ignition character varying(45),
    compression character varying(45),
    noise character varying(45),
    fuel character varying(45),
    cooling character varying(45),
    air_conditioning character varying(45),
    varnish character varying(45),
    other character varying(45),
    total_repair_cost character varying(45),
    declaration_id integer NOT NULL,
    tires_id integer NOT NULL
);


ALTER TABLE car_condition OWNER TO postgres;

--
-- Name: car_parts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE car_parts (
    car_parts_id integer NOT NULL,
    months_number integer,
    km integer,
    warranty_type character varying(45)
);


ALTER TABLE car_parts OWNER TO postgres;

--
-- Name: communication; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE communication (
    communication_id integer NOT NULL,
    windscreen_wiper boolean,
    windscreen_washer boolean,
    rearview_mirror boolean,
    headlight_setting boolean,
    headlamp_1 boolean,
    headlamp_2 boolean,
    signal_device boolean,
    side_marker boolean,
    headlight_front boolean,
    headlight_back boolean,
    direction_indicator boolean,
    stop_lamps boolean,
    reflex boolean,
    other boolean,
    declaration_id integer NOT NULL
);


ALTER TABLE communication OWNER TO postgres;

--
-- Name: contract_ids; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE contract_ids (
    contract_id integer NOT NULL
);


ALTER TABLE contract_ids OWNER TO postgres;

--
-- Name: control_system; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE control_system (
    control_system_id integer NOT NULL,
    articulation_joint boolean,
    steering_gear boolean,
    track_control_arm boolean,
    other boolean,
    declaration_id integer NOT NULL
);


ALTER TABLE control_system OWNER TO postgres;

--
-- Name: declaration; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE declaration (
    declaration_id integer NOT NULL,
    contract_id integer NOT NULL
);


ALTER TABLE declaration OWNER TO postgres;

--
-- Name: drive; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE drive (
    drive_id integer NOT NULL,
    fuel boolean,
    exhaust boolean,
    transmission boolean,
    universal_joint boolean,
    power_supply boolean,
    battery boolean,
    declaration_id integer NOT NULL
);


ALTER TABLE drive OWNER TO postgres;

--
-- Name: engine_output; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE engine_output (
    engine_output_id integer NOT NULL,
    kw integer,
    hkr character varying(45)
);


ALTER TABLE engine_output OWNER TO postgres;

--
-- Name: environment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE environment (
    environment_id integer NOT NULL,
    purification boolean,
    emission_control boolean,
    exhaust boolean,
    declaration_id integer NOT NULL
);


ALTER TABLE environment OWNER TO postgres;

--
-- Name: facilities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE facilities (
    facilities_id integer NOT NULL,
    coupling boolean,
    trailer_contact boolean,
    other boolean,
    declaration_id integer NOT NULL
);


ALTER TABLE facilities OWNER TO postgres;

--
-- Name: general_info; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE general_info (
    type character varying(45),
    manufacture_date character varying,
    mileage integer,
    registration_number character varying(45),
    fuel character varying(45),
    gearbox character varying(45),
    repair_property boolean,
    car_safety_id integer,
    notes character varying(255),
    created date,
    declaration_id integer NOT NULL,
    engine_output_id integer NOT NULL
);


ALTER TABLE general_info OWNER TO postgres;

--
-- Name: karosseri; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE karosseri (
    karosseri_id integer NOT NULL,
    door boolean,
    screen boolean,
    windshield boolean,
    seat_belts boolean,
    loading_space boolean,
    other boolean,
    declaration_id integer NOT NULL
);


ALTER TABLE karosseri OWNER TO postgres;

--
-- Name: latest_inspection; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE latest_inspection (
    latest_inspection_id integer NOT NULL,
    date date,
    mileage integer
);


ALTER TABLE latest_inspection OWNER TO postgres;

--
-- Name: mrf; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE mrf (
    mrf_id integer NOT NULL,
    months_number integer,
    km integer
);


ALTER TABLE mrf OWNER TO postgres;

--
-- Name: orchestration; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE orchestration (
    orchestration_id integer NOT NULL,
    speedometer boolean,
    other boolean,
    declaration_id integer NOT NULL
);


ALTER TABLE orchestration OWNER TO postgres;

--
-- Name: other_warranty; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE other_warranty (
    other_warranty_id integer NOT NULL,
    months_number integer,
    km integer
);


ALTER TABLE other_warranty OWNER TO postgres;

--
-- Name: purchase_agreement; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE purchase_agreement (
    contract_id integer,
    agreement_number character varying(50),
    seller_or_buyer character varying(50),
    phone character varying(50),
    purchase_date date
);


ALTER TABLE purchase_agreement OWNER TO postgres;

--
-- Name: purchase_property; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE purchase_property (
    contract_id integer,
    registration_property character varying(255),
    brand_model character varying(50),
    chassis_numer character varying(50),
    mileage integer,
    valuation integer,
    first_registration_date date,
    manufactured_date date,
    colour character varying(50),
    valuation_date date,
    deduction character varying(255),
    approved_check character varying(255),
    service_book character varying(255),
    warranty character varying(255),
    purchase_price_adjusted integer,
    condition_and_notes character varying(255)
);


ALTER TABLE purchase_property OWNER TO postgres;

--
-- Name: regulation_purchase; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE regulation_purchase (
    contract_id integer,
    purchase_price integer,
    vat integer,
    resolves_the_redemption_of_my_residual_debt character varying(255),
    other_deductions character varying(255),
    other_payments character varying(255),
    to_obtain character varying(255)
);


ALTER TABLE regulation_purchase OWNER TO postgres;

--
-- Name: seller; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE seller (
    contract_id integer,
    name character varying(50),
    address character varying(255),
    phone character varying(50),
    driver_name character varying(50),
    driver_phone character varying(50),
    personal_number character varying(50),
    driver_license_number character varying(255),
    postal_code character varying(50),
    email character varying(50)
);


ALTER TABLE seller OWNER TO postgres;

--
-- Name: seller_or_registred_owner; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE seller_or_registred_owner (
    contract_id integer,
    date date,
    city character varying(50),
    representative character varying(50)
);


ALTER TABLE seller_or_registred_owner OWNER TO postgres;

--
-- Name: timing_belt; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE timing_belt (
    timing_belt_id integer NOT NULL,
    changed character varying(45),
    annual_tax integer,
    service_box boolean,
    declaration_id integer NOT NULL,
    latest_inspection_id integer NOT NULL
);


ALTER TABLE timing_belt OWNER TO postgres;

--
-- Name: tires; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE tires (
    tires_id integer NOT NULL,
    vf character varying(45),
    hf character varying(45),
    vb character varying(45),
    hb character varying(45),
    res character varying(45),
    assessement character varying(45),
    rope_costs character varying(45)
);


ALTER TABLE tires OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE users (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    password text NOT NULL
);


ALTER TABLE users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: warrancy; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE warrancy (
    warrancy_id integer NOT NULL,
    bumper boolean NOT NULL,
    corrosion boolean NOT NULL,
    collision_damage boolean NOT NULL,
    exhaust_commitment character varying(45) NOT NULL,
    mrf_id integer NOT NULL,
    other_warranty_id integer NOT NULL,
    car_parts_id integer NOT NULL,
    declaration_id integer NOT NULL
);


ALTER TABLE warrancy OWNER TO postgres;

--
-- Name: wheel_system; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE wheel_system (
    wheel_system_id integer NOT NULL,
    deck boolean,
    shock boolean,
    bearings boolean,
    spindelled boolean,
    front_link_arm boolean,
    back_link_arm boolean,
    feather boolean,
    spring_bracket boolean,
    other boolean,
    declaration_id integer NOT NULL
);


ALTER TABLE wheel_system OWNER TO postgres;

--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Data for Name: balance_due; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY balance_due (contract_id, creditors, balance_due, account_number, checked_date, informants, signature) FROM stdin;
2	123	\N	\N	\N	\N	\N
48016	sdfsf	sdfsf	1233	2020-01-15	sdfsf	sdfsf
\.


--
-- Data for Name: body; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY body (body_id, side_member, crossbeam, floor, wheel_arch, other, declaration_id) FROM stdin;
48016	f	f	t	f	f	48016
16432	f	t	t	f	f	16432
\.


--
-- Data for Name: braking_system; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY braking_system (braking_system_id, service_brake_front, service_brake_back, service_brake_movement, brake_hose, battery, other, declaration_id) FROM stdin;
48016	t	f	f	f	f	t	48016
16432	t	t	t	f	f	f	16432
\.


--
-- Data for Name: buyer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY buyer (contract_id, date, city, representative) FROM stdin;
48016	2020-01-15	werwr	werwr
\.


--
-- Data for Name: car_condition; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY car_condition (car_condition_id, coupling, gearbox, end_gear, heating, battery, starter, generator, engine, ignition, compression, noise, fuel, cooling, air_conditioning, varnish, other, total_repair_cost, declaration_id, tires_id) FROM stdin;
48016	123 456	123 456	123 456	123 456	123 456	123 456	123 456	123 456	123 456	123 456	123 456	123 456	123 456	123 456	123 345	123 345	345345	48016	48016
16432	sdfsd fsdf	dfsd sdfs	fsdfsd fsdf	sdfsdf sdfs	sdfsdf sdfsdf	sdf sdfsdf	sdfsd fsdf	dfsdf sdfs	sdfsd fsdf	sdfs fsdfs	sdfs dfsdfsd	0	45345 3453sdf	3453 sdfs	sdfsdf sdf	asdasd asdad	dasd	16432	16432
\.


--
-- Data for Name: car_parts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY car_parts (car_parts_id, months_number, km, warranty_type) FROM stdin;
16432	123	123	\N
48016	3453	45345	\N
\.


--
-- Data for Name: communication; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY communication (communication_id, windscreen_wiper, windscreen_washer, rearview_mirror, headlight_setting, headlamp_1, headlamp_2, signal_device, side_marker, headlight_front, headlight_back, direction_indicator, stop_lamps, reflex, other, declaration_id) FROM stdin;
48016	f	f	f	f	f	f	f	f	f	t	f	f	f	f	48016
16432	f	f	f	t	f	f	f	f	f	f	f	f	f	f	16432
\.


--
-- Data for Name: contract_ids; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY contract_ids (contract_id) FROM stdin;
2
3
4
48016
\.


--
-- Data for Name: control_system; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY control_system (control_system_id, articulation_joint, steering_gear, track_control_arm, other, declaration_id) FROM stdin;
48016	t	f	f	f	48016
16432	t	t	f	f	16432
\.


--
-- Data for Name: declaration; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY declaration (declaration_id, contract_id) FROM stdin;
16432	16432
48016	48016
\.


--
-- Data for Name: drive; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY drive (drive_id, fuel, exhaust, transmission, universal_joint, power_supply, battery, declaration_id) FROM stdin;
48016	f	t	f	f	f	f	48016
16432	t	t	t	f	f	f	16432
\.


--
-- Data for Name: engine_output; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY engine_output (engine_output_id, kw, hkr) FROM stdin;
16432	123	true
48016	234234	true
\.


--
-- Data for Name: environment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY environment (environment_id, purification, emission_control, exhaust, declaration_id) FROM stdin;
48016	t	f	f	48016
16432	f	t	f	16432
\.


--
-- Data for Name: facilities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY facilities (facilities_id, coupling, trailer_contact, other, declaration_id) FROM stdin;
48016	t	f	f	48016
16432	f	f	t	16432
\.


--
-- Data for Name: general_info; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY general_info (type, manufacture_date, mileage, registration_number, fuel, gearbox, repair_property, car_safety_id, notes, created, declaration_id, engine_output_id) FROM stdin;
sdfsdf	2020-01-29	23423	423423	1	2	t	1	345345	2020-01-29	48016	48016
12312	2020-02-06	2341	12312	sdffd sdfs	1	t	1	345345	2020-02-13	16432	16432
\.


--
-- Data for Name: karosseri; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY karosseri (karosseri_id, door, screen, windshield, seat_belts, loading_space, other, declaration_id) FROM stdin;
48016	t	f	f	f	f	f	48016
16432	t	t	f	f	f	f	16432
\.


--
-- Data for Name: latest_inspection; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY latest_inspection (latest_inspection_id, date, mileage) FROM stdin;
48016	2020-01-29	345
16432	2020-01-01	0
\.


--
-- Data for Name: mrf; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY mrf (mrf_id, months_number, km) FROM stdin;
16432	123	\N
48016	3453	\N
\.


--
-- Data for Name: orchestration; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY orchestration (orchestration_id, speedometer, other, declaration_id) FROM stdin;
48016	t	f	48016
16432	f	t	16432
\.


--
-- Data for Name: other_warranty; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY other_warranty (other_warranty_id, months_number, km) FROM stdin;
16432	123	123
48016	345345	345345
\.


--
-- Data for Name: purchase_agreement; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY purchase_agreement (contract_id, agreement_number, seller_or_buyer, phone, purchase_date) FROM stdin;
48016	12313	asdad	123123123	2020-01-01
\.


--
-- Data for Name: purchase_property; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY purchase_property (contract_id, registration_property, brand_model, chassis_numer, mileage, valuation, first_registration_date, manufactured_date, colour, valuation_date, deduction, approved_check, service_book, warranty, purchase_price_adjusted, condition_and_notes) FROM stdin;
48016	12312313	\N	123	1234	1234	2020-01-09	2020-01-02	black	2020-01-09	2020-01-15	sdfsf	sdfsdf	1234	1234	sdfsf
\.


--
-- Data for Name: regulation_purchase; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY regulation_purchase (contract_id, purchase_price, vat, resolves_the_redemption_of_my_residual_debt, other_deductions, other_payments, to_obtain) FROM stdin;
48016	1234	1234	werwr	werwer	werwer	werwr
\.


--
-- Data for Name: seller; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY seller (contract_id, name, address, phone, driver_name, driver_phone, personal_number, driver_license_number, postal_code, email) FROM stdin;
48016	Vincent	Varagatan	123123123	sdasdad	\N	\N	\N	\N	\N
\.


--
-- Data for Name: seller_or_registred_owner; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY seller_or_registred_owner (contract_id, date, city, representative) FROM stdin;
48016	2020-01-11	werwr	werwr
\.


--
-- Data for Name: timing_belt; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY timing_belt (timing_belt_id, changed, annual_tax, service_box, declaration_id, latest_inspection_id) FROM stdin;
48016	true	345345	\N	48016	48016
16432	true	123	\N	16432	16432
\.


--
-- Data for Name: tires; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY tires (tires_id, vf, hf, vb, hb, res, assessement, rope_costs) FROM stdin;
48016	5	54		34	545	345	3453
16432	33	33	33	3	33	dasda	sda
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY users (id, email, password) FROM stdin;
1	dfgdg@dfgd.com	$2a$12$rawFRug1ec1PlQK60p8Unu6sMP4x/pV8p8zbcXGAaZLQVcpOUlF5O
2	sdfsdf@sdfs.com	$2a$12$eEdsaXdovoOXhwbA6c1DLuoXgYGypcS6wvoRB0Boznkv1gLwhT8jq
3	mihai@trofin.com	$2a$12$SSzyJvu9Sk6/VHX3l9YKf.r6HkFjlpWfuk1zAzFRdmRNfpXsf3qAW
4	asd@asd.com	password
5	 mihai@mihai.com	password
7	qwe@qwe.com	password
8	popa@popa.com	password
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('users_id_seq', 8, true);


--
-- Data for Name: warrancy; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY warrancy (warrancy_id, bumper, corrosion, collision_damage, exhaust_commitment, mrf_id, other_warranty_id, car_parts_id, declaration_id) FROM stdin;
48016	t	t	t	true	48016	48016	48016	48016
16432	t	t	f	true	16432	16432	16432	16432
\.


--
-- Data for Name: wheel_system; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY wheel_system (wheel_system_id, deck, shock, bearings, spindelled, front_link_arm, back_link_arm, feather, spring_bracket, other, declaration_id) FROM stdin;
48016	f	f	f	f	t	t	f	f	f	48016
16432	t	f	f	f	f	f	f	f	t	16432
\.


--
-- Name: body body_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY body
    ADD CONSTRAINT body_pkey PRIMARY KEY (body_id, declaration_id);


--
-- Name: braking_system braking_system_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY braking_system
    ADD CONSTRAINT braking_system_pkey PRIMARY KEY (braking_system_id, declaration_id);


--
-- Name: car_condition car_condition_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY car_condition
    ADD CONSTRAINT car_condition_pkey PRIMARY KEY (car_condition_id, declaration_id, tires_id);


--
-- Name: car_parts car_parts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY car_parts
    ADD CONSTRAINT car_parts_pkey PRIMARY KEY (car_parts_id);


--
-- Name: communication communication_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY communication
    ADD CONSTRAINT communication_pkey PRIMARY KEY (communication_id, declaration_id);


--
-- Name: contract_ids contract_ids_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY contract_ids
    ADD CONSTRAINT contract_ids_pkey PRIMARY KEY (contract_id);


--
-- Name: control_system control_system_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY control_system
    ADD CONSTRAINT control_system_pkey PRIMARY KEY (control_system_id, declaration_id);


--
-- Name: declaration declaration_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY declaration
    ADD CONSTRAINT declaration_pkey PRIMARY KEY (declaration_id);


--
-- Name: drive drive_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY drive
    ADD CONSTRAINT drive_pkey PRIMARY KEY (drive_id, declaration_id);


--
-- Name: engine_output engine_output_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY engine_output
    ADD CONSTRAINT engine_output_pkey PRIMARY KEY (engine_output_id);


--
-- Name: environment environment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY environment
    ADD CONSTRAINT environment_pkey PRIMARY KEY (environment_id, declaration_id);


--
-- Name: facilities facilities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY facilities
    ADD CONSTRAINT facilities_pkey PRIMARY KEY (facilities_id, declaration_id);


--
-- Name: general_info general_info_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY general_info
    ADD CONSTRAINT general_info_pkey PRIMARY KEY (declaration_id, engine_output_id);


--
-- Name: karosseri karosseri_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY karosseri
    ADD CONSTRAINT karosseri_pkey PRIMARY KEY (karosseri_id, declaration_id);


--
-- Name: latest_inspection latest_inspection_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY latest_inspection
    ADD CONSTRAINT latest_inspection_pkey PRIMARY KEY (latest_inspection_id);


--
-- Name: mrf mrf_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY mrf
    ADD CONSTRAINT mrf_pkey PRIMARY KEY (mrf_id);


--
-- Name: orchestration orchestration_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY orchestration
    ADD CONSTRAINT orchestration_pkey PRIMARY KEY (orchestration_id, declaration_id);


--
-- Name: other_warranty other_warranty_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY other_warranty
    ADD CONSTRAINT other_warranty_pkey PRIMARY KEY (other_warranty_id);


--
-- Name: timing_belt timing_belt_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY timing_belt
    ADD CONSTRAINT timing_belt_pkey PRIMARY KEY (timing_belt_id, declaration_id, latest_inspection_id);


--
-- Name: tires tires_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY tires
    ADD CONSTRAINT tires_pkey PRIMARY KEY (tires_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: warrancy warrancy_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY warrancy
    ADD CONSTRAINT warrancy_pkey PRIMARY KEY (warrancy_id, mrf_id, other_warranty_id, car_parts_id, declaration_id);


--
-- Name: balance_due balance_due_contract_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY balance_due
    ADD CONSTRAINT balance_due_contract_id_fkey FOREIGN KEY (contract_id) REFERENCES contract_ids(contract_id);


--
-- Name: buyer buyer_contract_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY buyer
    ADD CONSTRAINT buyer_contract_id_fkey FOREIGN KEY (contract_id) REFERENCES contract_ids(contract_id);


--
-- Name: body fk_body_declaration1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY body
    ADD CONSTRAINT fk_body_declaration1 FOREIGN KEY (declaration_id) REFERENCES declaration(declaration_id);


--
-- Name: braking_system fk_braking_system_declaration1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY braking_system
    ADD CONSTRAINT fk_braking_system_declaration1 FOREIGN KEY (declaration_id) REFERENCES declaration(declaration_id);


--
-- Name: car_condition fk_car_condition_declaration1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY car_condition
    ADD CONSTRAINT fk_car_condition_declaration1 FOREIGN KEY (declaration_id) REFERENCES declaration(declaration_id);


--
-- Name: car_condition fk_car_condition_tires1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY car_condition
    ADD CONSTRAINT fk_car_condition_tires1 FOREIGN KEY (tires_id) REFERENCES tires(tires_id);


--
-- Name: communication fk_communication_declaration1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY communication
    ADD CONSTRAINT fk_communication_declaration1 FOREIGN KEY (declaration_id) REFERENCES declaration(declaration_id);


--
-- Name: control_system fk_control_system_declaration1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY control_system
    ADD CONSTRAINT fk_control_system_declaration1 FOREIGN KEY (declaration_id) REFERENCES declaration(declaration_id);


--
-- Name: drive fk_drive_declaration1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY drive
    ADD CONSTRAINT fk_drive_declaration1 FOREIGN KEY (declaration_id) REFERENCES declaration(declaration_id);


--
-- Name: environment fk_environment_declaration1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY environment
    ADD CONSTRAINT fk_environment_declaration1 FOREIGN KEY (declaration_id) REFERENCES declaration(declaration_id);


--
-- Name: facilities fk_facilities_declaration1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY facilities
    ADD CONSTRAINT fk_facilities_declaration1 FOREIGN KEY (declaration_id) REFERENCES declaration(declaration_id);


--
-- Name: general_info fk_general_info_declaration; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY general_info
    ADD CONSTRAINT fk_general_info_declaration FOREIGN KEY (declaration_id) REFERENCES declaration(declaration_id);


--
-- Name: general_info fk_general_info_engine_output1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY general_info
    ADD CONSTRAINT fk_general_info_engine_output1 FOREIGN KEY (engine_output_id) REFERENCES engine_output(engine_output_id);


--
-- Name: karosseri fk_karosseri_declaration1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY karosseri
    ADD CONSTRAINT fk_karosseri_declaration1 FOREIGN KEY (declaration_id) REFERENCES declaration(declaration_id);


--
-- Name: orchestration fk_orchestration_declaration1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY orchestration
    ADD CONSTRAINT fk_orchestration_declaration1 FOREIGN KEY (declaration_id) REFERENCES declaration(declaration_id);


--
-- Name: timing_belt fk_timing_belt_declaration1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY timing_belt
    ADD CONSTRAINT fk_timing_belt_declaration1 FOREIGN KEY (declaration_id) REFERENCES declaration(declaration_id);


--
-- Name: timing_belt fk_timing_belt_latest_inspection1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY timing_belt
    ADD CONSTRAINT fk_timing_belt_latest_inspection1 FOREIGN KEY (latest_inspection_id) REFERENCES latest_inspection(latest_inspection_id);


--
-- Name: warrancy fk_warrancy_car_parts1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY warrancy
    ADD CONSTRAINT fk_warrancy_car_parts1 FOREIGN KEY (car_parts_id) REFERENCES car_parts(car_parts_id);


--
-- Name: warrancy fk_warrancy_declaration1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY warrancy
    ADD CONSTRAINT fk_warrancy_declaration1 FOREIGN KEY (declaration_id) REFERENCES declaration(declaration_id);


--
-- Name: warrancy fk_warrancy_mrf1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY warrancy
    ADD CONSTRAINT fk_warrancy_mrf1 FOREIGN KEY (mrf_id) REFERENCES mrf(mrf_id);


--
-- Name: warrancy fk_warrancy_other_warranty1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY warrancy
    ADD CONSTRAINT fk_warrancy_other_warranty1 FOREIGN KEY (other_warranty_id) REFERENCES other_warranty(other_warranty_id);


--
-- Name: purchase_agreement purchase_agreement_contract_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY purchase_agreement
    ADD CONSTRAINT purchase_agreement_contract_id_fkey FOREIGN KEY (contract_id) REFERENCES contract_ids(contract_id);


--
-- Name: purchase_property purchase_property_contract_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY purchase_property
    ADD CONSTRAINT purchase_property_contract_id_fkey FOREIGN KEY (contract_id) REFERENCES contract_ids(contract_id);


--
-- Name: regulation_purchase regulation_purchase_contract_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY regulation_purchase
    ADD CONSTRAINT regulation_purchase_contract_id_fkey FOREIGN KEY (contract_id) REFERENCES contract_ids(contract_id);


--
-- Name: seller seller_contract_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY seller
    ADD CONSTRAINT seller_contract_id_fkey FOREIGN KEY (contract_id) REFERENCES contract_ids(contract_id);


--
-- Name: seller_or_registred_owner seller_or_registred_owner_contract_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY seller_or_registred_owner
    ADD CONSTRAINT seller_or_registred_owner_contract_id_fkey FOREIGN KEY (contract_id) REFERENCES contract_ids(contract_id);


--
-- PostgreSQL database dump complete
--

