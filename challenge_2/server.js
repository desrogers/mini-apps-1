const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', express.static(path.join(__dirname, 'client')));

app.post('/', (req, res) => {
  
  const json = JSON.parse(req.body.textarea);
  const keys = Object.keys(json);

  let csv = '';

  keys.forEach((key, idx) => {
    if (idx < keys.length - 1) {
      idx < keys.length - 2 ?
        csv += `${key},` :
        csv += `${key}\n`;
    }
  });

  const getCsvRows = (item) => {
    let values = Object.values(item);
    values.forEach((val, idx) => {
      if (idx < values.length - 1) {
        idx < values.length - 2 ?
        csv += `${val},` :
        csv += `${val}\n`;
      }
    });

    for (let child of item.children) {
      getCsvRows(child);
    }
  };

  getCsvRows(json);

  res.set("Content-Type", "text/plain");
  res.send(csv);
})

app.listen(3000, () => console.log(`Server is listening on port 3000`));

