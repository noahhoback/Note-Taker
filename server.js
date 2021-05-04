// Constants
const app = express();
const express = require("express");
const path = require("path");
const { json } = require("express");
const fs = require("fs");
const db = `${__dirname}/db/db.json`
let notes = [];
