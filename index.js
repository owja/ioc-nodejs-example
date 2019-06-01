"use strict";

const ioc = require("@owja/ioc");

/**
 * We use a example service class with some properties to show
 * how the OWJA! IoC library works.
 *
 * The `random` property is just a random float.
 *
 * The property one and two are referencing the service itself.
 * It is a circular dependency. To make this possible they don't
 * access the container directly inside of the constructor. The
 * dependencies are resolved when the properties get accessed.
 * This is similar to the `@inject` decorator used in es next
 * environments.
 */
class MyService {
    constructor() {
        this.random = Math.random();
        this.one = () => container.get(TYPE.ServiceOne);
        this.two = () => container.get(TYPE.ServiceTwo);
    }
}

/**
 * This is just a `Container` instance. The object where all
 * dependencies are bound to. It is possible to use more than
 * one container per project.
 */
const container = new ioc.Container();

/**
 * We use `Symbol` to identify our dependencies. We use the
 * `TYPE` constant to keep them together.
 */
const TYPE = {
    ServiceOne: Symbol("ServiceOne"),
    ServiceTwo: Symbol("ServiceTwo"),
};

/**
 * Now we bind the dependencies to the symbols. The first
 * dependency `TYPE.ServiceOne` will get resolved every time
 * `container.get(TYPE.ServiceOne)` is called. The second
 * dependency `TYPE.ServiceTwo` will only get resolved once.
 */
container.bind(TYPE.ServiceOne).to(MyService);
container.bind(TYPE.ServiceTwo).to(MyService).inSingletonScope();

/**
 * Now we do some output. Because of we getting a new instance
 * of `MyService` with the `TYPE.ServiceOne` type each time we
 * get it from the container, all random numbers will be
 * differently...
 */
console.log("\nTYPE.MyService is resolved every call");
console.log(container.get(TYPE.ServiceOne).random);
console.log(container.get(TYPE.ServiceOne).random);
console.log(container.get(TYPE.ServiceOne).random);
console.log(container.get(TYPE.ServiceOne).random);

/**
 * ...but because of we bound `TYPE.ServiceTwo` in singleton scope
 * the next numbers are all the same.
 */
console.log("\nTYPE.MyOtherService is resolved only once (in singleton scope)");
console.log(container.get(TYPE.ServiceTwo).random);
console.log(container.get(TYPE.ServiceTwo).random);
console.log(container.get(TYPE.ServiceTwo).random);
console.log(container.get(TYPE.ServiceTwo).random);

/**
 * And the last output shows just that we can access all
 * dependencies in a chain. At the end we get the `random`
 * value out of `TYPE.ServiceTwo` and that's why it should
 * be the same than the four outputs before.
 */
console.log("\nCan do weired things ^^");
console.log(container.get(TYPE.ServiceTwo).one().two().two().one().two().random);