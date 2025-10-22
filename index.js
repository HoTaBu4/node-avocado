import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCT_NAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);
  if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
  return output;
};

const tempCard = fs.readFileSync(path.join(__dirname, 'templates', 'template-card.html'), 'utf-8');
const tempOverview = fs.readFileSync(path.join(__dirname, 'templates', 'template-overview.html'), 'utf-8');
const tempProduct = fs.readFileSync(path.join(__dirname, 'templates', 'template-product.html'), 'utf-8');

const data = fs.readFileSync(path.join(__dirname, 'dev-data', 'data.json'), 'utf-8');
const products = JSON.parse(data);

const app = express();

app.get('/overview', (_req, res) => {
  const cardHtml = products.map((product) => replaceTemplate(tempCard, product)).join('');
  const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardHtml);
  res.status(200).send(output);
});

app.get('/product', (req, res) => {
  const product = products[req.query.id];
  if (!product) {
    res.status(404).send('<h1>Product not found</h1>');
    return;
  }

  const output = replaceTemplate(tempProduct, product);
  res.status(200).send(output);
});

app.get('/api', (_req, res) => {
  res.status(200).json(products);
});

app.use((_req, res) => {
  res.status(404).send('<h1>Page cannot be found</h1>');
});

if (!process.env.VERCEL) {
  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log(`Listening for requests on port ${port}`);
  });
}

export default app;
