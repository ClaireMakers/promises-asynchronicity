// Object that we use to handle asynchronous operations.
//Promises have three different states:
// - pending
// - fulfilled/resolved
// - rejected

function wakeUpClaire() {
    return "meow until she's woken up";
}

function begForFood() {
    return "beg for food until bowl is full";
}

function eatFood() {
    return "eat lots of food and make sure to spill it everywhere";
}

//You can build a promise from scratch using the Promise class that's in-built in JavaScript 
//The constructor will take a callback function with 2 arguments: resolve, reject
//Quick refresher: callback functions are function passed as ARGUMENTS to other functions.

const promiseToWakeUp = new Promise((resolve, reject) => {
    setTimeout(() => {
      //Do I wake up when she asks me to?
      const boolean = false;

      if (boolean) {
        //All is well - I get up on time to feed her - we resolve the promise
        //Here, I make sure the promise is fulfilled by calling the "resolve" function - this means that
        // the return value of "wakeUpClaire" will be available down the promise chain
        resolve(wakeUpClaire());
      } else {
        //Oh no! It's 6 o'clock on Sunday and I want to sleep - we will reject the promise and catch the error
        //I use the reject function to pass the error down the promise chain to the catch block
        reject("how dare she leave me to starve?!!");
      }
    })
  //.then() is a method you can call on a promise object - it takes a callback function as an argument
}).then((string) => {
  //the string here is "meow until she's woken up" as it's what wakeUpClaire returns
    console.log(string);
    //let's pass a value down the promise chain one more time:
    return begForFood();
}).then((string) => {
    //what do you reckon the value of string will be here?
    console.log(string);
}).catch((error) => {
    //what do you expect the error to be?
    console.log(error);
});


//You cannot get anything out of a promise - you cannot assign the return value of the last promise on a
//chain to a variable, since it's asynchronous code - if the asynchronous operation hasn't finished running,
// you will get <Promise - pending> results, or undefined. 
//Consider those examples: 
const array = [];

const promiseToAddToArray = new Promise((resolve, reject) => {
    setTimeout(() => { 
        array.push("Sigrid");
        resolve(array);
    })
}).then((array) => {
    console.log("inside of promise chain:", array); // => ["Sigrid"]
    return array;
})

console.log("outside of promise chain", array); // => []
console.log(promiseToAddToArray); // => This is a pending promise, not the last value returned by the promise chain

//Here are some examples using fetch - one with .then() blocks, one with async/await
//Just remember that even if async'await looks a lot like synchronous code, it's not under the hood! 


const fetchMyPokemon = () => {
  return fetch("https://pokeapi.co/api/v2/pokemon/ditt")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch(() => {
      console.log("error");
    });
};


const fetchMyPokemonAsync = async () => {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/ditt");
    const data = await response.json();

    return data;
  } catch {
    console.log("error async function");
  }
};