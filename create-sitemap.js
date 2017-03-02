const path = require('path');

process.env.NODE_PATH = `${process.env.NODE_PATH}:${path.resolve('./lib/core')}`;

require('./src/postcss').installHook();

const makeRoutes = require('./lib/routes').default;
const Sitemap = require('react-router-sitemap').default;
const {
  categories,
  convertCategoryNameToUrlPart,
} = require('modules/categories');

const routes = makeRoutes();
const categoryNames = categories.map(c => convertCategoryNameToUrlPart(c.name));

const paramsConfig = {
  '/:categoryName': [
    {
      categoryName: categoryNames,
    },
  ],
};

const excludedRoutes = {
  isValid: false,
  rules: [/\/?auth/, /\/profile/, /\/products/, /\/search/, /\/checkout/],
};

new Sitemap(routes)
  .filterPaths(excludedRoutes)
  .applyParams(paramsConfig)
  .build('https://topdrawer.com')
  .save('./public/sitemap.xml');
