const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

const handleHomePage = (req, res) => {
  const filePath = path.join(__dirname, '..', 'public', 'index.html');
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end('<h1>Server Error</h1>');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
};
const handleNotFoundPage = (req, res) => {
  const filePath = path.join(__dirname, '..', 'public', 'not_found.html');
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end('<h1>Server Error</h1>');
    } else {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
};

const handleJsonFile = (req, res, endpoint) => {
  const newEndpoint = endpoint.split('=')[1];
  const filePath = path.join(__dirname, 'data.json');
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end('<h1>Server Error</h1>');
    } else {
      const convertedData = querystring.parse(newEndpoint);
      const key = Object.keys(convertedData).join('');
      const Alldata = JSON.parse(data);
      const filterData = Alldata.filter((e) => {
        const n = e.name.toLowerCase();
        return n.includes(key.toLowerCase());
      });
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(filterData));
    }
  });
};

const handlePublicFiles = (req, res, endpoint) => {
  const filePath = path.join(__dirname, '..', endpoint);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end('<h1>Server Error</h1>');
    } else {
      // res.writeHead(200,{"Content-Type":"text/html"});
      res.end(data);
    }
  });
};
module.exports = {
  handleHomePage,
  handlePublicFiles,
  handleJsonFile,
  handleNotFoundPage,
};
