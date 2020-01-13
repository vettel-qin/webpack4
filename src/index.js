// // import banner from './banner.png';
import './index.css';
import './style.css';

// // var img = new Image();
// // img.src = banner;
// // img.classList.add('pic');

// // var root = document.getElementById('root');
// // root.append(img);
// var btn = document.createElement('button');
// btn.innerHTML = '新增';

// document.body.appendChild(btn);

// btn.onclick = function() {
//   var div = document.createElement('div');
//   div.innerHTML = 'item';
//   document.body.appendChild(div);
// }

// var p = document.createElement('p');
// p.innerHTML = 'ppppp';

// document.body.appendChild(p);
// Tree shaking (吹食king)
// import { add } from './counter';

// add(3,5);

// 异步加载代码分割
// function getComponent() {
//   return import(/* webpackChunkName: "lodash" */ 'lodash').then(({default: _}) => {
//     const ele = document.createElement('div');
//     ele.innerHTML = _.join(['Spencer', 'Qin'], '-');
//     return ele;
//   })
// }

// getComponent().then(ele => {
//   document.body.appendChild(ele);
// })

if ('serverWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(
      registration => {
        console.log('surcess serverworker');
        
      }
    ).catch(err => {
      console.log(err)
    })
  })
}

// 同步加载代码分割
import _ from 'lodash';
const ele = document.createElement('div');
ele.innerHTML = _.join(['Spencer', '加油', '']);
document.body.appendChild(ele)