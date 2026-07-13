#!/usr/bin/env python3
"""Build the Maphiri Books website HTML."""
import re
CSS = """
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Quicksand:wght@400;500;600;700&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Quicksand',sans-serif;color:#1A1A2E;background:#fff;overflow-x:hidden}
::-webkit-scrollbar{width:7px}::-webkit-scrollbar-thumb{background:#E91E8C;border-radius:4px}
a{text-decoration:none}
nav{position:sticky;top:0;z-index:100;background:rgba(255,255,255,0.97);backdrop-filter:blur(12px);border-bottom:2px solid rgba(233,30,140,0.1);padding:0 8vw;height:64px;display:flex;align-items:center;justify-content:space-between}
.logo{font-family:'Nunito',sans-serif;font-weight:900;font-size:1.3rem;color:#E91E8C}
.logo span{color:#2ECC71}
.nav-links{display:flex;gap:1.75rem;align-items:center}
.nav-links a{font-weight:600;font-size:0.88rem;color:#1A1A2E;transition:color 0.2s}
.nav-links a:hover{color:#E91E8C}
.btn-primary{background:#E91E8C;color:#fff;border:none;padding:0.6rem 1.5rem;border-radius:60px;font-weight:700;font-size:0.88rem;cursor:pointer;font-family:'Nunito',sans-serif;transition:all 0.2s;display:inline-block;text-decoration:none}
.btn-primary:hover{background:#d0177e;transform:translateY(-1px);box-shadow:0 4px 20px rgba(233,30,140,0.3)}
.btn-green{background:#2ECC71;color:#fff;border:none;padding:0.6rem 1.5rem;border-radius:60px;font-weight:700;font-size:0.88rem;cursor:pointer;font-family:'Nunito',sans-serif;transition:all 0.2s;display:inline-block;text-decoration:none}
.btn-green:hover{transform:translateY(-1px);box-shadow:0 4px 20px rgba(46,204,113,0.3)}
.hamburger{display:none;background:none;border:none;font-size:1.6rem;cursor:pointer;color:#1A1A2E}
section{padding:5rem 8vw}
.label{font-size:0.72rem;font-weight:800;color:#E91E8C;text-transform:uppercase;letter-spacing:3px;margin-bottom:0.5rem;display:block}
.h2{font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;margin-bottom:0.75rem;line-height:1.1}
.sub{color:#666;font-size:0.95rem;max-width:600px;line-height:1.7}
.hero{min-height:88vh;background:linear-gradient(135deg,#FFF0F7 0%,#1A1A2E 55%,#F0FFF5 100%);display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center;padding:4rem 8vw;position:relative;overflow:hidden}
.hero::before{content:'';position:absolute;inset:0;background:radial-gradient(circle 60% 80% at 80% 50%,rgba(233,30,140,0.08) 0%,transparent 70%),radial-gradient(circle 40% 50% at 20% 80%,rgba(46,204,113,0.08) 0%,transparent 60%);pointer-events:none}
.tagline{font-size:1rem;color:#555;font-weight:600;margin-bottom:1.5rem}
.book-title{font-family:'Nunito',sans-serif;font-size:clamp(2.2rem,4.5vw,3.8rem);font-weight:900;line-height:1.05;margin-bottom:0.5rem;letter-spacing:-0.02em}
.pink{color:#E91E8C}
.green{color:#2ECC71}
.isbn{font-size:0.82rem;color:#888;margin-bottom:2rem}
.actions{display:flex;gap:1rem;flex-wrap:wrap;margin-bottom:2rem}
.hero-art{display:flex;align-items:center;justify-content:center}
.sphere{width:min(380px,85%);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle at 35% 32%,#ff7dc4,#E91E8C 40%,#b8187a 70%,#7a1055);box-shadow:0 0 80px rgba(233,30,140,0.3),0 0 160px rgba(233,30,140,0.1),inset 0 0 60px rgba(255,255,255,0.1);animation:float 4s ease-in-out infinite;position:relative}
.sphere::before{content:'';position:absolute;top:11%;left:14%;width:28%;height:18%;background:rgba(255,255,255,0.2);border-radius:50%;filter:blur(6px)}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
.coin{position:absolute;border-radius:50%;background:linear-gradient(135deg,#f7d716,#2ECC71);box-shadow:0 2px 10px rgba(46,204,113,0.3);animation:coin-float 3s ease-in-out infinite}
@keyframes coin-float{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-18px) rotate(20deg)}}
.mq-a1{top:-10px;right:20%;width:26px;height:26px;animation-delay:0.3s}
.mq-a2{bottom:12%;right:-5%;width:20px;height:20px;animation-delay:0.9s}
.mq-a3{bottom:-2%;left:8%;width:22px;height:22px;animation-delay:1.5s}
.mq-a4{top:18%;left:-8%;width:15px;height:15px;animation-delay:2s}
.mq-wrap{background:#E91E8C;padding:0.65rem 0;overflow:hidden;white-space:nowrap}
.mq{display:inline-flex;gap:3rem;animation:mq 22s linear infinite;font-weight:800;font-size:0.82rem;color:#fff;letter-spacing:0.05em;text-transform:uppercase}
@keyframes mq{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
.buy-section{background:linear-gradient(180deg,#FFF0F7,#fff);text-align:center}
.retailer-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:1.25rem;max-width:950px;margin:2.5rem auto 0}
.retailer-card{display:flex;flex-direction:column;align-items:center;gap:0.6rem;padding:1.5rem 1.25rem;background:#fff;border-radius:20px;border:2px solid rgba(233,30,140,0.1);transition:all 0.2s;cursor:pointer;text-decoration:none;color:#1A1A2E;font-family:'Nunito',sans-serif}
.retailer-card:hover{border-color:#E91E8C;transform:translateY(-4px);box-shadow:0 12px 40px rgba(233,30,140,0.15)}
.ret-icon{font-size:2.2rem}
.ret-name{font-weight:800;font-size:0.95rem}
.ret-note{font-size:0.75rem;color:#888}
.ret-btn{display:inline-block;background:#E91E8C;color:#fff;font-weight:700;font-size:0.75rem;padding:0.4rem 1rem;border-radius:50px;transition:background 0.2s}
.retailer-card:hover .ret-btn{background:#d0177e}
.chapters-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:1.5rem;margin-top:2.5rem}
.chapter-card{background:#fff;border:2px solid rgba(233,30,140,0.08);border-radius:20px;padding:1.75rem;position:relative;overflow:hidden;transition:all 0.2s}
.chapter-card:hover{border-color:rgba(233,30,140,0.2);transform:translateY(-4px);box-shadow:0 12px 36px rgba(233,30,140,0.1)}
.chapter-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#E91E8C,#2ECC71)}
.ch-num{font-size:2.8rem;font-weight:900;color:rgba(233,30,140,0.12);line-height:1;margin-bottom:0.5rem;font-family:'Nunito',sans-serif}
.chapter-card h4{font-family:'Nunito',sans-serif;font-weight:800;font-size:0.95rem;margin-bottom:0.4rem}
.chapter-card p{font-size:0.83rem;color:#666;line-height:1.65}
.reviews-scroll{display:flex;gap:1.25rem;overflow-x:auto;padding-bottom:1rem;margin-top:2.5rem;scrollbar-width:thin}
.review-card{min-width:300px;background:linear-gradient(135deg,#FFF0F7,#fff);border:2px solid rgba(233,30,140,0.08);border-radius:20px;padding:1.5rem;flex-shrink:0}
.stars{color:#f7d716;font-size:0.95rem;margin-bottom:0.6rem}
.review-text{font-size:0.88rem;color:#333;line-height:1.7;margin-bottom:0.6rem;font-style:italic}
.review-source{font-size:0.75rem;color:#888;font-weight:600}
.char-section{background:#1A1A2E;color:#fff;position:relative;overflow:hidden;padding:5rem 8vw}
.char-section::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 80% at 80% 50%,rgba(233,30,140,0.1) 0%,transparent 70%);pointer-events:none}
.char-grid{display:grid;grid-template-columns:1fr 1.4fr;gap:4rem;align-items:center;margin-top:3rem}
.portrait{width:min(320px,80%);aspect-ratio:3/4;border-radius:28px;background:linear-gradient(135deg,rgba(233,30,140,0.1),rgba(46,204,113,0.1);border:3px solid rgba(233,30,140,0.2);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:2rem;margin:0 auto;position:relative}
.portrait-emoji{font-size:5rem;line-height:1;margin-bottom:1rem}
.portrait-name{font-family:'Nunito',sans-serif;font-size:1.4rem;font-weight:900;color:#fff}
.portrait-role{color:#E91E8C;font-weight:600;font-size:0.85rem;margin-top:0.3rem}
.portrait-tag{position:absolute;bottom:1rem;left:50%;transform:translateX(-50%);background:#E91E8C;color:#fff;font-size:0.68rem;font-weight:700;padding:0.3rem 0.9rem;border-radius:50px;white-space:nowrap}
.char-traits{display:flex;flex-wrap:wrap;gap:0.6rem;margin-bottom:1.5rem}
.char-trait{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);padding:0.35rem 0.9rem;border-radius:50px;font-size:0.8rem;font-weight:600;color:#fff;display:flex;align-items:center;gap:0.4rem}
.td-pink{width:6px;height:6px;border-radius:50%;background:#E91E8C;flex-shrink:0}
.td-green{width:6px;height:6px;border-radius:50%;background:#2ECC71;flex-shrink:0}
.char-text h3{font-family:'Nunito',sans-serif;font-size:1.3rem;font-weight:800;margin-bottom:1.25rem}
.char-text p{color:#bbb;line-height:1.8;font-size:0.92rem;margin-bottom:1rem}
.foundations-list{list-style:none;display:flex;flex-direction:column;gap:0.5rem}
.foundations-list li{display:flex;align-items:center;gap:0.75rem;font-size:0.88rem;color:#bbb}
.foundations-list li::before{content:'';width:7px;height:7px;border-radius:50%;background:#2ECC71;flex-shrink:0}
.author-section{background:linear-gradient(180deg,#fff,#F0FFF5);padding:5rem 8vw}
.author-grid{display:grid;grid-template-columns:1fr 1.5fr;gap:4rem;align-items:center;margin-top:3rem}
.author-photo{aspect-ratio:1;border-radius:24px;overflow:hidden;background:linear-gradient(135deg,#FFF0F7,#F0FFF5);border:3px solid rgba(233,30,140,0.1);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:2rem}
.author-emoji{font-size:4.5rem;margin-bottom:0.75rem}
.author-badge{background:#2ECC71;color:#fff;font-size:0.7rem;font-weight:700;padding:0.3rem 0.8rem;border-radius:50px;margin-top:0.75rem}
.author-info h3{font-family:'Nunito',sans-serif;font-size:1.9rem;font-weight:900;margin-bottom:0.4rem}
.role{color:#E91E8C;font-weight:700;font-size:0.88rem;margin-bottom:1.5rem}
.author-info p{color:#444;line-height:1.8;font-size:0.9rem;margin-bottom:0.75rem}
.author-links{display:flex;gap:0.75rem;flex-wrap:wrap;margin-top:1.5rem}
.author-links a{display:inline-flex;align-items:center;gap:0.4rem;background:#fff;border:2px solid #E91E8C;color:#E91E8C;font-weight:700;font-size:0.8rem;padding:0.45rem 1.1rem;border-radius:50px;font-family:'Nunito',sans-serif;transition:all 0.2s;text-decoration:none}
.author-links a:hover{background:#E91E8C;color:#fff}
.foundation-section{background:#1A1A2E;color:#fff;text-align:center;position:relative;overflow:hidden;padding:5rem 8vw}
.foundation-section::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 60% at 50% 100%,rgba(46,204,113,0.06) 0%,transparent 60%);pointer-events:none}
.foundation-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;margin-bottom:3rem}
.foundation-card{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:20px;padding:1.75rem;text-align:left;transition:all 0.2s}
.foundation-card:hover{border-color:rgba(46,204,113,0.3);transform:translateY(-3px)}
.fc-icon{font-size:2rem;margin-bottom:0.75rem}
.foundation-card h4{font-family:'Nunito',sans-serif;font-weight:800;font-size:0.95rem;margin-bottom:0.6rem}
.foundation-card p{font-size:0.83rem;color:#aaa;line-height:1.7}
.foundation-cta{display:inline-flex;align-items:center;gap:0.75rem;background:#2ECC71;color:#fff;font-family:'Nunito',sans-serif;font-weight:800;font-size:1rem;padding:1rem 2.5rem;border-radius:60px;border:none;cursor:pointer;transition:all 0.2s;text-decoration:none}
.foundation-cta:hover{background:#27ae60;transform:translateY(-2px);box-shadow:0 8px 30px rgba(46,204,113,0.3)}
.foundation-note{margin-top:1rem;font-size:0.8rem;color:#666}
.cta-band{background:linear-gradient(135deg,#E91E8C,#c0177e);text-align:center;padding:5rem 8vw;position:relative;overflow:hidden}
.cta-band::before{content:'';position:absolute;inset:0;background:radial-gradient(circle 50% 80% at 50% 50%,rgba(255,255,255,0.06) 0%,transparent 70%);pointer-events:none}
.cta-band h2{color:#fff;font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;margin-bottom:0.75rem}
.cta-band p{color:rgba(255,255,255,0.85);max-width:500px;margin:0 auto 2rem;font-size:0.95rem}
.btn-white-solid{background:#fff;color:#E91E8C;border:none;padding:1rem 2.5rem;border-radius:60px;font-family:'Nunito',sans-serif;font-weight:800;font-size:1rem;cursor:pointer;transition:all 0.2s;display:inline-block;text-decoration:none}
.btn-white-solid:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(0,0,0,0.2)}
footer{background:#1A1A2E;color:#fff;padding:4rem 8vw 2rem}
.footer-grid{display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:2.5rem;margin-bottom:3rem}
.footer-logo{font-family:'Nunito',sans-serif;font-weight:900;font-size:1.2rem;color:#E91E8C;margin-bottom:0.75rem}
.footer-logo span{color:#2ECC71}
.footer-desc{font-size:0.82rem;color:#777;line-height:1.7}
.footer-col h4{font-family:'Nunito',sans-serif;font-weight:800;font-size:0.78rem;color:#fff;text-transform:uppercase;letter-spacing:2px;margin-bottom:1rem}
.footer-col a{display:block;font-size:0.82rem;color:#777;margin-bottom:0.5rem;transition:color 0.2s}
.footer-col a:hover{color:#E91E8C}
.footer-bottom{border-top:1px solid rgba(255,255,255,0.06);padding-top:1.5rem;display:flex;justify-content:space-between;align-items:center;font-size:0.75rem;color:#555}
@media(max-width:900px){
.hero{grid-template-columns:1fr;padding:3.5rem 6vw;text-align:center}
.actions{justify-content:center}
.char-grid,.author-grid{grid-template-columns:1fr}
.foundation-grid{grid-template-columns:1fr}
.footer-grid{grid-template-columns:1fr 1fr}
section,.char-section,.foundation-section{padding:3.5rem 6vw}
.nav-links{display:none}
.hamburger{display:block}
}
@media(max-width:600px){
section,.char-section,.foundation-section{padding:3rem 5vw}
.footer-grid{grid-template-columns:1fr}
.footer-bottom{flex-direction:column;gap:0.5rem;text-align:center}
}"""

html = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Maphiri's Marvellous Money Moves | Children's Book by Keamogetswe Matsho</title>
<style>""" + CSS + """</style>
</head>
<body>
<nav>
  <div class="logo">&#128214; Maphiri<span>'s Books</span></div>
  <div class="nav-links">
    <a href="#home">Home</a>
    <a href="#about-book">About the Book</a>
    <a href="#meet-maphiri">Meet Maphiri</a>
    <a href="#author">Author</a>
    <a href="#foundation">Foundation</a>
    <a href="#buy" class="btn-primary">Buy Now &#8212; R250</a>
  </div>
  <button class="hamburger" onclick="document.getElementById('buy').scrollIntoView({behavior:'smooth'})">&#9776;</button>
</nav>
<div id="home" class="hero">
  <div>
    <p class="tagline">Financial Literacy for Kids &#183; Empowering Future Young Entrepreneurs</p>
    <h1 class="book-title"><span class="pink">Maphiri</span><br><span class="green">Marvellous</span><br>Money Moves</h1>
    <p class="isbn">by Keamogetswe Matsho &#183; ISBN: 978-1-77636-874-7</p>
    <div class="actions">
      <a href="#buy" class="btn-primary">&#128722; Buy the Book &#8212; R250</a>
      <a href="#about-book" class="btn-green">About the Book</a>
    </div>
    <p style="font-size:0.82rem;color:#888">Also at: Takealot &#183; Amazon &#183; dotdot.direct &#183; Apple Books &#183; Kindle</p>
  </div>
  <div class="hero-art">
    <div class="sphere">
      <div class="coin mq-a1"></div>
      <div class="coin mq-a2"></div>
      <div class="coin mq-a3"></div>
      <div class="coin mq-a4"></div>
    </div>
  </div>
</div>
<div class="mq-wrap">
  <div class="mq">
    <span>&#128214; Available Now on Takealot &#183; Amazon &#183; dotdot.direct &#183; Apple Books &#183; Kindle</span>
    <span>&#127760; Financial Literacy for Kids</span>
    <span>&#128176; Entrepreneurship &#183; Saving &#183; Market Day</span>
    <span>&#128214; For Ages 10&#8211;14</span>
    <span>&#127463;&#127799; Made in South Africa</span>
    <span>&#127775; A delightful read for the young and old</span>
    <span>&#128214; Available Now on Takealot &#183; Amazon &#183; dotdot.direct &#183; Apple Books &#183; Kindle</span>
    <span>&#127760; Financial Literacy for Kids</span>
    <span>&#128176; Entrepreneurship &#183; Saving &#183; Market Day</span>
    <span>&#128214; For Ages 10&#8211;14</span>
    <span>&#127463;&#127799; Made in South Africa</span>
    <span>&#127775; A delightful read for the young and old</span>
  </div>
</div>
<section id="buy" class="buy-section">
  <span class="label">// BUY THE BOOK</span>
  <h2 class="h2">Get Your Copy <span class="pink">Today</span></h2>
  <p class="sub" style="margin:0 auto 0.5rem">R250.00 &#183; ISBN 978-1-77636-874-7 &#183; Choose your preferred store:</p>
  <div class="retailer-grid">
    <a href="https://www.takealot.com" target="_blank" rel="noopener noreferrer" class="retailer-card"><div class="ret-icon">&#128992;</div><div class="ret-name">Takealot</div><div class="ret-note">R250 &#183; SA delivery</div><div class="ret-btn">Buy Now &#8594;</div></a>
    <a href="https://www.amazon.com/dp/1037090926" target="_blank" rel="noopener noreferrer" class="retailer-card"><div class="ret-icon">&#128309;</div><div class="ret-name">Amazon</div><div class="ret-note">Print + Kindle</div><div class="ret-btn">Buy Now &#8594;</div></a>
    <a href="https://dotdot.direct" target="_blank" rel="noopener noreferrer" class="retailer-card"><div class="ret-icon">&#128994;</div><div class="ret-name">dotdot.direct</div><div class="ret-note">SA school-friendly</div><div class="ret-btn">Buy Now &#8594;</div></a>
    <a href="https://books.apple.com/us/book/id6753307388" target="_blank" rel="noopener noreferrer" class="retailer-card"><div class="ret-icon">&#128992;</div><div class="ret-name">Apple Books</div><div class="ret-note">eBook &#183; $7.99</div><div class="ret-btn">Buy Now &#8594;</div></a>
    <a href="https://www.amazon.com/Maphiris-Marvellous-Money-Moves-ebook" target="_blank" rel="noopener noreferrer" class="retailer-card"><div class="ret-icon">&#128241;</div><div class="ret-name">Kindle</div><div class="ret-note">eBook</div><div class="ret-btn">Buy Now &#8594;</div></a>
  </div>
</section>
<section id="about-book">
  <span class="label">// ABOUT THE BOOK</span>
  <h2 class="h2">The <span class="pink">Story</span></h2>
  <p class="sub" style="margin-bottom:2.5rem">Follow Maphiri as she navigates friendships, family, entrepreneurial adventures, Grade 7 prefect duties, and an unexpected visitor that threatens to change everything.</p>
  <div class="chapters-grid">
    <div class="chapter-card"><div class="ch-num">01</div><h4>Meet Maphiri Monama</h4><p>We meet our fierce, ambitious 12-year-old protagonist navigating Grade 7 at Crowland Prep, Johannesburg.</p></div>
    <div class="chapter-card"><div class="ch-num">02</div><h4>Market Day Dreams</h4><p>The annual September Market Day sets Maphiri and her bestie Thembi on an entrepreneurial adventure.</p></div>
    <div class="chapter-card"><div class="ch-num">03</div><h4>The Valentine Venture</h4><p>Maphiri launches her first real business &#8212; selling roses and chocolates on Valentine&#8217;s Day.</p></div>
    <div class="chapter-card"><div class="ch-num">04</div><h4>Resilience in Action</h4><p>Things don&#8217;t go to plan. Maphiri learns what real entrepreneurship costs &#8212; and what it gives back.</p></div>
  </div>
</section>
<section style="padding:5rem 8vw;background:#fff">
  <span class="label">// WHAT READERS SAY</span>
  <h2 class="h2">Loved by <span class="green">Kids</span> &amp; Parents</h2>
  <div class="reviews-scroll">
    <div class="review-card"><div class="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div><p class="review-text">&#8220;Maphiri&#8217;s Marvellous Money Moves is a pleasant read that will delight the young and old. Many will relate and identify with Maphiri&#8217;s resilience and entrepreneurial spirit.&#8221;</p><p class="review-source">&#8212; Reader Review</p></div>
    <div class="review-card"><div class="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div><p class="review-text">&#8220;A delightful story that teaches financial literacy without being preachy. Kids will love Maphiri! A must-have for every South African home and classroom.&#8221;</p><p class="review-source">&#8212; Educator Review</p></div>
    <div class="review-card"><div class="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div><p class="review-text">&#8220;Finally, a South African children&#8217;s book that talks about entrepreneurship the right way. Rooted in real SA context. Highly recommended!&#8221;</p><p class="review-source">&#8212; Parent Review</p></div>
  </div>
</section>
<section id="meet-maphiri" class="char-section">
  <span class="label" style="color:#E91E8C">// MEET MAPIRI MONAMA</span>
  <h2 class="h2" style="color:#fff">The Girl Who <span class="green">Means Business</span></h2>
  <p class="sub" style="color:#aaa;margin-bottom:3rem">12 years old. Grade 7 at Crowland Prep, Johannesburg. One dream: to be just like her mother &#8212; a successful businesswoman.</p>
  <div class="char-grid">
    <div class="portrait"><div class="portrait-emoji">&#128589;&#127999;</div><div class="portrait-name">Maphiri Monama</div><div class="portrait-role">Grade 7 &#183; Crowland Prep</div><div class="portrait-tag">Age 12 &#183; Entrepreneur</div></div>
    <div class="char-text">
      <h3>The <span class="pink">ambitious</span>, the <span class="green">fearless</span>, the brilliant.</h3>
      <div class="char-traits">
        <div class="char-trait"><div class="td-pink"></div>Fierce</div>
        <div class="char-trait"><div class="td-green"></div>Ambitious</div>
        <div class="char-trait"><div class="td-pink"></div>Resilient</div>
        <div class="char-trait"><div class="td-green"></div>Courageous</div>
        <div class="char-trait"><div class="td-pink"></div>Driven</div>
        <div class="char-trait"><div class="td-green"></div>Innocent</div>
      </div>
      <p>Maphiri dreams bigger than her circumstances. With best friend Thembi at her side and a crush on John that complicates everything beautifully, she sets her sights on the Grade 7 Market Day &#8212; and the world of entrepreneurship &#8212; with more courage than most adults have in a lifetime.</p>
      <p>Her journey through Market Day Dreams and the Valentine Venture teaches her that business is not just about money &#8212; it is about resilience, creativity, and believing in yourself.</p>
      <ul class="foundations-list">
        <li>Best friend: Thembi &#8212; always in on the plan</li>
        <li>Crush: John &#8212; complicates everything beautifully</li>
        <li>Hero: Her mother &#8212; the businesswoman she wants to become</li>
        <li>School: Crowland Prep, Johannesburg</li>
        <li>Grade: 7 (Senior Primary)</li>
      </ul>
    </div>
  </div>
</section>
<section id="author" class="author-section">
  <span class="label">// ABOUT THE AUTHOR</span>
  <h2 class="h2">Meet <span class="pink">Keamogetswe Matsho</span></h2>
  <div class="author-grid">
    <div class="author-photo"><div class="author-emoji">&#128589;&#127999;&#8205;&#128187;</div><div style="font-family:'Nunito',sans-serif;font-weight:800;font-size:1.1rem;color:#1A1A2E;margin-top:0.75rem">Keamogetswe Matsho</div><div class="author-badge">Woolworths SA Youth Maker 2026</div></div>
    <div class="author-info">
      <h3>Keamogetswe Matsho</h3>
      <p class="role">Author &#183; Blogger &#183; Businesswoman &#183; Founder, Maphiri Foundation</p>
      <p>Keamogetswe Matsho is the author of Maphiri&#8217;s Marvellous Money Moves &#8212; a groundbreaking children&#8217;s novel bringing financial literacy and entrepreneurship to life through the adventures of a 12-year-old South African girl.</p>
      <p>Named one of Woolworths SA&#8217;s 2026 Youth Makers, Keamogetswe is on a mission to equip young people across Africa with the financial knowledge and entrepreneurial spirit they need to build their futures.</p>
      <p>Through Maphiri&#8217;s story, she shows children that entrepreneurship is not just for adults &#8212; it starts with an idea, a plan, and the courage to try.</p>
      <div class="author-links">
        <a href="https://www.instagram.com/maphiris_books" target="_blank" rel="noopener noreferrer">&#128247; @maphiris_books</a>
        <a href="https://www.amazon.com/Maphiris-Marvellous-Money-Moves/dp/1037090926" target="_blank" rel="noopener noreferrer">&#128218; Amazon Author</a>
        <a href="https://www.maphirisbooks.co.za" target="_blank" rel="noopener noreferrer">&#127760; Official Website</a>
      </div>
    </div>
  </div>
</section>
<section id="foundation" class="foundation-section">
  <span class="label" style="color:#2ECC71">// MAPIRI FOUNDATION</span>
  <h2 class="h2" style="color:#fff">Changing Lives, <span class="green">One Book</span> at a Time</h2>
  <p class="sub" style="color:#aaa;margin:0 auto 3rem">The Maphiri Foundation exists to bring financial literacy and entrepreneurial thinking to children across South Africa who need it most.</p>
  <div class="foundation-grid">
    <div class="foundation-card"><div class="fc-icon">&#128214;</div><h4>Book Distribution</h4><p>Placing copies in schools and libraries across SA to reach children who need them most.</p></div>
    <div class="foundation-card"><div class="fc-icon">&#128161;</div><h4>Financial Literacy Workshops</h4><p>Hosting workshops in under-resourced schools to teach entrepreneurship through Maphiri&#8217;s story.</p></div>
    <div class="foundation-card"><div class="fc-icon">&#127793;</div><h4>Young Entrepreneurs Mentorship</h