import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/site-shell";
import { CardCatalog } from "@/components/catalog";
import { categoryBySlug, categories } from "@/lib/site-content";
export function generateStaticParams(){return categories.map(c=>({category:c.slug}));}
export async function generateMetadata({params}:{params:Promise<{category:string}>}){const c=categoryBySlug((await params).category);return {title:c?`${c.name} cards`:"Category not found",description:c?.description};}
export default async function CategoryPage({params}:{params:Promise<{category:string}>}){const c=categoryBySlug((await params).category);if(!c)notFound();return <main id="main-content" className="page-wrap"><Breadcrumbs items={[{label:"Cards",href:"/cards"},{label:c.name}]}/><CardCatalog category={c}/></main>;}
