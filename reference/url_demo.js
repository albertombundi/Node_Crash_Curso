// URl Module

const path = require('path');
const url = require('url');
const myUrl = new URL('http://mywesite.com:800/hello.html?id=100&status=active');


// Serialized URL
console.log(myUrl.href);
console.log(myUrl.toString());

// Host (root domain)
console.log(myUrl.host);

// Hostname (does not get port)
console.log(myUrl.hostname);

// Pathname (give us the actually path or file)
console.log(myUrl.pathname);

// Serialized query
console.log(myUrl.search);

// Params objects
console.log(myUrl.searchParams);


// Add param 
myUrl.searchParams.append('abc', '123');
console.log(myUrl.searchParams);


// Loop through params
myUrl.searchParams.forEach((value, name) => console.log(`${name}: ${value}`));