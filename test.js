console.log('hello world');
const { check, validationResult } = require('express-validator');

const test = 'Pratik';
console.log(check('test', 'test is required').Not());
