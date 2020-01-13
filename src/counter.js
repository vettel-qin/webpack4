// function counter() {
//   var div = document.createElement('div');
//   div.setAttribute('id', 'counter');
//   div.innerHTML = 1;
//   div.onclick = function() {
//     div.innerHTML = parseInt(div.innerHTML, 10) + 1;
//   }
//   document.body.appendChild(div);
// }

export const add = (x, y) => {
  console.log(x + y);
}

export const minus = (x, y) => {
  console.log(x - y);
}