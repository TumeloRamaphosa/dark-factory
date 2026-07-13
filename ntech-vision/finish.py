html=open('/workspace/ntech-vision/index.html').read()
footer="""<p class="fk">
Computer Vision Partnership · Technology Partners<br/>
Ntech Lab — ntech.ai — Moscow, Russia<br/>
Studex Global Markets — ICVMS VM Network<br/>
Johannesburg, South Africa
</p>
<div class="flinks">
<a href="#solutions">Solutions</a>
<a href="#partnership">Partnership</a>
<a href="#demo">Demo</a>
<a href="mailto:hello@studexglobalmarkets.com">Email</a>
</div>
</div>
<div style="text-align:right">
<div class="fk">
<strong style="color:var(--muted)">FNB Banking</strong><br/>
Studex Global Markets<br/>
Acc: 62760837610<br/>
Branch: Woodmead · Code: 250-655
</div>
</div>
</div>
</footer>
<script>
(function(){
  var c=document.getElementById('hc');
  if(!c)return;
  var x=c.getContext('2d'),t=0;
  var nodes=[
    {a:0,c:'#00d4ff'},
    {a:72,c:'#6c63ff'},
    {a:144,c:'#ec4899'},
    {a:216,c:'#f59e0b'},
    {a:288,c:'#00ff88'}
  ];
  function rz(){c.width=c.offsetWidth||1200;c.height=500;}
  function dw(){
    if(!x)return;
    var W=c.width,H=500;t+=0.004;
    x.clearRect(0,0,W,H);
    var cx=W/2,cy=H/2,d=Math.min(W,H)*0.32;
    nodes.forEach(function(n,i){
      var r=(n.a+t*18)*Math.PI/180;
      var nx=cx+d*Math.cos(r-Math.PI/2),ny=cy+d*Math.sin(r-Math.PI/2);
      x.beginPath();x.moveTo(cx,cy);x.lineTo(nx,ny);
      x.strokeStyle=n.c+'14';x.lineWidth=1;x.stroke();
      var g=x.createRadialGradient(nx,ny,0,nx,ny,28);
      g.addColorStop(0,n.c+'20');g.addColorStop(1,'transparent');
      x.beginPath();x.arc(nx,ny,28,0,Math.PI*2);x.fillStyle=g;x.fill();
      x.beginPath();x.arc(nx,ny,4,0,Math.PI*2);
      x.fillStyle=n.c;x.shadowColor=n.c;x.shadowBlur=10;x.fill();x.shadowBlur=0;
    });
    x.beginPath();x.arc(cx,cy,6,0,Math.PI*2);
    x.fillStyle='#00d4ff';x.shadowColor='#00d4ff';x.shadowBlur=14;x.fill();x.shadowBlur=0;
    requestAnimationFrame(dw);
  }
  var ro=new ResizeObserver(rz);ro.observe(c);rz();dw();
})();
function subDemo(){
  var fs=document.querySelectorAll('.fi');
  var n=fs[0].value,e=fs[1].value;
  if(!n||!e){alert('Please fill in your name and email');return;}
  window.location.href='mailto:hello@studexglobalmarkets.com?subject=CV Demo Request — '+encodeURIComponent(n)+'&body='+encodeURIComponent('Name: '+n+'\nEmail: '+e+'\n\nI would like to see a live demo of the Ntech Lab computer vision solutions.');
}
</script>
</body></html>"""
open('/workspace/ntech-vision/index.html','a').write(footer)
import os
print('Done, total size:',os.path.getsize('/workspace/ntech-vision/index.html'))
