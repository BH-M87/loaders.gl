const {loadImage} = require('@loaders.gl/images');

if (typeof self !== 'undefined') {
  /* global self */
  self.onmessage = evt => {
    const url = evt.data;

    loadImage(url)
      .then(image => {
        self.postMessage({image}, [image]);
      })
      .catch(error => {
        self.postMessage({error: error.message});
      });
  };
}
