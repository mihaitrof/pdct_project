--
-- PostgreSQL database dump
--

-- Dumped from database version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
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


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: balance_due; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.balance_due (
    contract_id integer,
    creditors character varying(50),
    balance_due character varying(50),
    account_number character varying(50),
    checked_date date,
    informants character varying(50),
    signature character varying(50)
);


ALTER TABLE public.balance_due OWNER TO postgres;

--
-- Name: buyer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.buyer (
    contract_id integer,
    date date,
    city character varying(50),
    representative character varying(50)
);


ALTER TABLE public.buyer OWNER TO postgres;

--
-- Name: contract_ids; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contract_ids (
    contract_id integer NOT NULL
);


ALTER TABLE public.contract_ids OWNER TO postgres;

--
-- Name: contract_ids_contract_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.contract_ids_contract_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.contract_ids_contract_id_seq OWNER TO postgres;

--
-- Name: contract_ids_contract_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.contract_ids_contract_id_seq OWNED BY public.contract_ids.contract_id;


--
-- Name: purchase_agreement; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.purchase_agreement (
    contract_id integer,
    agreement_number character varying(50),
    seller_or_buyer character varying(50),
    phone character varying(50),
    purchase_date date
);


ALTER TABLE public.purchase_agreement OWNER TO postgres;

--
-- Name: purchase_property; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.purchase_property (
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


ALTER TABLE public.purchase_property OWNER TO postgres;

--
-- Name: regulation_purchase; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.regulation_purchase (
    contract_id integer,
    purchase_price integer,
    vat integer,
    resolves_the_redemption_of_my_residual_debt character varying(255),
    other_deductions character varying(255),
    other_payments character varying(255),
    to_obtain character varying(255)
);


ALTER TABLE public.regulation_purchase OWNER TO postgres;

--
-- Name: seller; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.seller (
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


ALTER TABLE public.seller OWNER TO postgres;

--
-- Name: seller_or_registred_owner; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.seller_or_registred_owner (
    contract_id integer,
    date date,
    city character varying(50),
    representative character varying(50)
);


ALTER TABLE public.seller_or_registred_owner OWNER TO postgres;

--
-- Name: contract_ids contract_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contract_ids ALTER COLUMN contract_id SET DEFAULT nextval('public.contract_ids_contract_id_seq'::regclass);


--
-- Data for Name: balance_due; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.balance_due (contract_id, creditors, balance_due, account_number, checked_date, informants, signature) FROM stdin;
1	creditors	balance_due	account_number	2019-03-10	informatns	signature
2	123	\N	\N	\N	\N	\N
\.


--
-- Data for Name: buyer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.buyer (contract_id, date, city, representative) FROM stdin;
1	2019-03-10	Stockholm	Johnson
\.


--
-- Data for Name: contract_ids; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contract_ids (contract_id) FROM stdin;
1
2
3
4
\.


--
-- Data for Name: purchase_agreement; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.purchase_agreement (contract_id, agreement_number, seller_or_buyer, phone, purchase_date) FROM stdin;
1	1234	Paulsen	0757849585	2015-05-15
\.


--
-- Data for Name: purchase_property; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.purchase_property (contract_id, registration_property, brand_model, chassis_numer, mileage, valuation, first_registration_date, manufactured_date, colour, valuation_date, deduction, approved_check, service_book, warranty, purchase_price_adjusted, condition_and_notes) FROM stdin;
\.


--
-- Data for Name: regulation_purchase; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.regulation_purchase (contract_id, purchase_price, vat, resolves_the_redemption_of_my_residual_debt, other_deductions, other_payments, to_obtain) FROM stdin;
\.


--
-- Data for Name: seller; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.seller (contract_id, name, address, phone, driver_name, driver_phone, personal_number, driver_license_number, postal_code, email) FROM stdin;
\.


--
-- Data for Name: seller_or_registred_owner; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.seller_or_registred_owner (contract_id, date, city, representative) FROM stdin;
\.


--
-- Name: contract_ids_contract_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contract_ids_contract_id_seq', 1, false);


--
-- Name: contract_ids contract_ids_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contract_ids
    ADD CONSTRAINT contract_ids_pkey PRIMARY KEY (contract_id);


--
-- Name: balance_due balance_due_contract_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.balance_due
    ADD CONSTRAINT balance_due_contract_id_fkey FOREIGN KEY (contract_id) REFERENCES public.contract_ids(contract_id);


--
-- Name: buyer buyer_contract_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.buyer
    ADD CONSTRAINT buyer_contract_id_fkey FOREIGN KEY (contract_id) REFERENCES public.contract_ids(contract_id);


--
-- Name: purchase_agreement purchase_agreement_contract_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchase_agreement
    ADD CONSTRAINT purchase_agreement_contract_id_fkey FOREIGN KEY (contract_id) REFERENCES public.contract_ids(contract_id);


--
-- Name: purchase_property purchase_property_contract_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchase_property
    ADD CONSTRAINT purchase_property_contract_id_fkey FOREIGN KEY (contract_id) REFERENCES public.contract_ids(contract_id);


--
-- Name: regulation_purchase regulation_purchase_contract_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.regulation_purchase
    ADD CONSTRAINT regulation_purchase_contract_id_fkey FOREIGN KEY (contract_id) REFERENCES public.contract_ids(contract_id);


--
-- Name: seller seller_contract_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.seller
    ADD CONSTRAINT seller_contract_id_fkey FOREIGN KEY (contract_id) REFERENCES public.contract_ids(contract_id);


--
-- Name: seller_or_registred_owner seller_or_registred_owner_contract_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.seller_or_registred_owner
    ADD CONSTRAINT seller_or_registred_owner_contract_id_fkey FOREIGN KEY (contract_id) REFERENCES public.contract_ids(contract_id);


--
-- PostgreSQL database dump complete
--

