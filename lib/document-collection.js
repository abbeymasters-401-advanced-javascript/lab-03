const files = require('./files');
const shortid = require('shortid');

// use npm to find a module for creating ids

class DocumentCollection {
  constructor(folder) {
    this.folder = folder;
  }

  save(object) {
    // TODO:
    // 1. assign an id
    // 2. serialize object
    // 3. use promisified fs to write to folder path using id.json as file name
    // 4. "return" object (which now has an id)
    // 5. if expected, turn promisified fs errors into meaningful database errors

    object.id = shortid.generate();
    const serializedObject = JSON.stringify(object);
    return files.writeFile(`./${this.folder}/${object.id}.json`, serializedObject, 'utf-8')
      .then(() => {
        return object;
      })
      .catch(err => {
        console.log('***ERROR', err);
      });
  }

  get(id) {
    // TODO:
    // 1. create file path from id
    // 2. use promisified fs to read file
    // 3. deserialize contents
    // 4. "return" object
    // 5. if expected, turn promisified fs errors into meaningful database errors

    const filePath = `./${this.folder}/${id}.json`;
    return files.readFile(filePath)
      .then((contents) => {
        return JSON.parse(contents);
      })
      .catch(err => {
        console.log('***ERROR:', err);
      });
  }

  getAll() {
    // TODO:
    // 1. read folder file names
    // 2. use Promise.all and map each file name to a this.get call (remove .json file extension!)
    // 3. "return" array of objects
    // 4. if expected, turn promisified fs errors into meaningful database errors

    return files.readdir(`./${this.folder}`)
      .then((files) => {
        return Promise.all(
          files.map(file => {
            return this.get(file.substring(0, file.length - 5));
          }));
      })
      .catch(err => {
        console.log('***Error', err);
      });
  }
}

module.exports = DocumentCollection;