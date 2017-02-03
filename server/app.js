import KoaApp from 'koa';
import serve from 'koa-better-static';
import renderReact from '../src/server';
import { makeApiProxy } from './routes/api';
import { makeElasticProxy } from './routes/elastic';
import zipcodes from './routes/zipcodes';
import loadI18n from './i18n';
import verifyJwt from './verify-jwt';
import onerror from 'koa-onerror';
import moment from 'moment';
import chalk from 'chalk';
import log4js from 'koa-log4';
import path from 'path';

function timestamp() {
  return moment().format('D MMM H:mm:ss');
}

export default class App extends KoaApp {

  constructor(...args) {
    super(...args);
    onerror(this);

    log4js.configure(path.join(`${__dirname}`, '../log4js.json'));

    this.use(serve('public', { maxage: 31536000 }))
      .use(log4js.koaLogger(log4js.getLogger('http'), { level: 'auto' }))
      .use(makeApiProxy())
      .use(makeElasticProxy())
      .use(zipcodes.routes())
      .use(zipcodes.allowedMethods())
      .use(verifyJwt)
      .use(loadI18n)
      .use(renderReact);
  }

  start() {
    this.listenPort = process.env.PORT ? Number(process.env.PORT) : 4050;

    this.listen(this.listenPort);
    this.logInfo();
  }

  logInfo() {
    const description = require('../package.json').description;
    /* eslint-disable no-console-log/no-console-log */
    console.log(
      `%s: %s ${chalk.blue('%s')} ${chalk.green('api: %s')} ${chalk.red('development url: http://localhost:%d')}`,
      timestamp(),
      description,
      process.env.NODE_ENV,
      process.env.API_URL,
      this.listenPort
    );
  }
}
