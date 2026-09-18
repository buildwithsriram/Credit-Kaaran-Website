"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Search, X, Info, CreditCard, CalendarDays, Check, ExternalLink, MessageCircle } from "lucide-react";
import { SidebarProvider, Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { brand, categories, cards, services, categoryBySlug, money, type CardRecord, type Category, type Service } from "@/lib/site-content";
import { Breadcrumbs, CardFace, Icon, PageHeading, ServiceTiles, TickList, Questions } from "@/components/site-shell";

export function ProductTile({card,onApply}:{card:CardRecord;onApply?:(card:CardRecord)=>void}) {return <article className="card-product"><Link className="card-product-link" href={`/card/${card.slug}`}><div className="card-product-art"><CardFace name={card.name} tone={card.tone} kicker={card.issuer} footer="CREDIT KAARAN COLLECTION"/></div><div className="card-product-info"><span className="eyebrow">{card.issuer}</span><h3>{card.name}</h3><p>{card.summary}</p><span className="text-link">View details<ArrowUpRight size={17}/></span></div></Link>{onApply&&<button className="quick-apply" onClick={()=>onApply(card)}>Apply<ArrowRight size={15}/></button>}</article>;}

const deckSlides=[{slug:"all",name:"All cards",tone:"blue",kicker:"CREDIT KAARAN",footer:`${cards.length} CARDS · THE COLLECTION`},...categories.map(c=>({slug:c.slug,name:c.name,tone:c.tone,kicker:"CREDIT KAARAN",footer:`${cards.filter(card=>card.categories.includes(c.slug)).length} CARDS · ${c.short.toUpperCase()}`}))] as const;

function CategoryDeck({category,onBrowse}:{category?:Category;onBrowse:(slug:string)=>void}) {
 const rail=useRef<HTMLDivElement>(null);
 const quiet=useRef(false);
 const activeIndex=Math.max(0,deckSlides.findIndex(slide=>category?slide.slug===category.slug:slide.slug==="all"));
 const [index,setIndex]=useState(activeIndex);
 const centerCard=(el:HTMLElement,i:number,behavior:ScrollBehavior="smooth")=>{
  const card=el.children[i] as HTMLElement|undefined;
  if(!card)return;
  el.scrollTo({left:card.offsetLeft-(el.clientWidth-card.offsetWidth)/2,behavior});
 };
 useEffect(()=>{
  setIndex(activeIndex);
  const el=rail.current; if(!el)return;
  quiet.current=true;
  requestAnimationFrame(()=>centerCard(el,activeIndex,"auto"));
  const timer=window.setTimeout(()=>{quiet.current=false;},180);
  return()=>window.clearTimeout(timer);
 },[activeIndex]);
 useEffect(()=>{
  const el=rail.current; if(!el)return;
  let frame=0; let settle:ReturnType<typeof setTimeout>|undefined;
  const nearest=()=>{
   const center=el.scrollLeft+el.clientWidth/2;
   let best=0; let distance=Infinity;
   Array.from(el.children).forEach((node,i)=>{
    const card=node as HTMLElement;
    const gap=Math.abs(card.offsetLeft+card.offsetWidth/2-center);
    if(gap<distance){distance=gap;best=i;}
   });
   return best;
  };
  const onScroll=()=>{
   if(!frame)frame=requestAnimationFrame(()=>{frame=0;setIndex(nearest());});
   window.clearTimeout(settle);
   settle=setTimeout(()=>{
    if(quiet.current)return;
    onBrowse(deckSlides[nearest()].slug);
   },90);
  };
  el.addEventListener("scroll",onScroll,{passive:true});
  return()=>{el.removeEventListener("scroll",onScroll);cancelAnimationFrame(frame);window.clearTimeout(settle);};
 },[onBrowse]);
 const go=(i:number)=>{
  const el=rail.current;
  if(el){quiet.current=true;centerCard(el,i);window.setTimeout(()=>{quiet.current=false;},220);}
  onBrowse(deckSlides[i].slug);
 };
 return <section className="category-deck">
  <p className="category-deck-kicker">{category?"YOUR CARD WALLET":"THE CARD COLLECTION"}</p>
  <h1 className="category-deck-title">{category?`${category.name} cards`:"All cards"}</h1>
  <div className="category-deck-rail" ref={rail} aria-label="Browse card categories">
   {deckSlides.map((slide,i)=><button type="button" key={slide.slug} className="category-deck-card" aria-current={i===index} aria-label={`${slide.name}, ${slide.footer.toLowerCase()}`} onClick={()=>go(i)}><CardFace name={slide.name} tone={slide.tone} kicker={slide.kicker} footer={slide.footer}/></button>)}
  </div>
  <div className="category-deck-dots" role="tablist" aria-label="Category position">
   {deckSlides.map((slide,i)=><button type="button" key={slide.slug} className={i===index?"active":""} role="tab" aria-selected={i===index} aria-label={slide.name} onClick={()=>go(i)}/>)}
  </div>
  <h2 className="category-deck-list-title">{category?"Cards in this category":"All cards"}</h2>
  {category&&<p className="category-deck-copy">{category.description}</p>}
 </section>;
}

export function CardCatalog({category}:{category?:Category}) {
 const router=useRouter();const [query,setQuery]=useState("");const [network,setNetwork]=useState("all");const [selected,setSelected]=useState<CardRecord|null>(null);
 const [browseSlug,setBrowseSlug]=useState(category?.slug??"all");
 useEffect(()=>{setBrowseSlug(category?.slug??"all");},[category]);
 const browse=useCallback((slug:string)=>{
  setBrowseSlug(slug);
  const href=slug==="all"?"/cards":`/cards/${slug}`;
  if(window.location.pathname!==href)router.push(href,{scroll:false});
 },[router]);
 const active=browseSlug==="all"?undefined:categoryBySlug(browseSlug);
 useEffect(()=>{const read=()=>{const q=new URLSearchParams(window.location.search);const selected=q.get("network")||"all";setQuery(q.get("q")||"");setNetwork(cards.some(c=>(!active||c.categories.includes(active.slug))&&c.network===selected)?selected:"all");};read();window.addEventListener("popstate",read);return()=>window.removeEventListener("popstate",read);},[active]);
 const update=(q:string,n:string)=>{setQuery(q);setNetwork(n);const params=new URLSearchParams(window.location.search);q?params.set("q",q):params.delete("q");n!=="all"?params.set("network",n):params.delete("network");window.history.replaceState(null,"",window.location.pathname+(params.size?`?${params}`:""));};
 const pool=cards.filter(c=>!active||c.categories.includes(active.slug));const filtered=pool.filter(c=>(network==="all"||c.network===network)&&`${c.name} ${c.issuer} ${c.summary}`.toLowerCase().includes(query.trim().toLowerCase()));
 return <><div className="catalog-layout"><aside className="catalog-sidebar" aria-label="Card categories"><SidebarProvider><Sidebar collapsible="none"><SidebarContent><span className="eyebrow">THE CARD COLLECTION</span><SidebarMenu><SidebarMenuItem><SidebarMenuButton asChild isActive={!active}><Link href="/cards">All cards<span>{cards.length}</span></Link></SidebarMenuButton></SidebarMenuItem>{categories.map(c=><SidebarMenuItem key={c.slug}><SidebarMenuButton asChild isActive={active?.slug===c.slug}><Link href={`/cards/${c.slug}`}>{c.name}<span>{cards.filter(p=>p.categories.includes(c.slug)).length}</span></Link></SidebarMenuButton></SidebarMenuItem>)}</SidebarMenu><div className="rail-help">Not sure where to start?<Link href="/consultation/first-card">Let’s talk it through<ArrowUpRight size={14}/></Link></div></SidebarContent></Sidebar></SidebarProvider></aside><div className="catalog-content">
 <CategoryDeck category={active} onBrowse={browse}/>
 {active&&<div className="category-summary"><CardFace name={active.name} tone={active.tone} footer="FIND WHAT FITS YOUR LIFE"/><div><span className="eyebrow">YOUR CARD WALLET / {active.name}</span><h1>{active.line}</h1><p>{active.description}</p></div></div>}
 <div className="mobile-category-switch"><Select value={active?.slug||"all"} onValueChange={browse}><SelectTrigger aria-label="Choose card category"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="all">All cards</SelectItem>{categories.map(c=><SelectItem value={c.slug} key={c.slug}>{c.name}</SelectItem>)}</SelectContent></Select></div>
 <div className="catalog-tools"><label className="search-field"><span className="sr-only">Search cards and banks</span><Search size={18}/><input type="search" value={query} onChange={e=>update(e.target.value,network)} placeholder="Search cards or banks"/>{query&&<button aria-label="Clear search" onClick={()=>update("",network)}><X size={17}/></button>}</label><Select value={network} onValueChange={value=>update(query,value)}><SelectTrigger aria-label="Filter by card network"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="all">All networks</SelectItem>{Array.from(new Set(pool.map(c=>c.network))).filter(n=>n!=="See issuer").map(n=><SelectItem value={n} key={n}>{n}</SelectItem>)}</SelectContent></Select></div>
 <p className="catalog-count" role="status">{filtered.length} {filtered.length===1?"card":"cards"}{active?` in ${active.name.toLowerCase()}`:" to explore"}{query?` matching “${query}”`:""}</p>
 {filtered.length?<div className="card-grid">{filtered.map(c=><ProductTile key={c.slug} card={c} onApply={setSelected}/>)}</div>:<div className="empty-results"><Search size={28} style={{margin:"auto",color:"#6b6b6b"}}/><h3>No cards found.</h3><p>Try a different card name, bank or network.</p><button className="button button-outline" onClick={()=>update("","all")}>Clear filters</button></div>}
 <p className="catalog-disclaimer"><Info size={17}/>Card availability, network variants, rewards and fees can change. Always review the issuer’s current product page before applying.</p>
 </div></div><Handoff open={!!selected} onClose={()=>setSelected(null)} card={selected||undefined}/></>;
}

function Handoff({open,onClose,card,service}:{open:boolean;onClose:()=>void;card?:CardRecord;service?:Service}) {
 const url=card?.url||brand.topmate;const provider=card?.issuer||"Topmate";
 return <Sheet open={open} onOpenChange={o=>!o&&onClose()}><SheetContent className="handoff-sheet"><span className="handoff-logo">{card?<CreditCard size={27}/>:<CalendarDays size={27}/>}</span><SheetTitle>{card?"Your next step is with the issuer.":"Let’s find a time to talk."}</SheetTitle><SheetDescription>{card?`You’ll continue to ${provider} to check the current details and complete your application.`:"Your session is booked through Arvind’s Topmate page. Check the current listing, availability and final price there."}</SheetDescription><div className="handoff-summary"><strong>{card?.name||service?.name}</strong><span>{card?card.issuer:`${service?.duration} · ${money(service?.price||0)} listed session price`}</span></div><TickList items={card?[card.sourceKind==="directory"?"Choose this card from the provider’s available options.":"Review the product’s current fees and benefits.","Your application details stay with the provider.","Approval is the issuer’s decision."]:["Select the matching session on Arvind’s profile.","Choose the available time or message format.","Complete payment and receive confirmation through Topmate."]}/><a className="button button-dark" href={url} target="_blank" rel="noopener noreferrer">{card?"Continue to issuer":"Continue to Topmate"}<ArrowUpRight size={18}/></a><p className="handoff-destination">Opens {new URL(url).hostname} in a new tab</p><button className="text-link" onClick={onClose}><ArrowLeft size={16}/>Keep exploring</button></SheetContent></Sheet>;
}

export function CardDetails({card}:{card:CardRecord}) {
 const [open,setOpen]=useState(false);const category=categoryBySlug(card.categories[0])!;
 const related=cards.filter(c=>c.slug!==card.slug&&c.categories.some(s=>card.categories.includes(s))).slice(0,3);
 return <main id="main-content" className="page-wrap"><Breadcrumbs items={[{label:"Cards",href:"/cards"},{label:category.name,href:`/cards/${category.slug}`},{label:card.name}]}/><div className="detail-layout"><div className="detail-art"><CardFace name={card.name} kicker={card.issuer} tone={card.tone} footer="CREDIT KAARAN COLLECTION"/><p className="fine">ILLUSTRATIVE CARD · ISSUER DESIGN MAY VARY</p></div><div className="detail-body"><span className="eyebrow">{card.issuer}</span><h1>{card.name}</h1><p>{card.summary}</p><div className="detail-tags">{card.categories.map(s=><span key={s}>{categoryBySlug(s)?.name}</span>)}</div><Tabs defaultValue="overview" className="detail-tabs"><TabsList><TabsTrigger value="overview">Overview</TabsTrigger><TabsTrigger value="fees">Fees & terms</TabsTrigger><TabsTrigger value="apply">Before applying</TabsTrigger></TabsList><TabsContent value="overview"><h3>A few details that matter.</h3><p>{category.description}</p><TickList items={category.checks}/><a className="text-link" href={card.url} target="_blank" rel="noreferrer">Read the issuer’s product information<ArrowUpRight size={16}/></a></TabsContent><TabsContent value="fees"><h3>Check the current terms.</h3><div className="fee-line"><span>Joining & annual fees</span><span>See current issuer terms</span></div><div className="fee-line"><span>Fee waiver</span><span>Spending conditions may apply</span></div><div className="fee-line"><span>Rewards & exclusions</span><span>Review the issuer’s details</span></div><p className="fine" style={{marginTop:17}}>We link to the issuer’s current information instead of showing unverified fee or reward figures.</p></TabsContent><TabsContent value="apply"><h3>Make an informed next step.</h3><TickList items={["Check income, age and location eligibility.","Review fees, reward caps and exclusions.","Complete the application only on the provider’s official site."]}/><p className="fine">No approval or credit limit is promised. Never share an OTP, CVV or PIN with Credit Kaaran.</p></TabsContent></Tabs><div className="detail-action"><button className="button button-dark" onClick={()=>setOpen(true)}>Apply on the issuer’s site<ArrowUpRight size={19}/></button><p className="fine">Direct provider link. No affiliate tracking is added to this link.</p><Link href="/consultation/quick-question" className="text-link">Have a question about this card?<ArrowRight size={16}/></Link></div></div></div><section className="related-section"><h2>Keep exploring.</h2><div className="card-grid">{related.map(c=><ProductTile key={c.slug} card={c}/>)}</div></section><Handoff open={open} onClose={()=>setOpen(false)} card={card}/></main>;
}

export function ConsultationCollection() {
 const [format,setFormat]=useState("all");
 return <><Tabs className="service-picker" value={format} onValueChange={setFormat}><TabsList><TabsTrigger value="all">All sessions</TabsTrigger><TabsTrigger value="call">1:1 calls</TabsTrigger><TabsTrigger value="message">Personal support</TabsTrigger><TabsTrigger value="plan">Yearly plan</TabsTrigger></TabsList></Tabs>{format==="all"?<ServiceTiles/>:<div className="service-tiles">{services.filter(s=>s.format===format).map((s,i)=><Link href={`/consultation/${s.slug}`} key={s.slug} className={`service-tile service-tone-${i%3}`}><div className="tile-top"><Icon name={s.format}/><span>{s.duration}</span></div><h3>{s.name}</h3><p>{s.label}</p><div className="service-tile-bottom"><span>Session price<strong>{money(s.price)}</strong></span><span className="circle-link"><ArrowUpRight size={19}/></span></div></Link>)}</div>}<p className="fine" style={{marginTop:24}}>Prices from the service catalogue. Confirm the current price, availability and terms on Topmate before booking.</p></>;
}
export function ServiceDetails({service}:{service:Service}) {
 const [open,setOpen]=useState(false);
 return <main id="main-content" className="page-wrap"><Breadcrumbs items={[{label:"Consultation",href:"/consultation"},{label:service.name}]}/><div className="detail-layout"><div className="detail-art service-detail-art"><CardFace name={service.name} tone="carbon" kicker="YOUR CONSULTATION WALLET" footer={service.duration}/><p>One conversation.<br/>Built around you.</p></div><div className="detail-body"><span className="eyebrow">{service.format==="call"?"ONE-TO-ONE GUIDANCE":service.format==="plan"?"ONGOING GUIDANCE":"PERSONAL SUPPORT"}</span><h1>{service.name}</h1><p>{service.summary}</p><div className="service-price"><strong>{money(service.price)}</strong><span><Icon name={service.format} size={17}/>{service.duration}</span></div><div className="service-fit"><strong>THIS COULD BE FOR YOU IF</strong><p>{service.fit}</p></div><Tabs defaultValue="covers" className="detail-tabs"><TabsList><TabsTrigger value="covers">What we’ll cover</TabsTrigger><TabsTrigger value="prepare">Come prepared</TabsTrigger><TabsTrigger value="booking">How to book</TabsTrigger></TabsList><TabsContent value="covers"><TickList items={service.outcomes}/></TabsContent><TabsContent value="prepare"><TickList items={service.prepare}/><p className="fine">Use card names only. Never share a card number, PIN, OTP or CVV. You don’t need to send statements to explore a session.</p></TabsContent><TabsContent value="booking"><p>Continue to Arvind’s Topmate profile, choose this session and check the current price and availability. Payment, scheduling and the booking confirmation are handled there.</p><p className="fine" style={{marginTop:16}}>Review the cancellation and refund terms at checkout before paying.</p></TabsContent></Tabs><div className="detail-action"><button className="button button-dark" onClick={()=>setOpen(true)}>{service.format==="call"?"Book this conversation":service.format==="message"?"Continue with this enquiry":"Explore this yearly plan"}<ArrowUpRight size={19}/></button><p className="fine">Booking via Topmate · Confirm the current service price at checkout.</p></div></div></div><section className="process-strip"><div><span>01</span><h3>Choose your session.</h3><p>Match the conversation to what you need help with.</p></div><div><span>02</span><h3>Book with Topmate.</h3><p>Review the current listing and complete the booking there.</p></div><div><span>03</span><h3>Bring your questions.</h3><p>Use your confirmation to join or send your enquiry.</p></div></section><section className="related-section"><h2>A few answers before we talk.</h2><Questions items={[{q:"Will you apply for a card on my behalf?",a:"No. Consultations help you understand your options. Applications happen with the issuer, which decides eligibility and approval."},{q:"Where will I see the final price?",a:"The session page shows the price in the client catalogue. Topmate shows the current service price and applicable booking terms before you pay."},{q:"Can I speak in Tamil?",a:"Credit Kaaran’s guidance is built around Tamil, English and Tanglish. Choose the language you’re comfortable with when you book."}]}/></section><Handoff open={open} onClose={()=>setOpen(false)} service={service}/></main>;
}
