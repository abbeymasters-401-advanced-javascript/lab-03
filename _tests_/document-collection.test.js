jest.mock('../lib/files.js', () => ({
  readFile: jest.fn(),
  writeFile: jest.fn(),
  readdir: jest.fn(),
}));

// for setting up mock expectations
const { readFile, writeFile, readdir } = require('../lib/files');
const DocumentCollection = require('../lib/document-collection');
const collection = new DocumentCollection('document');

describe('Document Collection', () => {
  
  const exampleObject = {
    name: 'abbey'
  };

  it('saves file', () => {
    //arrange
    writeFile.mockResolvedValue(exampleObject);
    
    //act
    return collection.save(exampleObject)
      .then(() => {
        const dest = `./document/${exampleObject.id}.json`;
        const writeCalls = writeFile.mock.calls;
        expect(writeCalls.length).toBe(1);
        expect(writeCalls[0][0]).toBe(dest);
        expect(writeCalls[0][1]).toBe(JSON.stringify(exampleObject));
      });
  });

  it('propagates error', () => {
    //arrange
    const error = 'file error';
    writeFile.mockRejectedValueOnce(error);
    expect.assertions(0);

    //act
    collection.save({})
      .catch(err => {
        expect(err).toBe(error);
      });      
  });

  it('get id', () => {
      //arrange
    const source = `./document/${exampleObject.id}.json`;
    readFile.mockResolvedValue(exampleObject);

      //act
    return collection.get(exampleObject.id)
      .then(() => {
        const readCalls = readFile.mock.calls;
        expect(readCalls.length).toBe(1); 
        expect(readCalls[0][0]).toBe(source);
      });
  });

  it('get ALL files in directories', () => {
      //arrange
    const readPromise = Promise.resolve(JSON.stringify(exampleObject));
    readFile.mockReturnValueOnce(readPromise);
      
    const readDirPromise = Promise.resolve(['123.json']);
    readdir.mockReturnValueOnce(readDirPromise);
            
      //act
    return collection.getAll()
      .then(items => {
        const readdirCalls = readdir.mock.calls;
        expect(readdir.mock.calls[0][0]).toBe('./document');

        expect(readdirCalls.length).toBe(1); 
        expect(readFile.mock.calls[1][0]).toBe('./document/123.json');
        expect(items[0].id).toBe(exampleObject.id);
      });
  });
});
