from langchain_community.vectorstores.pgvector import PGVector
from django.conf import settings

CONNECTION_STRING = PGVector.connection_string_from_db_params(
    driver="psycopg2",
    host=settings.DATABASES["default"]["HOST"],
    port=settings.DATABASES["default"]["PORT"],
    database=settings.DATABASES["default"]["NAME"],
    user=settings.DATABASES["default"]["USER"],
    password=settings.DATABASES["default"]["PASSWORD"],
)