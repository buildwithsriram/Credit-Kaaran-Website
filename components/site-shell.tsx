"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Menu, X, Wallet, Plane, ScanLine, Fuel, Sparkles, Utensils, Ticket, Globe2, ShieldCheck, GraduationCap, CreditCard, MessageCircle, CalendarDays, BookOpen, ChevronRight, Check, Camera as Instagram } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { brand, categories, cards, services, faqs, money } from "@/lib/site-content";

type WalletKind="cards"|"consultation";
const WalletContext=createContext<{openWallet:(kind:WalletKind)=>void}>({openWallet:()=>{}});
export const useWallet=()=>useContext(WalletContext);
export function Icon({name,size=22}:{name:string;size?:number}) {
 const icons:{[name:string]:typeof Wallet}={wallet:Wallet,plane:Plane,scan:ScanLine,fuel:Fuel,sparkles:Sparkles,dining:Utensils,ticket:Ticket,globe:Globe2,shield:ShieldCheck,graduation:GraduationCap,call:CalendarDays,message:MessageCircle,plan:BookOpen};
 const C=icons[name]||CreditCard;return <C size={size} strokeWidth={1.5} aria-hidden="true"/>;
}
export function Wordmark({light=false}:{light?:boolean}) {return <Link href="/" className={`wordmark ${light?"wordmark-light":""}`} aria-label="Credit Kaaran home"><span className="ck-monogram">c<span>k</span><i/></span><span className="wordmark-name">credit kaaran<span>YOUR CREDIT CARD GUIDE</span></span></Link>;}
export function CardFace({name,kicker="CREDIT KAARAN",tone="blue",footer="THE COLLECTION",className="",index=0}:{name:string;kicker?:string;tone?:string;footer?:string;className?:string;index?:number}) {return <span className={`card-face card-${tone} ${className}`} style={{"--index":index} as CSSProperties}><span className="card-topline">{kicker}<span className="card-ck">ck.</span></span><span className="card-chip"><CreditCard size={30} strokeWidth={.8}/></span><strong>{name}</strong><span className="card-bottomline"><span>{footer}</span><span className="card-contactless">)))</span></span></span>;}
export function CategoryCard({category,index=0,onSelect,onChoose}:{category:typeof categories[number];index?:number;onSelect?:()=>void;onChoose?:()=>void}) {
 const content=<CardFace name={category.name} tone={category.tone} footer={cards.filter(card=>card.categories.includes(category.slug)).length+" CARDS · "+category.short}/>;
 return onSelect?<button className="category-card" style={{"--index":index} as CSSProperties} onClick={onSelect}>{content}</button>:<Link className="category-card" href={`/cards/${category.slug}`} onClick={onChoose} style={{"--index":index} as CSSProperties}>{content}</Link>;
}
export function CategoryTiles({onChoose}:{onChoose?:()=>void}) {return <div className="category-tiles wallet-stack">{categories.map((c,i)=><Link key={c.slug} href={`/cards/${c.slug}`} className={`category-tile category-${c.tone}`} onClick={onChoose} style={{"--index":i} as CSSProperties}><div className="tile-top"><Icon name={c.icon}/><span>{cards.filter(card=>card.categories.includes(c.slug)).length} cards</span></div><h3>{c.name}</h3><div className="tile-bottom"><p>{c.short}</p><span className="circle-link"><ArrowUpRight size={19}/></span></div></Link>)}</div>;}
function WalletCardCollection({onClose}:{onClose:()=>void}) {
 return <div className="category-card-grid">{categories.map((category,index)=><CategoryCard key={category.slug} category={category} index={index} onChoose={onClose}/>)}</div>;
}
export function ServiceTiles({onChoose}:{onChoose?:()=>void}) {return <div className="service-tiles">{services.map((s,i)=><Link href={`/consultation/${s.slug}`} key={s.slug} onClick={onChoose} className={`service-tile service-tone-${i%3}`} style={{"--index":i} as CSSProperties}><div className="tile-top"><Icon name={s.format}/><span>{s.format==="call"?"1:1 VIDEO CALL":s.format==="message"?"PERSONAL SUPPORT":"YEARLY PLAN"}</span></div><h3>{s.name}</h3><p>{s.label}</p><div className="service-tile-bottom"><span>{s.duration}<strong>{money(s.price)}</strong></span><span className="circle-link"><ArrowUpRight size={19}/></span></div></Link>)}</div>;}

export function SiteShell({children}:{children:ReactNode}) {
 const path=usePathname();const [menu,setMenu]=useState(false);const [collection,setCollection]=useState<WalletKind|null>(null);const [compact,setCompact]=useState<boolean|null>(null);const opener=useRef<HTMLElement|null>(null);const collectionRoot=useRef<HTMLDivElement>(null);
 const closeCollection=()=>{setCollection(null);const q=new URLSearchParams(window.location.search);q.delete("wallet");window.history.replaceState(null,"",window.location.pathname+(q.size?`?${q}`:""));};
 const openWallet=(kind:WalletKind)=>{opener.current=document.querySelector<HTMLElement>(".wallet-eject .leather-wallet")||document.activeElement as HTMLElement;setCollection(kind);const q=new URLSearchParams(window.location.search);q.set("wallet",kind);window.history.pushState(null,"",`${window.location.pathname}?${q}`);};
 useEffect(()=>{const read=()=>{const kind=new URLSearchParams(window.location.search).get("wallet");setCollection(kind==="cards"||kind==="consultation"?kind:null);};read();window.addEventListener("popstate",read);return()=>window.removeEventListener("popstate",read);},[]);
 useEffect(()=>{setMenu(false);const kind=new URLSearchParams(window.location.search).get("wallet");setCollection(kind==="cards"||kind==="consultation"?kind:null);},[path]);
 useEffect(()=>{const q=matchMedia("(max-width: 1100px)");const sync=()=>setCompact(q.matches);sync();q.addEventListener("change",sync);return()=>q.removeEventListener("change",sync);},[]);
 useEffect(()=>{
  if(!collection||compact===null)return;
  const frame=requestAnimationFrame(()=>{
   const root=collectionRoot.current;if(!root||matchMedia("(prefers-reduced-motion: reduce)").matches)return;
   const source=opener.current?.getBoundingClientRect();
   root.querySelectorAll<HTMLElement>(".category-card,.service-tile").forEach((card,i)=>{
    const target=card.getBoundingClientRect();
    const x=source?source.left+source.width/2:innerWidth/2;
    const y=source?source.top+source.height/2:innerHeight*.8;
    card.animate([{transform:`translate(${x-target.left-target.width/2}px,${y-target.top-target.height/2}px) scale(.38) rotate(${(i%3-1)*9}deg)`,opacity:1},{transform:"translate(0,0) scale(1) rotate(0deg)",opacity:1}],{duration:850,delay:i*35,easing:"cubic-bezier(.16,1,.3,1)",fill:"backwards"});
   });
  });return()=>cancelAnimationFrame(frame);
 },[collection,compact]);
 const nav=[{href:"/cards",label:"Apply for cards"},{href:"/consultation",label:"Consultation"},{href:"/courses",label:"Courses"},{href:"/webinars",label:"Webinars"},{href:"/redemption",label:"Redemption"}];
 return <WalletContext.Provider value={{openWallet}}><a href="#main-content" className="skip-link">Skip to content</a><header className="main-header"><Wordmark/><nav className="desktop-nav" aria-label="Main navigation">{nav.map(n=><Link href={n.href} key={n.href} onClick={e=>{if(n.href==="/cards"){e.preventDefault();openWallet("cards");}}} aria-current={path.startsWith(n.href)?"page":undefined}>{n.label}</Link>)}</nav><div className="header-end"><Link className="header-consultation" href="/consultation/quick-question">Quick 1:1 Consultation<ArrowUpRight size={16}/></Link><button className="menu-button" onClick={()=>setMenu(true)} aria-label="Open menu"><Menu size={23}/></button></div></header>
 <div className="site-body">{children}</div>
 <footer className="main-footer"><div className="footer-top"><div><Wordmark light/><p>Clarity before credit.<br/>In a language that feels like you.</p><a href={brand.instagram} className="footer-social" target="_blank" rel="noreferrer"><Instagram size={19}/>@creditkaaaran<ArrowUpRight size={16}/></a></div><div className="footer-nav"><div><span>EXPLORE</span><Link href="/cards">Find a card</Link><Link href="/consultation">Consultation</Link><Link href="/redemption">Redeem points</Link></div><div><span>KEEP LEARNING</span><Link href="/courses">Courses</Link><Link href="/webinars">Webinars</Link><Link href="/about">About Arvind</Link></div><div><span>GOOD TO KNOW</span><Link href="/privacy">Privacy</Link><Link href="/disclosures">Disclosures</Link><Link href="/contact">Get in touch</Link></div></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Credit Kaaran</span><p>Educational information. Not financial advice. Card approval and final terms are the issuer’s decision.</p></div></footer>
 <Sheet open={menu} onOpenChange={setMenu}><SheetContent className="mobile-nav-sheet translate-x-0 translate-y-0"><SheetTitle>Where to next?</SheetTitle><SheetDescription>Choose your next step with Credit Kaaran.</SheetDescription><nav aria-label="Mobile navigation">{[{href:"/",label:"Home"},...nav,{href:"/about",label:"About Arvind"}].map((n,i)=><Link href={n.href} key={n.href} onClick={e=>{setMenu(false);if(n.href==="/cards"){e.preventDefault();openWallet("cards");}}}><span className="nav-number">0{i+1}</span>{n.label}<ArrowUpRight size={20}/></Link>)}</nav><a className="text-link" href={brand.instagram} target="_blank" rel="noreferrer"><Instagram size={18}/>Back to Instagram</a></SheetContent></Sheet>
 <Dialog open={!!collection&&compact!==null} onOpenChange={v=>!v&&closeCollection()}><DialogContent ref={collectionRoot} className={`wallet-dialog wallet-unfold ${compact?"top-0 left-0 translate-x-0 translate-y-0 max-w-none sm:max-w-none":""} ${compact&&collection==="cards"?"mobile-wallet-layer":""} wallet-dialog-${collection||"closed"}`} showCloseButton={false} onOpenAutoFocus={e=>{e.preventDefault();collectionRoot.current?.querySelector<HTMLButtonElement>(".collection-heading button")?.focus({preventScroll:true});}} onCloseAutoFocus={e=>{e.preventDefault();opener.current?.focus();}}><div className="dialog-grip"/><div className="collection-heading"><div><span className="eyebrow">{collection==="cards"?"YOUR CARD WALLET":"YOUR CONSULTATION WALLET"}</span><DialogTitle>{collection==="cards"?"What’s your kind of card?":"A conversation, just for you."}</DialogTitle><DialogDescription>{collection==="cards"?"Start with what you spend on. Explore the details from there.":"Choose what you need help with. We’ll take it from there."}</DialogDescription></div><button className="round-button" onClick={closeCollection} aria-label="Close wallet"><X size={22}/></button></div>{collection==="cards"?<WalletCardCollection onClose={closeCollection}/>:<ServiceTiles onChoose={closeCollection}/>}<div className="collection-footer"><button className="text-link" onClick={closeCollection}><ArrowLeft size={17}/>Back to wallets</button><Link className="text-link" onClick={closeCollection} href={collection==="cards"?"/cards":"/consultation"}>View all {collection==="cards"?"cards":"sessions"}<ArrowRight size={17}/></Link></div></DialogContent></Dialog>
 </WalletContext.Provider>;
}
export function Breadcrumbs({items}:{items:{label:string;href?:string}[]}) {return <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link>{items.map((it,i)=><span key={i}><ChevronRight size={13}/>{it.href?<Link href={it.href}>{it.label}</Link>:<span aria-current="page">{it.label}</span>}</span>)}</nav>;}
export function PageHeading({eyebrow,title,text,children}:{eyebrow:string;title:ReactNode;text?:string;children?:ReactNode}) {return <div className="page-heading"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1>{text&&<p>{text}</p>}{children}</div>;}
export function Questions({items=faqs}:{items?:{q:string;a:string}[]}) {return <Accordion type="single" collapsible className="questions">{items.map((f,i)=><AccordionItem value={`q-${i}`} key={f.q}><AccordionTrigger>{f.q}</AccordionTrigger><AccordionContent>{f.a}</AccordionContent></AccordionItem>)}</Accordion>;}
export function TickList({items}:{items:string[]}) {return <ul className="tick-list">{items.map(t=><li key={t}><Check size={18}/><span>{t}</span></li>)}</ul>;}
