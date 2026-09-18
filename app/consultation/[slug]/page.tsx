import { notFound } from "next/navigation";
import { ServiceDetails } from "@/components/catalog";
import { services, serviceBySlug } from "@/lib/site-content";
export function generateStaticParams(){return services.map(s=>({slug:s.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const s=serviceBySlug((await params).slug);return {title:s?.name||"Session not found",description:s?.summary};}
export default async function ServicePage({params}:{params:Promise<{slug:string}>}){const s=serviceBySlug((await params).slug);if(!s)notFound();return <ServiceDetails service={s}/>;}
