// const sum = (a, b) => {
//   if (a && b) {
//     return a + b;
//   }
//   throw new Error('fuck');
// };

// console.log(sum(1));

//  we must have to handle proper error since nodejs most packages throws error we just
// have to handle those properly

// Sync Code

const sum = (a, b) => {
  if (a && b) {
    return a + b;
  }
  throw new Error('fuck');
};

try {
  console.log(sum(1));
} catch (err) {
  console.log('Error occured!');
  console.log(err); // [Error: fuck]
}

// Async Code
