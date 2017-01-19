# CRF
CRF for Biofarma <br>
[![Build Status](https://travis-ci.org/staticbass/koa-crf.svg?branch=master)](https://travis-ci.org/staticbass/koa-crf)

### Available requests
**Public:** <br/>
GET /login { phone, name } -> { payload: { token, user } } <br>
<br>
**Private:** <br>
**For private request send `Authentication: Bearer <TOKEN>` header, where TOKEN is a string returned in /login request payload.**<br>
GET /logout -> {payload: true} <br>

GET /api/v1/users -> {payload: [Users]} <br>
GET /api/v1/users/:id -> {payload: User} <br>
POST /api/v1/users {phone, password, role, name} -> {payload: User} <br>
DELETE /api/v1/users/:id -> {payload: User} <br>

GET /api/v1/researches -> {payload: [Research]} <br>
GET /api/v1/researches/:id -> {payload: Research} <br>
POST /api/v1/researches {name: String, dateStart: Date, dateEnd: Date, clinics: [String]} -> {payload: Research} <br>
DELETE /api/v1/researches/:id -> {payload: Research} <br>

GET /api/v1/researches/:rid/clinics -> {payload: [Clinic]} <br>
GET /api/v1/researches/:rid/clinics/:cid -> {payload: Clinic} <br>
POST /api/v1/researches/:rid/clinics 
{name: String, address: String, researchId: String, doctors: [String]} -> {payload: Clinic} <br>

DELETE /api/researches/:rid/clinics/:cid -> {payload: Clinic} <br>

GET /api/v1/researches/:rid/clinics/:cid/patients -> {payload: [Patient]} <br>
GET /api/v1/researches/:rid/clinics/:cid/patient/:pid -> {payload: Patient} <br>
POST /api/v1/researches/:rid/clinics/:cid/patients {name: String, doctorId: String, dateOfBirth: Date, weight: Number, visits: [any], sideEffects: [any], therapy: [any], anamnesis: [any]} -> { payload: Patient } <br>
DELETE /api/researches/:rid/clinics/:cid/patient/:pid -> {payload: Patient} <br>

**Error responses:** <br>
Error response can return custom error such as `Not Found (404), Bad Request (400), Unauthorized (401), Forbidden (403)`,
return value will be { error: String } 

### Create admin user using special url (only dev/test env)
GET /api/v1/gen/superuser -> { payload: User } 
