document.addEventListener('DOMContentLoaded',()=>{
const $=s=>document.querySelector(s), modal=$('#modal'), box=$('#modalContent');
$('#menuBtn').addEventListener('click',()=>$('#nav').classList.toggle('open'));
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>$('#nav').classList.remove('open')));
document.querySelectorAll('[data-scroll]').forEach(b=>b.addEventListener('click',()=>document.getElementById(b.dataset.scroll)?.scrollIntoView({behavior:'smooth'})));
document.querySelectorAll('.open-tool').forEach(b=>b.addEventListener('click',()=>openTool(b.dataset.tool)));
$('#closeModal').addEventListener('click',hideModal);modal.addEventListener('click',e=>{if(e.target===modal)hideModal()});document.addEventListener('keydown',e=>{if(e.key==='Escape')hideModal()});
$('#searchBtn').addEventListener('click',search);$('#searchInput').addEventListener('input',search);
function search(){let q=$('#searchInput').value.trim().toLowerCase(),n=0;document.querySelectorAll('.searchable').forEach(c=>{let ok=!q||((c.dataset.search||'')+' '+c.innerText).toLowerCase().includes(q);c.style.display=ok?'':'none';if(ok)n++});$('#searchMsg').textContent=q?`${n} result(s) found`:''}
function openTool(type){const forms={
percentage:`<h2>Percentage Calculator %</h2><div class="tool-form"><input id="a" type="number" placeholder="Percentage e.g. 20"><input id="b" type="number" placeholder="Value e.g. 500"><button id="go">Calculate</button><div id="r" class="result">Answer yahan dikhega.</div></div>`,
age:`<h2>Age Calculator 🎂</h2><div class="tool-form"><input id="dob" type="date"><button id="go">Calculate Age</button><div id="r" class="result">Answer yahan dikhega.</div></div>`,
gst:`<h2>GST Calculator ₹</h2><div class="tool-form"><input id="amount" type="number" placeholder="Amount ₹"><input id="gst" type="number" placeholder="GST % e.g. 18"><button id="go">Calculate</button><div id="r" class="result">Answer yahan dikhega.</div></div>`,
emi:`<h2>EMI Calculator 🏦</h2><div class="tool-form"><input id="loan" type="number" placeholder="Loan amount ₹"><input id="rate" type="number" placeholder="Annual interest %"><input id="months" type="number" placeholder="Months"><button id="go">Calculate EMI</button><div id="r" class="result">Answer yahan dikhega.</div></div>`,
discount:`<h2>Discount Calculator 🏷️</h2><div class="tool-form"><input id="price" type="number" placeholder="Original price ₹"><input id="disc" type="number" placeholder="Discount %"><button id="go">Calculate</button><div id="r" class="result">Answer yahan dikhega.</div></div>`,
unit:`<h2>Unit Converter 📏</h2><div class="tool-form"><input id="val" type="number" placeholder="Value"><select id="unit"><option value="km-m">Kilometer → Meter</option><option value="m-km">Meter → Kilometer</option><option value="kg-g">Kilogram → Gram</option><option value="g-kg">Gram → Kilogram</option></select><button id="go">Convert</button><div id="r" class="result">Answer yahan dikhega.</div></div>`,
interest:`<h2>Simple Interest 💰</h2><div class="tool-form"><input id="principal" type="number" placeholder="Principal ₹"><input id="irate" type="number" placeholder="Rate %"><input id="years" type="number" placeholder="Time in years"><button id="go">Calculate</button><div id="r" class="result">Answer yahan dikhega.</div></div>`,
salary:`<h2>Salary Increment 📈</h2><div class="tool-form"><input id="oldSal" type="number" placeholder="Old salary ₹"><input id="newSal" type="number" placeholder="New salary ₹"><button id="go">Calculate</button><div id="r" class="result">Answer yahan dikhega.</div></div>`};
box.innerHTML=forms[type]||'<h2>Tool not found</h2>';modal.classList.add('show');$('#go').addEventListener('click',()=>calc(type));}
function num(id){return Number(document.getElementById(id).value)}
function calc(t){const r=$('#r');
if(t==='percentage'){let a=num('a'),b=num('b');if(a<0||b<0||!Number.isFinite(a)||!Number.isFinite(b))return r.textContent='Valid values enter karo.';r.innerHTML=`${a}% of ${b} = <b>${(a*b/100).toFixed(2)}</b>`}
if(t==='age'){let v=$('#dob').value;if(!v)return r.textContent='Date select karo.';let d=new Date(v+'T00:00:00'),now=new Date();if(d>now)return r.textContent='Future date valid nahi hai.';let y=now.getFullYear()-d.getFullYear(),m=now.getMonth()-d.getMonth();if(m<0||(m===0&&now.getDate()<d.getDate()))y--;r.innerHTML=`Aapki age: <b>${y} years</b>`}
if(t==='gst'){let p=num('amount'),g=num('gst');if(p<0||g<0||!Number.isFinite(p)||!Number.isFinite(g))return r.textContent='Valid values enter karo.';let x=p*g/100;r.innerHTML=`GST: <b>₹${x.toFixed(2)}</b><br>Total: <b>₹${(p+x).toFixed(2)}</b>`}
if(t==='emi'){let p=num('loan'),a=num('rate'),n=num('months');if(p<=0||a<0||n<=0)return r.textContent='Valid values enter karo.';let m=a/12/100,e=m===0?p/n:p*m*Math.pow(1+m,n)/(Math.pow(1+m,n)-1);r.innerHTML=`Monthly EMI: <b>₹${e.toFixed(2)}</b>`}
if(t==='discount'){let p=num('price'),d=num('disc');if(p<0||d<0||d>100)return r.textContent='Valid price aur discount enter karo.';let save=p*d/100;r.innerHTML=`Discount: <b>₹${save.toFixed(2)}</b><br>Final Price: <b>₹${(p-save).toFixed(2)}</b>`}
if(t==='unit'){let v=num('val'),u=$('#unit').value;if(v<0||!Number.isFinite(v))return r.textContent='Valid value enter karo.';let f={'km-m':[v*1000,'meter'],'m-km':[v/1000,'km'],'kg-g':[v*1000,'gram'],'g-kg':[v/1000,'kg']};r.innerHTML=`Result: <b>${f[u][0].toLocaleString('en-IN')}</b> ${f[u][1]}`}
if(t==='interest'){let p=num('principal'),rate=num('irate'),y=num('years');if(p<0||rate<0||y<0)return r.textContent='Valid values enter karo.';let i=p*rate*y/100;r.innerHTML=`Interest: <b>₹${i.toFixed(2)}</b><br>Total: <b>₹${(p+i).toFixed(2)}</b>`}
if(t==='salary'){let o=num('oldSal'),n=num('newSal');if(o<=0||n<0)return r.textContent='Valid salary enter karo.';let diff=n-o,pct=diff/o*100;r.innerHTML=`Increase: <b>₹${diff.toFixed(2)}</b><br>Percentage: <b>${pct.toFixed(2)}%</b>`}
}
function hideModal(){modal.classList.remove('show')}
});
