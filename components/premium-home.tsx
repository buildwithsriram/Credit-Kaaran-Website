"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import * as THREE from "three";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, CreditCard, RotateCcw, BookOpen, CalendarDays, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { CardFace, Questions, useWallet } from "@/components/site-shell";
import { brand, cards } from "@/lib/site-content";

const motionOff=()=>window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const compactView=()=>window.matchMedia("(max-width: 850px)").matches;

function LeatherWallet({kind,ready,order}:{kind:"cards"|"consultation";ready:boolean;order:number}) {
 const {openWallet}=useWallet(); const [eject,setEject]=useState(false); const [preview,setPreview]=useState(false); const timer=useRef<ReturnType<typeof setTimeout>|null>(null);
 useEffect(()=>()=>{if(timer.current)clearTimeout(timer.current);},[]);
 const reveal=()=>{if(eject)return;setEject(true);timer.current=setTimeout(()=>{openWallet(kind);setEject(false);},motionOff()?0:280);};
 const activate=()=>{
  if(!window.matchMedia("(hover: none), (pointer: coarse)").matches){reveal();return;}
  if(preview){reveal();return;}
  setPreview(true); if(timer.current)clearTimeout(timer.current); timer.current=setTimeout(()=>setPreview(false),2200);
 };
 const labels=kind==="cards"?["Travel & miles","Cashback","UPI & digital"]:["Card strategy","Your first card","Quick question"];
 return <div className={`leather-choice ${ready?"wallet-arrived":""} ${preview?"wallet-preview":""} ${eject?"wallet-eject":""}`} style={{"--order":order} as CSSProperties}>
  <button className={`leather-wallet leather-${kind}`} onClick={activate} onDoubleClick={reveal} aria-label={kind==="cards"?"Preview, then open the credit-card wallet":"Preview, then open the consultation wallet"} aria-pressed={preview} disabled={eject}>
   <span className="live-wallet-cards" aria-hidden="true">{labels.map((name,i)=><CardFace name={name} key={name} index={i} tone={i===0?"silver":i===1?"blue":"carbon"} footer={kind==="cards"?"FIND YOUR CARD":"PERSONAL GUIDANCE"}/>)}</span>
   <img className="leather-front" src={kind==="cards"?"/wallet-blue.webp":"/wallet-black.webp"} alt="" width="1000" height="667" draggable={false} fetchPriority="high"/>
   <span className="leather-stamp" aria-hidden="true"><span className="stamp-ck">ck.</span><span>{kind==="cards"?"APPLY FOR CARDS":"CONSULTATION"}</span><span className="stamp-line"/></span>
   <span className="wallet-hover-hint">{kind==="cards"?"Find your next card":"Find your session"}<ArrowUpRight size={16}/></span>
  </button>
  <p className="wallet-caption"><strong>{kind==="cards"?"Cards paakalama?":"Pesalama?"}</strong><span className="wallet-touch-help">Tap to preview · tap again to open</span><span className="wallet-desktop-help">Click to open</span></p>
 </div>;
}

const featuredSlugs=["axis-ace","scapia","hdfc-swiggy","hsbc-travelone","sbi-cashback"];
const testimonials=[
 {name:"Vasanth",note:"Arvind made card choice, reward use and everyday strategy practical and easy to understand.",date:"July 2026",photo:"/testimonials/portrait-1.jpg"},
 {name:"Pushparaj",note:"The session connected income, spending and an upcoming expense into one clear card plan.",date:"February 2026",photo:"/testimonials/portrait-3.jpg"},
 {name:"Ramkumar",note:"A simple framework for matching spending to reward tiers made future decisions feel easier.",date:"February 2026",photo:"/testimonials/portrait-6.jpg"},
];

function IntroReveal(){
 const root=useRef<HTMLElement>(null); const [progress,setProgress]=useState(0);
 const words="Naan Arvind. Unga spending-ku match aana card-a choose panna, rewards-a purinjikka, next money decision-a confidence-oda edukka help panren.".split(" ");
 useEffect(()=>{if(motionOff()){setProgress(1);return;}let raf=0;const update=()=>{raf=0;if(!root.current)return;const r=root.current.getBoundingClientRect();setProgress(Math.max(0,Math.min(1,(innerHeight*.78-r.top)/(r.height*.7))));};const scroll=()=>{if(!raf)raf=requestAnimationFrame(update);};update();window.addEventListener("scroll",scroll,{passive:true});window.addEventListener("resize",scroll);return()=>{window.removeEventListener("scroll",scroll);window.removeEventListener("resize",scroll);cancelAnimationFrame(raf);};},[]);
 return <section id="intro" className="intro-reveal section-wrap" ref={root}><h2 aria-label={words.join(" ")}>{words.map((word,i)=><span aria-hidden="true" key={i} className={word.replace(/[.,]/g,"")==="confidence-oda"?"intro-accent":"intro-word"} style={{opacity:.18+.82*Math.max(0,Math.min(1,progress*words.length-i))}}>{word} </span>)}</h2></section>;
}

function WalletScrollStory(){
 const section=useRef<HTMLElement>(null); const [amount,setAmount]=useState(0);
 useEffect(()=>{if(motionOff()){setAmount(1);return;}let raf=0;const measure=()=>{raf=0;const el=section.current;if(!el)return;const rect=el.getBoundingClientRect();const distance=Math.max(1,rect.height-innerHeight);const raw=Math.max(0,Math.min(1,-rect.top/distance));setAmount(raw*raw*(3-2*raw));};const onScroll=()=>{if(!raf)raf=requestAnimationFrame(measure);};measure();addEventListener("scroll",onScroll,{passive:true});addEventListener("resize",onScroll);return()=>{removeEventListener("scroll",onScroll);removeEventListener("resize",onScroll);cancelAnimationFrame(raf);};},[]);
 return <section id="card-story" ref={section} className="wallet-motion-story" style={{"--story-progress":amount,"--lift-progress":Math.max(0,Math.min(1,(amount-.04)/.78))} as CSSProperties}>
  <div className="wallet-motion-stage">
   <div className="motion-copy"><h2>Unga spend sollum:<br/><span>endha card veliya varanum.</span></h2><div className="motion-steps"><p className={amount<.38?"active":""}><b>01</b>First, unga spending pattern-a paarpom.</p><p className={amount>=.38&&amount<.72?"active":""}><b>02</b>Real value change panra details-a compare pannuvom.</p><p className={amount>=.72?"active":""}><b>03</b>Ovvvoru card-kum oru clear job kuduppom.</p></div></div>
   <div className="motion-wallet" aria-hidden="true"><span className="motion-card motion-card-one"><CardFace name="Travel" tone="silver" footer="MILES & STAYS"/></span><span id="cashback-source" className="motion-card motion-card-two"><CardFace name="Cashback" tone="blue" footer="EVERYDAY SPEND"/></span><span className="motion-card motion-card-three"><CardFace name="UPI" tone="carbon" footer="SCAN & PAY"/></span><img src="/wallet-blue.webp" alt="" width="1000" height="667"/></div>
   <span className="motion-progress">SCROLL <i style={{transform:`scaleX(${Math.max(.04,amount)})`}}/></span>
  </div>
 </section>;
}

function CashbackJourney(){
 const traveller=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  if(!traveller.current)return;
  const moving=traveller.current; let frame=0; let origin:DOMRect|null=null;
  const render=()=>{
   frame=requestAnimationFrame(render);
   const story=document.querySelector<HTMLElement>(".wallet-motion-story"); const source=document.querySelector<HTMLElement>("#cashback-source"); const destination=document.querySelector<HTMLElement>("#cashback-destination");
   if(!story||!source||!destination)return;
   if(motionOff()||compactView()){origin=null;source.style.opacity="";destination.style.setProperty("--cashback-arrival","1");moving.style.opacity="0";return;}
   const start=story.offsetTop+Math.max(0,story.offsetHeight-innerHeight)*.7;
   const destinationDocumentY=destination.getBoundingClientRect().top+scrollY;
   const end=destinationDocumentY-innerHeight*.48;
   const raw=Math.max(0,Math.min(1,(scrollY-start)/Math.max(1,end-start)));
   if(raw<=0){origin=null;source.style.opacity="";destination.style.setProperty("--cashback-arrival","0");moving.style.opacity="0";return;}
   if(!origin)origin=source.getBoundingClientRect();
   if(raw>=1){source.style.opacity="0";destination.style.setProperty("--cashback-arrival","1");moving.style.opacity="0";return;}
   const p=THREE.MathUtils.smootherstep(raw,0,1); const target=destination.getBoundingClientRect();
   const x=THREE.MathUtils.lerp(origin.left,target.left,p); const y=THREE.MathUtils.lerp(origin.top,target.top,p)-Math.sin(p*Math.PI)*Math.min(150,innerHeight*.18);
   const width=THREE.MathUtils.lerp(origin.width,target.width,p); const height=THREE.MathUtils.lerp(origin.height,target.height,p);
   source.style.opacity="0";destination.style.setProperty("--cashback-arrival","0");moving.style.opacity="1";
   moving.style.width=`${width}px`;moving.style.height=`${height}px`;moving.style.transform=`translate3d(${x}px,${y}px,0) perspective(1100px) rotateX(${Math.sin(p*Math.PI)*-8}deg) rotateY(${Math.sin(p*Math.PI)*20}deg) rotateZ(${THREE.MathUtils.lerp(-1.5,0,p)}deg)`;
  };
  render();return()=>{cancelAnimationFrame(frame);const source=document.querySelector<HTMLElement>("#cashback-source");const destination=document.querySelector<HTMLElement>("#cashback-destination");if(source)source.style.opacity="";if(destination)destination.style.removeProperty("--cashback-arrival");};
 },[]);
 return <div className="cashback-traveller" ref={traveller} aria-hidden="true"><CardFace name="Cashback" tone="blue" footer="EVERYDAY SPEND"/></div>;
}

function TestimonialSlider(){
 const count=testimonials.length;
 const [index,setIndex]=useState(0);
 const [drag,setDrag]=useState(0);
 const [live,setLive]=useState(false);
 const startX=useRef(0);
 const dragRef=useRef(0);
 const dragging=useRef(false);
 const swiped=useRef(false);
 const go=(i:number)=>{
  const next=(i%count+count)%count;
  setIndex(next);
  dragRef.current=0;
  setDrag(0);
  setLive(false);
  dragging.current=false;
 };
 const offsetOf=(i:number)=>{let d=i-index;if(d>count/2)d-=count;if(d<-count/2)d+=count;return d;};
 const endDrag=()=>{
  if(!dragging.current)return;
  dragging.current=false;
  const dx=dragRef.current;
  if(dx<-48)go(index+1);
  else if(dx>48)go(index-1);
  else{dragRef.current=0;setDrag(0);setLive(false);}
 };
 return <section className="testimonial-section testimonial-stage" data-reveal>
  <div className="section-wrap">
   <h2>Avanga questions.<br/><span>Avanga next steps.</span></h2>
  </div>
  <div className={`testimonial-coverflow ${live?"is-dragging":""}`} aria-label="Client notes" tabIndex={0}
   style={{"--drag":`${drag}px`} as CSSProperties}
   onKeyDown={e=>{if(e.key==="ArrowRight"){e.preventDefault();go(index+1);}if(e.key==="ArrowLeft"){e.preventDefault();go(index-1);}}}
   onPointerDown={e=>{if((e.target as HTMLElement).closest("button, .is-peek"))return;swiped.current=false;dragging.current=true;startX.current=e.clientX;dragRef.current=0;setLive(true);e.currentTarget.setPointerCapture(e.pointerId);}}
   onPointerMove={e=>{if(!dragging.current)return;const dx=e.clientX-startX.current;dragRef.current=dx;setDrag(dx);if(Math.abs(dx)>24)swiped.current=true;}}
   onPointerUp={endDrag}
   onPointerCancel={()=>{dragging.current=false;dragRef.current=0;setDrag(0);setLive(false);}}>
   {testimonials.map((item,i)=>{
    const offset=offsetOf(i);
    return <article key={item.name} className={`testimonial-card ${offset===0?"is-active":"is-peek"}`} style={{"--offset":offset,zIndex:10-Math.abs(offset)} as CSSProperties} onClick={()=>{if(!swiped.current&&offset!==0)go(i);}}>
     <div className="note-topline"><b>ck.</b><span className="note-marks"><span className="note-chip" aria-hidden="true"/><span className="note-contactless" aria-hidden="true"/></span></div>
     <header>
      <img src={item.photo} alt=""/>
      <div>
       <strong>{item.name}</strong>
       <span>{item.date}</span>
      </div>
     </header>
     <blockquote>{item.note}</blockquote>
     <footer>
      <span className="testimonial-stars" aria-label="Five star review">{[0,1,2,3,4].map(star=><Star key={star} size={13} fill="currentColor"/>)}</span>
      <span>paraphrased from Topmate</span>
     </footer>
    </article>;
   })}
  </div>
  <div className="testimonial-controls">
   <button type="button" aria-label="Previous note" onClick={()=>go(index-1)}><ChevronLeft size={18}/></button>
   <div className="testimonial-progress" style={{"--index":index,"--count":count} as CSSProperties}><i/></div>
   <button type="button" aria-label="Next note" onClick={()=>go(index+1)}><ChevronRight size={18}/></button>
  </div>
 </section>;
}
export function HomeExperience() {
 const [intro,setIntro]=useState<"open"|"closing"|"done">("open"); const [progress,setProgress]=useState(0); const [replay,setReplay]=useState(0); const {openWallet}=useWallet();
 useEffect(()=>{
  let live=true; let done:ReturnType<typeof setTimeout>; let tick:ReturnType<typeof setInterval>;
  try{if(replay===0&&(sessionStorage.getItem("ck-entrance-v6")==="seen"||new URLSearchParams(window.location.search).has("wallet"))){setIntro("done");return;}}catch{}
  if(motionOff()){setIntro("done");return;}
  setIntro("open");setProgress(8);tick=setInterval(()=>setProgress(v=>Math.min(v+11,92)),100);
  Promise.allSettled([document.fonts.ready,...["/wallet-blue.webp","/wallet-black.webp"].map(src=>new Promise<void>(resolve=>{const image=new Image();image.onload=image.onerror=()=>resolve();image.src=src;}))]).then(()=>{if(!live)return;setProgress(100);done=setTimeout(()=>{setIntro("closing");done=setTimeout(()=>{setIntro("done");try{sessionStorage.setItem("ck-entrance-v6","seen");}catch{}},520);},520);});
  return()=>{live=false;clearInterval(tick);clearTimeout(done);};
 },[replay]);
 useEffect(()=>{const items=Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));if(motionOff()){items.forEach(el=>el.classList.add("is-revealed"));return;}const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){(entry.target as HTMLElement).classList.add("is-revealed");observer.unobserve(entry.target);}}),{threshold:.14,rootMargin:"0px 0px -8%"});items.forEach(el=>observer.observe(el));return()=>observer.disconnect();},[]);
 const finish=()=>{setIntro("closing");setTimeout(()=>setIntro("done"),520);try{sessionStorage.setItem("ck-entrance-v6","seen");}catch{}};
 const featured=featuredSlugs.map(slug=>cards.find(card=>card.slug===slug)).filter(Boolean) as typeof cards;
 return <>
  <main id="main-content">
   <section className={`premium-hero story-hero glass-hero ${intro==="done"?"hero-entered":""}`}>
    <div className="hero-ambient" aria-hidden="true"/><div className="hero-glass-light" aria-hidden="true"/>
    <div className="hero-heading"><div className="hero-title-target"><p className="hero-person">Vanakkam, naan Arvind.</p><h1><span>Unga Credit</span><br/>Kaaran<span className="hero-period">.</span></h1></div><p className="hero-intro">Cards-a smart-ah choose pannunga.<br/>Rewards-a full-ah use pannunga.</p></div>
    <p className="wallet-open-instruction">Rendu wallets. Unga next step.</p>
    <div className="hero-wallets"><LeatherWallet kind="cards" ready={intro==="done"} order={0}/><LeatherWallet kind="consultation" ready={intro==="done"} order={1}/></div>
    <a className="hero-story-cue" href="#intro">Scroll to see the story<ArrowDown size={16}/></a>
   </section>

   <IntroReveal/>

   <WalletScrollStory/>

   <CashbackJourney/>

   <section className="picks-section"><div className="section-wrap"><h2 className="picks-title">Arvind-oda<br/><span>starting points.</span></h2><div className="picks-rail" aria-label="Credit card slider"><Link id="cashback-destination" href="/cards/cashback" className="matte-pick matte-cashback cashback-destination" aria-label="Explore cashback cards"><CardFace name="Cashback" kicker="CREDIT KAARAN" tone="blue" footer="EVERYDAY SPEND"/></Link>{featured.map((card,i)=><Link href={`/card/${card.slug}`} className={`matte-pick matte-${i}`} key={card.slug} aria-label={`Explore ${card.name}`}><CardFace name={card.name} kicker={card.issuer} tone={card.tone} footer={card.categories[0].toUpperCase()}/></Link>)}</div><div className="slider-controls"><button aria-label="Previous credit cards" onClick={e=>e.currentTarget.parentElement?.previousElementSibling?.scrollBy({left:-340,behavior:"smooth"})}>←</button><span>Swipe pannunga · details-ku card-a tap pannunga</span><button aria-label="Next credit cards" onClick={e=>e.currentTarget.parentElement?.previousElementSibling?.scrollBy({left:340,behavior:"smooth"})}>→</button></div></div></section>

   <section className="impact-section section-wrap bento-impact" data-reveal>
    <h2>Numbers sollum.<br/><span>Clarity dhaan namma goal.</span></h2>
    <div className="impact-bento">
     <article className="bento-community"><span className="bento-value">27K<span>+</span></span><h3>Ore community.<br/>Better card decisions.</h3><p>Across social, unga questions dhaan conversation-a start pannudhu.</p><a href={brand.instagram} target="_blank" rel="noreferrer" className="text-link">Community-a paarunga<ArrowUpRight size={18}/></a></article>
     <article className="bento-rating"><div className="bento-stars" aria-label="Five out of five">{[0,1,2,3,4].map(n=><Star key={n} size={19} fill="currentColor"/>)}</div><span className="bento-value">5<span>/5</span></span><h3>31 ratings.<br/>Avanga experience.</h3></article>
     <article className="bento-bookings"><span className="bento-value">61</span><div><h3>Conversations.<br/>Clearer next steps.</h3><p>Topmate bookings</p></div></article>
     <article className="bento-cards"><span className="bento-value">35</span><h3>Cards. Oru clear purpose.</h3><p>Mapped by how you spend.</p><Link href="/cards" className="text-link">Cards-a explore pannunga<ArrowUpRight size={18}/></Link></article>
     <a className="bento-profile" href={brand.topmate} target="_blank" rel="noreferrer"><span>Oru conversation-la<br/><strong>start pannalama?</strong></span><span className="bento-profile-link">Arvind-oda Topmate profile<ArrowUpRight size={22}/></span></a>
    </div>
   </section>

   <TestimonialSlider/>

   <section className="learn-section section-wrap" data-reveal><div className="course-bridge"><div><span className="eyebrow">CIBIL BOOSTER · 6–8 HOURS</span><h2>Suggestion-la start pannunga.<br/><span>Decision-a neengale edukka kathukonga.</span></h2><p>Understand scores, borrowing behaviour, card selection and the habits behind a healthier credit profile. Planned price range: ₹3,000–₹5,000.</p><Link href="/courses" className="button button-dark">Course-a explore pannunga<BookOpen size={18}/></Link></div><CardFace name="CIBIL Booster" tone="carbon" kicker="CREDIT KAARAN COURSE" footer="LEARN AT YOUR PACE"/></div>
    <div className="webinar-bridge"><div><CalendarDays size={28}/><span className="eyebrow">MONTHLY · 2 HOURS · ₹400</span><h3>Live-ah learn pannalama?</h3><p>Join a guided session from credit-card basics to advanced rewards, with room for the questions everyone is thinking.</p></div><Link href="/webinars" className="button button-outline">Next webinar-a paarunga<ArrowUpRight size={18}/></Link></div>
   </section>

   <section className="apply-banner section-wrap" data-reveal><div><h2>Choose a use case.<br/><span>Find your next card.</span></h2><p>No long on-site form. No PAN or income stored here. Review the card, then continue securely to the provider.</p></div><button className="button button-light" onClick={()=>openWallet("cards")}>Apply for a credit card<CreditCard size={19}/></button></section>

   <section className="faq-section section-wrap"><div><h2>A few things<br/><span>worth knowing.</span></h2></div><Questions/></section>
   <section className="closing-section section-wrap"><h2>Card venuma?<br/><span>Clarity venuma?</span></h2><div className="button-row"><button className="button button-dark" onClick={()=>openWallet("cards")}>Find a card<ArrowUpRight size={18}/></button><Link className="button button-outline" href="/consultation/quick-question">Quick 1:1 Consultation<ArrowUpRight size={18}/></Link></div><button className="replay-button text-link" onClick={()=>{window.scrollTo({top:0,behavior:"instant"});setReplay(v=>v+1);}}><RotateCcw size={14}/>Replay intro</button></section>
  </main>
  {intro!=="done"&&<div className={`welcome-screen welcome-simple welcome-${intro}`} role="status" aria-label="Credit Kaaran is loading"><button className="skip-welcome" onClick={finish}>Skip<ArrowRight size={16}/></button><div className="welcome-loader"><span className="welcome-centered-logo"><span className="ck-monogram">c<span>k</span><i/></span><span>Credit Kaaran</span></span><Progress value={progress} aria-label="Loading Credit Kaaran"/><span className="loader-percentage">{progress}%</span></div></div>}
 </>;
}
