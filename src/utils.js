export const wait = ms => new Promise(r => setTimeout(r, ms));

export const retryEvery = (asyncFn, { interval = 500, maxAttempts = 1 } = {}) => new Promise((resolve, reject) => {
  return asyncFn()
    .then(resolve)
    .catch((reason) => {
      if (maxAttempts > 0) {
        return wait(interval)
          .then(retryEvery.bind(null, asyncFn, { interval, maxAttempts: maxAttempts - 1 }))
          .then(resolve)
          .catch(reject);
      }
      return reject(reason);
    });
});