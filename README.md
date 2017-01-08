# CRF
CRF for Biofarma [![Build Status](https://travis-ci.org/staticbass/koa-crf.svg?branch=master)](https://travis-ci.org/staticbass/koa-crf)

### Available requests
**Public:** <br/>
GET /api/users -> {payload: [Users]} <br>
POST /api/users {phone, password, role, name} -> {payload: User} <br>
DELETE /api/users/:id -> {payload: User} <br>
POST /login {phone, password} -> {payload: { token, role } } <br>

GET /api/researches -> {payload: [Research]} <br>
GET /api/researches/:id -> {payload: Research} <br>
POST /api/researches {name} -> {payload: Research} <br>
DELETE /api/researches/:id -> {payload: Research} <br>

GET /api/researches/:rid/clinics -> {payload: [Clinic]} <br>
POST /api/researches/:rid/clinics {name} -> {payload: Clinic} <br>
DELETE /api/researches/:rid/clinics/:cid -> {payload: Clinic} <br>

**Private:** <br>
GET /logout -> {payload: true} <br>

**Error responses:** <br>
Error response can return custom error such as `Not Found (404), Bad Request (400), Unauthorized (401)` or mongo error `ValidationError (400), CastError (400)` <br>
`ValidationError` - required field is missing or the value is not valid <br>
`CastError` - the record in DB is not found. Thrown when `:id` in url is not valid <br>
**Mongo errors will be converted into custom errors in future**

For private request send `Authentication: Bearer <TOKEN>` header, where TOKEN is a string returned in /login request payload.<br>

### Create users using this command (available roles: 'admin', 'coordinator', 'doctor')
`curl -X POST -d "email=test&password=test&role=admin" http://localhost:7000/api/users`
