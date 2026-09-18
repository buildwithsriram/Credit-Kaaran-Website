import Link from "next/link";
import { ArrowLeft } from "lucide-react";
export default function NotFound(){return <main id="main-content" className="page-wrap" style={{minHeight:"65vh",paddingTop:90}}><span className="eyebrow">PAGE NOT FOUND</span><h1 style={{margin:"25px 0"}}>Let’s get you<br/><span>back on track.</span></h1><p style={{color:"#6b6b6b",marginBottom:30}}>That page isn’t in the collection. Your next step is still here.</p><Link href="/" className="button button-dark"><ArrowLeft size={18}/>Back to the wallets</Link></main>;}
