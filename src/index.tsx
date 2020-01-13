// class Greeter {
//   greeting: string;
//   constructor(message: string) {
//     this.greeting = message;
//   }

//   greet() {
//     return `${this.greeting}, 加油！`
//   }
// }

// const greeter = new Greeter('Spencer');

// const div = document.createElement('div');
// div.innerHTML = greeter.greet();

// document.body.appendChild(div);
import * as React from 'react';
import * as ReactDOM from 'react-dom';
const render = () => {
  ReactDOM.render(
    <div>Spencer</div>,
    document.querySelector('#root'),
  );
};

render();