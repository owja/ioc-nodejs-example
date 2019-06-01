# `@owja/ioc` NodeJS Example

This is an example how the `@owja/ioc` library can be used in NodeJS. The lib is not made for NodeJS,
but this example should show that this is possible. The only dependency to run this example is NodeJS itself
and the `@owja/ioc` npm package.

To start it just clone the repository and run npm install and the [index.js](index.js) script. The 
source code is fully commented.

```bash
git clone https://github.com/owja/ioc-nodejs-example.git
cd ioc-nodejs-example
npm install
npm run start
```

The output should show something like this:

```
TYPE.MyService is resolved every call
0.027818018183515036
0.18901070336010561
0.6690213164765038
0.3815322480368253

TYPE.MyOtherService is resolved only once (in singleton scope)
0.04530863201218027
0.04530863201218027
0.04530863201218027
0.04530863201218027

Can do weired things ^^
0.04530863201218027
``` 

## Links

For more information on how to use the `@owja/ioc` package visit the repository on github or npmjs:

* [github.com/owja/ioc](https://github.com/owja/ioc) 
* [npmjs.com/package/@owja/ioc](https://www.npmjs.com/package/@owja/ioc) 