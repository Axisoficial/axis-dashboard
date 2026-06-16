// Axis Dashboard — Auth guard
// Include this as the FIRST script in every protected page.
(function(){
  try{
    var s=JSON.parse(localStorage.getItem('axis_session')||'null');
    if(!s||!s.token||!s.email){
      location.replace('/axis-dashboard/login.html?next='+encodeURIComponent(location.pathname+location.search));
    }
  }catch(e){
    location.replace('/axis-dashboard/login.html');
  }
})();

// Expose helper functions globally
function axisLogout(){
  localStorage.removeItem('axis_session');
  location.href='/axis-dashboard/login.html';
}

function axisCurrentUser(){
  try{return JSON.parse(localStorage.getItem('axis_session')||'null');}catch(e){return null;}
}

// Inject navigation bar on every protected page
document.addEventListener('DOMContentLoaded',function(){
  if(location.pathname.includes('login.html'))return;
  var pages=[
    {href:'/axis-dashboard/index.html',label:'Dashboard'},
    {href:'/axis-dashboard/producao.html',label:'Produção'},
    {href:'/axis-dashboard/viabilidade.html',label:'Viabilidade'},
    {href:'/axis-dashboard/custos.html',label:'Custos'},
    {href:'/axis-dashboard/app.html',label:'Mídias'},
    {href:'/axis-dashboard/dashboard-vendas.html',label:'Vendas'},
  ];
  var cur=location.pathname.split('/').pop()||'index.html';
  var bar=document.createElement('nav');
  bar.id='axis-global-nav';
  bar.style.cssText='background:#0f172a;border-bottom:1px solid #1e293b;padding:0 20px;display:flex;align-items:center;gap:2px;position:sticky;top:0;z-index:9999;font-family:"Segoe UI",system-ui,sans-serif;';
  var logo=document.createElement('span');
  logo.style.cssText='font-size:16px;font-weight:900;letter-spacing:-1px;color:#fff;margin-right:16px;padding:10px 0;flex-shrink:0;';
  logo.textContent='axis';
  bar.appendChild(logo);
  pages.forEach(function(p){
    var a=document.createElement('a');
    var pageName=p.href.split('/').pop();
    var active=cur===pageName||(cur===''&&pageName==='index.html');
    a.href=p.href;
    a.textContent=p.label;
    a.style.cssText='color:'+(active?'#fff':'#64748b')+';text-decoration:none;padding:12px 14px;font-size:13px;font-weight:'+(active?'700':'400')+';border-bottom:2px solid '+(active?'#c0141c':'transparent')+';white-space:nowrap;transition:.15s;';
    a.onmouseenter=function(){if(!active)this.style.color='#cbd5e1';};
    a.onmouseleave=function(){if(!active)this.style.color='#64748b';};
    bar.appendChild(a);
  });
  var spacer=document.createElement('div');spacer.style.flex='1';bar.appendChild(spacer);
  var user=axisCurrentUser();
  if(user){
    var uname=document.createElement('span');
    uname.style.cssText='color:#475569;font-size:12px;margin-right:12px;';
    uname.textContent=user.email.split('@')[0];
    bar.appendChild(uname);
  }
  var btn=document.createElement('button');
  btn.textContent='Sair';
  btn.onclick=axisLogout;
  btn.style.cssText='background:none;border:1px solid #334155;color:#94a3b8;padding:5px 12px;border-radius:6px;font-size:12px;cursor:pointer;font-family:inherit;';
  bar.appendChild(btn);
  document.body.insertBefore(bar,document.body.firstChild);
});
