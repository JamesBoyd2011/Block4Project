const pg = require("pg");
const express = require("express");
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/Block4Project');
const app = express();