jest.mock('../lib/files.js', () => ({
  readFile: jest.fn(),
  writeFile: jest.fn(),
  readdir: jest.fn(),
}));

// for setting up mock expectations
const { readFile, writeFile, readdir } = require('../lib/files');
const DocumentCollection = require('../lib/document-collection');
const collection = new DocumentCollection;

describe('Document Collection', () => {
  it('saves file', () => {
    //arrange
      const dest = './id.json';
      const exampleObject = {
        name: 'abbey'
      };

      writeFile.mockResolvedValue(exampleObject);

    //act
      return collection.save(exampleObject)
        .then(() => {
          const writeCalls = writeFile.mock.calls;
          expect(writeCalls.length).toBe(1);
          expect(writeCalls[0][0]).toBe(dest);
          expect(writeCalls[0][1]).toBe(JSON.stringify(exampleObject));
        });
  });
});