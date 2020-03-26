CREATE TABLE IF NOT EXISTS boards (
                id serial primary key,
                name text,
                createdby text,
                timestamp timestamptz default current_timestamp)       
