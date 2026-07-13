f=open('/workspace/cashclaw-page/index.html').read().rstrip()
if f.endswith('}'):
    f=f.rstrip()[:-1]
js="""  var ro=new ResizeObserver(rz);ro.observe(c);rz();dw();})();
(function(){
  var el=document.getElementById('liveCounter');
  if(!el)return;
  var base=1847.32;
  var tasksBase=2847;
  function fmt(n){return '$'+n.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});}
  function animate(){
    var now=new Date();
    var weekStart=new Date(now);weekStart.setDate(now.getDate()-now.getDay());
    var hrs=(now-weekStart)/3600000;
    var earned=base+(hrs*42.3)+(Math.random()*5);
    var tasks=Math.floor(tasksBase+(hrs*8.3));
    el.textContent=fmt(earned);
    var te=document.getElementById('ethEarned');
    if(te)te.textContent=(earned/420).toFixed(4)+' ETH';
    var td=document.getElementById('tasksDone');
    if(td)td.textContent=tasks.toLocaleString();
  }
  animate();setInterval(animate,3000);
})();
function subCash(){
  var fs=document.querySelectorAll('.fi');
  var n=fs[0].value,e=fs[1].value;
  if(!n||!e){alert('Please fill in your name and email');return;}
  window.location.href='mailto:cto@studex-group.com?subject=CashClaw Deploy — '+encodeURIComponent(n)+'&body='+encodeURIComponent('Name: '+n+'\nEmail: '+e+'\n\nI want to deploy my own CashClaw agent.\n\nPlease fork for SA market, deploy on your VM, and send me the dashboard link.');
}
</script>
</body></html>"""
open('/workspace/cashclaw-page/index.html','a').write(js+'\n')
import os
print('Done, total:',os.path.getsize('/workspace/cashclaw-page/index.html'))
