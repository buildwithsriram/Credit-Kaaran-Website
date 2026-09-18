import { notFound } from "next/navigation";
import { CardDetails } from "@/components/catalog";
import { cards, cardBySlug } from "@/lib/site-content";
export function generateStaticParams(){return cards.map(c=>({slug:c.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const c=cardBySlug((await params).slug);return {title:c?`${c.issuer} ${c.name}`:"Card not found",description:c?.summary};}
export default async function CardPage({params}:{params:Promise<{slug:string}>}){const c=cardBySlug((await params).slug);if(!c)notFound();return <CardDetails card={c}/>;}
