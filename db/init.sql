--
-- PostgreSQL database dump
--


-- Dumped from database version 16.13
-- Dumped by pg_dump version 16.13

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: author; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.author (
    id_author integer NOT NULL,
    name character varying,
    lastname character varying,
    date_of_birth date,
    email character varying,
    phone_number character varying,
    username character varying,
    password character varying
);


--
-- Name: post; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.post (
    id_post integer NOT NULL,
    title character varying,
    date date,
    image character varying,
    text text,
    id_author integer
);


--
-- Name: post_id_post_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.post_id_post_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: post_id_post_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.post_id_post_seq OWNED BY public.post.id_post;


--
-- Name: session; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);


--
-- Name: post id_post; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post ALTER COLUMN id_post SET DEFAULT nextval('public.post_id_post_seq'::regclass);


--
-- Data for Name: author; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.author VALUES (1, 'Arístides', 'Nieto', '2000-01-01', 'admin@blogcafe.com', '5551234567', 'aristides', 'aristides');


--
-- Data for Name: post; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.post VALUES (1, 'Espresso', '2026-03-04', './src/assets/espresso.jpg', '30ml', 1);
INSERT INTO public.post VALUES (2, 'Cortado', '2026-03-04', './src/assets/cortado.png', '60ml', 1);
INSERT INTO public.post VALUES (3, 'Ristreto', '2026-03-04', './src/assets/ristrero.jpeg', '15-20ml', 1);
INSERT INTO public.post VALUES (4, 'flat-white', '2026-03-04', './src/assets/flat.png', '150ml', 1);
INSERT INTO public.post VALUES (5, 'Machiato', '2026-03-04', './src/assets/machiato.png', '35ml', 1);
INSERT INTO public.post VALUES (6, 'Latte', '2026-03-04', './src/assets/latte.jpg', '300ml', 1);
INSERT INTO public.post VALUES (7, 'Capuccino', '2026-03-04', './src/assets/capuccino.jpg', '180ml', 1);
INSERT INTO public.post VALUES (8, 'ColdBrew', '2026-03-04', './src/assets/coldbrew.jpg', '30ml', 1);
INSERT INTO public.post VALUES (9, 'Americano', '2026-03-04', './src/assets/americano.jpg', '30ml', 1);
INSERT INTO public.post VALUES (10, 'Affogato', '2026-03-04', './src/assets/affogato.jpeg', '30ml', 1);
INSERT INTO public.post VALUES (12, 'Prubea 5', '2000-02-20', './src/assets/uploads/WhatsApp Image 2026-03-17 at 12.22.48 PM.jpeg', 'quien sabe', 1);


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.session VALUES ('HafxmcsLLsQU8xiGAsYnFn09gP90czLS', '{"cookie":{"originalMaxAge":600000,"expires":"2026-04-24T16:40:38.825Z","secure":false,"httpOnly":true,"path":"/"},"id_author":1}', '2026-04-24 10:40:39');


--
-- Name: post_id_post_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.post_id_post_seq', 12, true);


--
-- Name: author author_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.author
    ADD CONSTRAINT author_pkey PRIMARY KEY (id_author);


--
-- Name: post post_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_pkey PRIMARY KEY (id_post);


--
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- Name: IDX_session_expire; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IDX_session_expire" ON public.session USING btree (expire);


--
-- Name: post post_id_author_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_id_author_fkey FOREIGN KEY (id_author) REFERENCES public.author(id_author);


--
-- PostgreSQL database dump complete
--


