SELECT 'CREATE DATABASE django_backend_db;'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'django_backend_db')\gexec

CREATE USER django_backend_user WITH ENCRYPTED PASSWORD '123';
ALTER ROLE django_backend_user SET client_encoding TO 'utf8';
ALTER ROLE django_backend_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE django_backend_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE django_backend_db TO django_backend_user;
\c django_backend_db
GRANT ALL ON SCHEMA public TO django_backend_user;
