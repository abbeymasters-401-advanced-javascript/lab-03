const DocumentCollection = require('./lib/document-collection');

const documents = new DocumentCollection('./documents');

// write some code to exercise your document collection

const exampleObject = {
  name: 'abbey'
};

documents.save(exampleObject)
  .then(() => {
    console.log(exampleObject);
    documents.get(exampleObject.id)
      .then(returnedObject => {
        console.log(returnedObject);
      })
      .then(() => {
        documents.getAll()
          .then(res => {
            console.log(res);
          });
      });
  });

