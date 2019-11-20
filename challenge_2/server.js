const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const upload = multer({dest: 'uploads/'})
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', express.static(path.join(__dirname, 'client')));

app.post('/', upload.single('jsonfile'), (req, res) => {

  fs.readFile(path.join(__dirname, 'uploads', req.file.filename),
    (err, data) => {
      const json = JSON.parse(data);
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
    }
  )
})

app.listen(3000, () => console.log(`Server is listening on port 3000`));

