import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumbs, PageHeading } from "@/components/site-shell";
import { guides } from "@/lib/learning-content";
export function generateStaticParams(){return guides.map(g=>({slug:g.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const g=guides.find(g=>g.slug===slug);return {title:g?.title||"Guide not found",description:g?.intro};}
export default async function Guide({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const g=guides.find(g=>g.slug===slug);if(!g)notFound();return <main id="main-content" className="page-wrap text-page"><Breadcrumbs items={[{label:"Learning",href:"/courses"},{label:g.title}]}/><PageHeading eyebrow={g.eyebrow} title={g.title} text={g.intro}/><p className="fine">{g.time} · General educational information</p>{g.sections.map((s,i)=><section key={s.title}><span className="eyebrow" style={{color:"#4366b0",marginBottom:14}}>0{i+1}</span><h2>{s.title}</h2><p>{s.text}</p></section>)}<section><h2>Read the source details.</h2><p>This guide explains what to look for. Current product rules are set by the issuer.</p><a href={g.source} target="_blank" rel="noreferrer">{g.sourceName}</a></section><div className="button-row" style={{marginTop:35}}><Link href={g.next} className="button button-dark">Take the next step<ArrowUpRight size={17}/></Link><Link href="/courses" className="button button-outline">More learning guides</Link></div></main>;}
