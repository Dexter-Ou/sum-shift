'use strict';
(() => {
 const goal=[1,2,3,4,5,6,7,8,9];
 const scrambles=[[[0,0]],[[0,1],[1,0]],[[0,0],[1,2],[0,2],[1,1]]];
 let grid=[],history=[],moves=0,level=0;
 function shift(a,axis,n){const b=a.slice();for(let j=0;j<3;j++){const from=axis===0?n*3+j:j*3+n;const to=axis===0?n*3+(j+1)%3:((j+1)%3)*3+n;b[to]=a[from];}return b;}
 function sums(a){return [0,1,2].map(r=>a.slice(r*3,r*3+3).reduce((x,y)=>x+y,0)).concat([0,1,2].map(c=>a[c]+a[c+3]+a[c+6]));}
 const targets=sums(goal);
 function render(){const totals=sums(grid),won=totals.every((x,i)=>x===targets[i]);const board=document.querySelector('#board');board.replaceChildren();
 for(let r=0;r<3;r++){for(let c=0;c<3;c++){const cell=document.createElement('div');cell.className='tile';cell.textContent=grid[r*3+c];board.append(cell);}const wrap=document.createElement('div');wrap.className='target'+(totals[r]===targets[r]?' match':'');const label=document.createElement('div');label.textContent=`${totals[r]} / ${targets[r]}${totals[r]===targets[r]?' ✓':''}`;const button=document.createElement('button');button.textContent=`Row ${r+1} →`;button.setAttribute('aria-label',`Shift row ${r+1} right`);button.onclick=()=>move(0,r);wrap.append(label,button);board.append(wrap);}
 for(let c=0;c<3;c++){const wrap=document.createElement('div');wrap.className='column target'+(totals[c+3]===targets[c+3]?' match':'');const label=document.createElement('div');label.textContent=`${totals[c+3]} / ${targets[c+3]}${totals[c+3]===targets[c+3]?' ✓':''}`;const button=document.createElement('button');button.textContent=`Column ${c+1} ↓`;button.setAttribute('aria-label',`Shift column ${c+1} down`);button.onclick=()=>move(1,c);wrap.append(button,label);board.append(wrap);}
 document.querySelector('#status').textContent=won?`Solved in ${moves} shifts. Try another puzzle!`:`${moves} shifts · match row targets on the right and column targets below.`;document.querySelector('#undo').disabled=history.length===0;
 }
 function move(axis,n){history.push(grid.slice());grid=shift(grid,axis,n);moves++;render();}
 function reset(){grid=goal.slice();for(const [a,n] of scrambles[level])grid=shift(grid,a,n);history=[];moves=0;document.querySelector('#help').textContent='';render();}
 document.querySelector('#level').onchange=e=>{level=Number(e.target.value);reset();};
 document.querySelector('#reset').onclick=reset;
 document.querySelector('#undo').onclick=()=>{if(history.length){grid=history.pop();moves--;render();}};
 document.querySelector('#solution').onclick=()=>{document.querySelector('#help').textContent='Reset first, then: '+scrambles[level].slice().reverse().map(([a,n])=>`${a===0?'Row':'Column'} ${n+1} twice`).join('; ')+'.';};
 reset();
})();
