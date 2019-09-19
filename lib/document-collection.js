const files = require('./files');
const shortid = require('shortid');
const util = require('util');
const { promisify } = require('util');
const fs = require('fs');

// use npm to find a module for creating ids

class DocumentCollection {
  constructor(folder) {
    this.folder = folder;
  }

  save(object) {
    // TODO:
    // 1. assign an id
    object.id = shortid.generate();
    // 2. serialize object
    const json = JSON.stringify(object);
    // 3. use promisified fs to write to folder path using id.json as file name
    files.writeFile(this.folder, id.json);
    // 4. "return" object (which now has an id)
    return ;
    // 5. if expected, turn promisified fs errors into meaningful database errors



  }

  get(id) {
    // TODO:
    // 1. create file path from id
    // 2. use promisified fs to read file
    // 3. deserialize contents
    // 4. "return" object
    // 5. if expected, turn promisified fs errors into meaningful database errors
  }

  getAll() {
    // TODO:
    // 1. read folder file names
    // 2. use Promise.all and map each file name to a this.get call (remove .json file extension!)
    // 3. "return" array of objects
    // 4. if expected, turn promisified fs errors into meaningful database errors
  }
}

module.exports = DocumentCollection;