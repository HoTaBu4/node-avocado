
///////////////////////////////////////////
import http from 'http';
import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCT_NAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description)    ;
    output = output.replace(/{%ID%}/g, product.id);
        if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    return output;
}

const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    const { query, pathName } = url.parse(req.url, true);

    if(pathName === '/overview') { 
        res.writeHead(404, {
            'Content-Type': 'text/html'
        });

        const CardHtml = dataObj.map(el => replaceTemplate(tempCard, el )).join('')
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', CardHtml);

        res.end(output);

    } else if (pathName === '/product') {
        res.writeHead(404, {
            'Content-Type': 'text/html'
        });

        const product = dataObj[query.id]
        const output = replaceTemplate(tempProduct, product);

        res.end(output);
    } else if (pathName === '/api') {
        res.writeHead(200, {
            'Content-type': 'application/json'
        });
        res.end(data);
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/html'
        });
        res.end('<h1>page cannot be found</h1>');
    }
})

server.listen(8000, 'localhost', () => {
    console.log('Listening to request on port 8000');
});