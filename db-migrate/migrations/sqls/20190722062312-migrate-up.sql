CREATE TABLE huts (
    id serial PRIMARY KEY,
    name text NOT NULL,
    nameEn text NOT NULL,
    admin text NOT NULL,
    url text NOT NULL,
    size integer NOT NULL,
    available boolean NOT NULL,
    rooms integer
);

