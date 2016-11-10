const fs = require('fs');
const Api = require('./api');
const moment = require('moment');
const _ = require('lodash');

/* TODO:
   - meta information
   - images ?
*/

function now() {
  return moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
}

function getPrice(price) {
  return {
    "currency": "USD",
    "value": parseFloat(price.replace(/\D/g, '')),
  };
}

function getTags(tags) {
  return tags.toUpperCase().split(', ');
}

function addCustomFields(product, productPayload) {
  const attributes = _.omit(product, [
    "Name",
    "Description",
    "Tags",
    "SKU code",
    "SKU price",
    "SKU Sale Price (optional)",
    "Link on current site",
    "id"
  ]);

  _.map(attributes, (value, key) => {
    productPayload.attributes[key] = {
      "t": "string",
      "v": value
    };
  });
}

function enableProduct(product, enabled = true) {
  if (enabled) {
    product.attributes.activeFrom = {
      t: "datetime",
      v: now(),
    };
  }
}

function getProduct(product) {
  const price = getPrice(product["Price"]);

  const sale = product["SKU Sale Price (optional)"];
  const salePrice = !!sale ? getPrice(sale) : price;

  const title = {
    "t": "string",
    "v": product.Name
  };

  const sku = _.get(product, "SKU code");

  let productPayload = {
    "attributes": {
      title,
      "description": {
        "t": "richText",
        "v": product.Description
      },
      "tags": {
        "t": "tags",
        "v": getTags(product.Tags)
      }
    },
    "skus": [{
      "attributes": {
        title,
        "code": {
          "t": "string",
          "v": sku || `PG-SKU-${product.id}`
        },
        "retailPrice": {
          "t": "price",
          "v": price,
        },
        "salePrice": {
          "t": "price",
          "v": salePrice,
        },
        "activeFrom": {
          "t": "datetime",
          "v": now(),
        },
      }
    }],
    "context": {"name": "default"}
  };

  enableProduct(productPayload);
  addCustomFields(product, productPayload);

  return productPayload;
}

function save(productPayload, id) {
  if (id) {
    Api.patch(`/products/default/${id}`, productPayload)
      .then(
        data => {
          console.log(`${data.id} ${data.attributes.title.v}`);
        },
        err => {
          console.log(err);
          //console.log(`${product.Name} ${err.response.error.status}: ${err.response.error.text}`)
        }
      );
  } else {
    Api.post('/products/default', productPayload)
      .then(
        data => {
          console.log(`${data.id} ${data.attributes.title.v}`);
        },
        err => {
          console.log(err);
          //console.log(`${product.Name} ${err.response.error.status}: ${err.response.error.text}`)
        }
      );
  }
}

function saveProducts() {
  fs.readFile(__dirname + '/data/products_new.json', function (err, data) {
    // const products = JSON.parse(data).slice(0, 3);
    const products = JSON.parse(data);

    products.map((product) => {
      const productPayload = getProduct(product);

      // console.log(productPayload.skus[0].attributes.salePrice.v);
      // console.log(productPayload.skus[0].attributes.code.v);

      const id = _.get(product, 'productId');

      save(productPayload, id)
    });
  });
}

function saveGiftCard() {
  fs.readFile(__dirname + '/data/gift_card.json', function (err, data) {
    const giftCard = JSON.parse(data);

    enableProduct(giftCard);

    giftCard.skus.map((sku, i) => {
      enableProduct(giftCard.skus[i]);
    });

    //console.log(giftCard.skus[0].attributes);

    save(giftCard);
  });
}

saveGiftCard();
saveProducts();
