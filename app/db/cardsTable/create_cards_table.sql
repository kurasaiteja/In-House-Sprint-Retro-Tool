CREATE TABLE IF NOT EXISTS cards (
                id serial primary key,
                title text,
                votes int,
                votearray text[],
                boardid int,
                columnid int,
                createdby text,
                anon boolean,
                timestamp timestamptz default current_timestamp);
