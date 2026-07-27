-- Run this in Supabase's SQL Editor (Project -> SQL Editor -> New query).
--
-- Matches app/db_models.py::ContactSubmission exactly. The app also creates
-- this table automatically on startup via SQLModel if it doesn't exist yet
-- (see app/db.py::init_db) -- running this manually is optional, not required.
-- If you ever rename a column here, update db_models.py to match, or vice versa.

create table if not exists contactsubmission (
    id serial primary key,
    name varchar(120) not null,
    email varchar(255) not null,
    message text not null,
    created_at timestamptz not null default now()
);
