import '../app/server';

import axios, {AxiosResponse} from 'axios';
import {expect} from 'chai';
import {Types} from 'mongoose';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.timeout = 5000;

describe('Callback Controller', () => {

});