document.addEventListener('DOMContentLoaded',function(){
  if(typeof AOS!=='undefined') AOS.init({duration:550,easing:'ease-out-quad',once:true,offset:60});
  var hdr=document.getElementById('main-header');
  if(hdr) window.addEventListener('scroll',function(){hdr.classList.toggle('scrolled',window.scrollY>60)});
  var ham=document.getElementById('hamburger');
  var mm=document.getElementById('mobile-menu');
  if(ham&&mm) ham.addEventListener('click',function(){
    mm.classList.toggle('open');
    var ic=ham.querySelector('i');
    ic.classList.toggle('fa-bars');ic.classList.toggle('fa-times');
  });
  mm&&mm.querySelectorAll('a').forEach(function(l){l.addEventListener('click',function(){
    mm.classList.remove('open');
    var ic=ham.querySelector('i');ic.classList.add('fa-bars');ic.classList.remove('fa-times');
  })});
});
<script src="search.js"></script>
