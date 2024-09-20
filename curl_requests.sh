curl 127.0.0.1:8000/api/v1/auth/register -XPOST -H'Content-Type: application/json' -d'{"email": "admin@email.com", "username": "Admin", "password": "123"}'
curl 127.0.0.1:8000/api/v1/auth/verify   -XPOST -H'Content-Type: application/json' -d'{"otp": "356966"}'
curl 127.0.0.1:8000/api/v1/auth/login    -XPOST -H'Content-Type: application/json' -d'{"email": "admin@email.com", "password": "123"}'

curl 127.0.0.1:8000/api/v1/auth/test -H'Authorization: Bearer ACCESS_TOKEN_FROM_AUTH'
curl 127.0.0.1:8000/api/v1/auth/test -H'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI2Nzc0NDU4LCJpYXQiOjE3MjY3NzQxNTgsImp0aSI6ImI4ODQ0NDMwODUyNjQ0ZTdiYWRkZTdkMDI1Y2UzZjlhIiwidXNlcl9pZCI6MX0.ECbBlViCrWFkMWbCQlw5PN9Et_E6dc95sUck-Ju4BQg'

curl 127.0.0.1:8000/api/v1/auth/password-reset/ -XPOST -d'{"email": "admin@email.com"}' -H'Content-Type: application/json'
curl 127.0.0.1:8000/api/v1/auth/set-new-password/ -XPATCH -d"password=123456AA&confirm_password=123456AA&uidb64=MQ&token=cdm8w2-a5a4bc0df28892c1ce2a5916773d88f4" -H"Content-Type: application/x-www-form-urlencoded"
