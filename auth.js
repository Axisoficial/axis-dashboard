// Axis Dashboard — Auth guard
// Include this as the FIRST script in every protected page.
(function(){
  try{
    var s=JSON.parse(sessionStorage.getItem('axis_session')||'null');
    if(!s||!s.token||!s.email){
      location.replace('/axis-dashboard/login.html?next='+encodeURIComponent(location.pathname+location.search));
    }
  }catch(e){
    location.replace('/axis-dashboard/login.html');
  }
})();

// Expose helper functions globally
function axisLogout(){
  sessionStorage.removeItem('axis_session');
  location.href='/axis-dashboard/login.html';
}

function axisCurrentUser(){
  try{return JSON.parse(sessionStorage.getItem('axis_session')||'null');}catch(e){return null;}
}
