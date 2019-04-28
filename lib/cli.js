#! /usr/bin/env node
const args = require("./helpers/args")
const incl = require("./incl")

let argv = args(process)
incl(argv)
