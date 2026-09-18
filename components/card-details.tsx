"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent, type SVGProps } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, CreditCard } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { cards, categoryBySlug, type CardRecord } from "@/lib/site-content";
import { Breadcrumbs, TickList } from "@/components/site-shell";
import "@/app/card-details.css";

type Chapter = "overview" | "fees" | "apply";

const chapters: { id: Chapter; label: string; hint: string }[] = [
  { id: "overview", label: "Overview", hint: "Turn the card over" },
  { id: "fees", label: "Fees & terms", hint: "The stripe" },
  { id: "apply", label: "Before applying", hint: "The security panel" },
];

export function CardDetails({ card }: { card: CardRecord }) {
  const [open, setOpen] = useState(false);
  const [chapter, setChapter] = useState<Chapter>("overview");
  const [flipped, setFlipped] = useState(false);
  const [eligOpen, setEligOpen] = useState(false);
  const category = categoryBySlug(card.categories[0])!;
  const related = cards
    .filter((item) => item.slug !== card.slug && item.categories.some((slug) => card.categories.includes(slug)))
    .slice(0, 3);
  const sourceLabel = card.sourceKind === "product" ? "Official product page" : "Provider directory";
  const applyChecks = [
    "Check income, age and location eligibility.",
    "Review fees, reward caps and exclusions.",
    "Complete the application only on the provider’s official site.",
  ];

  function selectChapter(next: Chapter, scroll = false) {
    setChapter(next);
    if (next === "overview") setFlipped(true);
    if (next !== "overview") setFlipped(false);
    if (scroll) document.getElementById("ck-card-dossier")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function flipCard() {
    setFlipped((value) => {
      const next = !value;
      if (next) setChapter("overview");
      return next;
    });
  }

  return (
    <main id="main-content" className="ck-detail">
      <div className="ck-detail-hero">
        <div className="ck-detail-hero-glow" aria-hidden="true" />
        <div className="ck-detail-hero-inner">
          <Breadcrumbs
            items={[
              { label: "Cards", href: "/cards" },
              { label: category.name, href: `/cards/${category.slug}` },
              { label: card.name },
            ]}
          />
          <p className="eyebrow ck-detail-kicker">{card.issuer}</p>
          <h1>
            {card.name}
            <span>Hold it. Turn it. Read it.</span>
          </h1>
          <p className="ck-detail-lede">{card.summary}</p>
        </div>
      </div>

      <div className="ck-detail-stage">
        <article className="ck-detail-deck">
          <PlasticCard
            card={card}
            checks={category.checks}
            flipped={flipped}
            onFlip={flipCard}
          />

          <div className="ck-detail-identity">
            <div className="ck-detail-tags">
              {card.categories.map((slug) => (
                <Link key={slug} href={`/cards/${slug}`}>
                  {categoryBySlug(slug)?.name}
                </Link>
              ))}
            </div>
            <h2>{card.name}</h2>
            <p>{card.summary}</p>
            <div className="ck-network-seal" aria-label={`Network ${card.network}`}>
              <strong>{networkMark(card.network)}</strong>
              <span>
                {card.network}
                <small>Card network</small>
              </span>
            </div>
          </div>

          <div className="ck-detail-stats">
            <Stat label="Network" value={card.network} note="Shown as listed by the issuer" />
            <Stat label="Issuer" value={card.issuer} note="Application stays with them" />
            <Stat label="This listing" value={sourceLabel} note="Always read the live product page" />
            <Stat label="Collection" value={category.name} note={category.short} />
          </div>

          <details className="ck-elig" open={eligOpen} onToggle={(event) => setEligOpen(event.currentTarget.open)}>
            <summary>Check these before you apply</summary>
            <TickList items={applyChecks} />
            <p className="fine">No approval or credit limit is promised. Never share an OTP, CVV or PIN with Credit Kaaran.</p>
          </details>
        </article>
      </div>

      <div className="ck-detail-body">
        <section className="ck-bottom-line" aria-labelledby="ck-bottom-line-title">
          <p className="eyebrow">The bottom line</p>
          <h2 id="ck-bottom-line-title">What this card is here to do.</h2>
          <ul>
            <li>{card.summary}</li>
            <li>{category.description}</li>
            <li>We link to the issuer’s current information instead of showing unverified fee or reward figures.</li>
          </ul>
        </section>

        <nav className="ck-chapter-nav" aria-label="On this page" id="ck-card-dossier">
          <p className="eyebrow">On this page</p>
          <div className="ck-chapter-rail" role="tablist" aria-label="Card chapters">
            {chapters.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={chapter === item.id}
                aria-controls={`ck-chapter-${item.id}`}
                id={`ck-tab-${item.id}`}
                className={chapter === item.id ? "is-active" : ""}
                onClick={() => selectChapter(item.id, true)}
              >
                <span className={`ck-glyph ${chapter === item.id ? "is-live" : ""}`} aria-hidden="true">
                  <ChapterIcon kind={item.id} />
                </span>
                <span>
                  <strong>{item.label}</strong>
                  <small>{item.hint}</small>
                </span>
              </button>
            ))}
          </div>
        </nav>

        <section
          className="ck-chapter"
          id={`ck-chapter-${chapter}`}
          role="tabpanel"
          aria-labelledby={`ck-tab-${chapter}`}
        >
          {chapter === "overview" && (
            <>
              <div className="ck-chapter-head">
                <span className="ck-glyph is-live" aria-hidden="true"><IconChip /></span>
                <div>
                  <p className="eyebrow">Printed on the reverse</p>
                  <h3>A few details that matter.</h3>
                </div>
              </div>
              <p>{category.description}</p>
              <TickList items={category.checks} />
              <a className="text-link" href={card.url} target="_blank" rel="noreferrer">
                Read the issuer’s product information
                <ArrowUpRight size={16} />
              </a>
            </>
          )}

          {chapter === "fees" && (
            <>
              <div className="ck-chapter-head">
                <span className="ck-glyph is-live" aria-hidden="true"><IconStripe /></span>
                <div>
                  <p className="eyebrow">Encoded on the stripe</p>
                  <h3>Check the current terms.</h3>
                </div>
              </div>
              <p>Set by the issuer. GST and live conditions sit on their product page, not in this illustration.</p>
              <div className="ck-fee-grid">
                <article>
                  <span className="ck-fee-ico" aria-hidden="true"><IconStripe /></span>
                  <span className="eyebrow">Joining & annual fees</span>
                  <strong>See current issuer terms</strong>
                  <p>The live joining fee, annual fee and GST are only confirmed on the issuer’s page.</p>
                </article>
                <article>
                  <span className="ck-fee-ico" aria-hidden="true"><IconChip /></span>
                  <span className="eyebrow">Fee waiver</span>
                  <strong>Spending conditions may apply</strong>
                  <p>Waiver rules, if any, can change. Read the current spend threshold before you apply.</p>
                </article>
                <article>
                  <span className="ck-fee-ico" aria-hidden="true"><IconCvv /></span>
                  <span className="eyebrow">Rewards & exclusions</span>
                  <strong>Review the issuer’s details</strong>
                  <p>Caps, bonus categories and excluded spends belong in the official product information.</p>
                </article>
              </div>
              <p className="fine">We link to the issuer’s current information instead of showing unverified fee or reward figures.</p>
            </>
          )}

          {chapter === "apply" && (
            <>
              <div className="ck-chapter-head">
                <span className="ck-glyph is-live" aria-hidden="true"><IconCvv /></span>
                <div>
                  <p className="eyebrow">The security panel</p>
                  <h3>Make an informed next step.</h3>
                </div>
              </div>
              <p>Keep these checks private, the way you would a CVV, then continue only on the issuer’s site.</p>
              <TickList items={applyChecks} />
              <p className="fine">No approval or credit limit is promised. Never share an OTP, CVV or PIN with Credit Kaaran.</p>
              <Link href="/consultation/quick-question" className="text-link">
                Have a question about this card?
                <ArrowRight size={16} />
              </Link>
            </>
          )}
        </section>

        <p className="ck-detail-help">
          <Link href="/consultation/quick-question" className="text-link">
            Have a question about this card?
            <ArrowRight size={16} />
          </Link>
        </p>

        {related.length > 0 && (
          <section className="ck-similar" aria-labelledby="ck-similar-title">
            <div className="ck-similar-head">
              <h2 id="ck-similar-title">Similar cards</h2>
              <Link href={`/cards/${category.slug}`} className="text-link">
                View all
                <ArrowUpRight size={16} />
              </Link>
            </div>
            <div className="ck-similar-grid">
              {related.map((item) => (
                <article key={item.slug} className="ck-similar-card">
                  <Link href={`/card/${item.slug}`} className="ck-similar-art" aria-label={`View details for ${item.name}`}>
                    <MiniPlastic card={item} />
                  </Link>
                  <div className="ck-similar-copy">
                    <div className="ck-detail-tags">
                      {item.categories.slice(0, 2).map((slug) => (
                        <span key={slug}>{categoryBySlug(slug)?.name}</span>
                      ))}
                    </div>
                    <h3>{item.name}</h3>
                    <p>{item.issuer}</p>
                    <Link className="button button-dark" href={`/card/${item.slug}`}>
                      View details
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>

      <button
        type="button"
        className="ck-float-apply"
        onClick={() => setOpen(true)}
        hidden={open}
      >
        Apply on the issuer’s site
        <ArrowUpRight size={18} />
      </button>

      <ApplyHandoff open={open} onClose={() => setOpen(false)} card={card} />
    </main>
  );
}

function Stat({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="ck-stat">
      <span className="eyebrow">{label}</span>
      <strong>{value}</strong>
      <small>{note}</small>
    </div>
  );
}

function networkMark(network: string) {
  if (network === "See issuer") return "CK";
  return network.replace(/[^A-Za-z]/g, "").slice(0, 2).toUpperCase() || "CK";
}

function useCardTilt() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return;
    const move = (event: PointerEvent) => {
      const box = el.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - 0.5;
      const y = (event.clientY - box.top) / box.height - 0.5;
      el.style.setProperty("--tilt-x", `${(-y * 8).toFixed(2)}deg`);
      el.style.setProperty("--tilt-y", `${(x * 10).toFixed(2)}deg`);
    };
    const reset = () => {
      el.style.setProperty("--tilt-x", "0deg");
      el.style.setProperty("--tilt-y", "0deg");
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", reset);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", reset);
    };
  }, []);
  return ref;
}

function PlasticCard({
  card,
  checks,
  flipped,
  onFlip,
}: {
  card: CardRecord;
  checks: string[];
  flipped: boolean;
  onFlip: () => void;
}) {
  const tiltRef = useCardTilt();
  function onKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onFlip();
    }
  }
  return (
    <div className="ck-plastic-stage">
      <div className="ck-plastic-well">
        <div className="ck-plastic-tilt" ref={tiltRef}>
          <div
            className={`ck-plastic ${flipped ? "is-flipped" : ""} card-${card.tone}`}
            role="button"
            tabIndex={0}
            aria-pressed={flipped}
            aria-label={flipped ? `Show the front of ${card.name}` : `Turn ${card.name} over for the overview`}
            onClick={onFlip}
            onKeyDown={onKey}
          >
            <div className="ck-plastic-inner">
              <div className="ck-plastic-face ck-plastic-front" aria-hidden={flipped}>
                <span className="ck-plastic-topline">
                  <span>{card.issuer}</span>
                  <span className="ck-plastic-ck">ck.</span>
                </span>
                <span className="ck-chip" aria-hidden="true"><IconChip /></span>
                <span className="ck-nfc" aria-hidden="true">
                  <IconNfc />
                </span>
                <span className="ck-pan" aria-hidden="true">
                  <b />
                  <b />
                  <b />
                  <b className="is-last">CK01</b>
                </span>
                <strong>{card.name}</strong>
                <span className="ck-plastic-foot">
                  <span>{card.network}</span>
                  <span>Collection</span>
                </span>
              </div>
              <div className="ck-plastic-face ck-plastic-back" aria-hidden={!flipped}>
                <span className="ck-stripe" aria-hidden="true">
                  <IconStripe />
                </span>
                <span className="eyebrow">Overview</span>
                <strong>{card.name}</strong>
                <ul className="ck-back-checks">
                  {checks.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="ck-flip-hint">{flipped ? "Tap the card to show the front" : "Tap the card to turn it over"}</p>
      <p className="fine">Illustrative card · issuer design may vary</p>
    </div>
  );
}

function MiniPlastic({ card }: { card: CardRecord }) {
  return (
    <span className={`ck-mini card-${card.tone}`}>
      <span className="ck-plastic-topline">
        <span>{card.issuer}</span>
        <span className="ck-plastic-ck">ck.</span>
      </span>
      <span className="ck-chip" aria-hidden="true"><IconChip /></span>
      <strong>{card.name}</strong>
    </span>
  );
}

function iconProps(props: SVGProps<SVGSVGElement>): SVGProps<SVGSVGElement> {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
    ...props,
  };
}

function IconChip(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconProps(props)}>
      <rect x="5" y="7" width="14" height="10" rx="1.75" />
      <path d="M5 10.5h14M5 13.5h14M9.5 7v10M14.5 7v10" />
    </svg>
  );
}

function IconStripe(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconProps(props)}>
      <path d="M6 7v10M8.5 8.5v7M11 7.5v9M13.2 9v6M15.5 8v8M18 7.5v9" />
    </svg>
  );
}

function IconCvv(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconProps(props)}>
      <rect x="3.5" y="6" width="17" height="12" rx="2" />
      <path d="M7 12h.5M10.5 12h6.5" />
    </svg>
  );
}

function IconNfc(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconProps(props)}>
      <path d="M8 9.2a4.8 4.8 0 0 1 0 5.6" />
      <path d="M10.4 7.2a7.2 7.2 0 0 1 0 9.6" />
      <path d="M12.8 5.4a9.4 9.4 0 0 1 0 13.2" />
    </svg>
  );
}

function ChapterIcon({ kind }: { kind: Chapter }) {
  if (kind === "overview") return <IconChip />;
  if (kind === "fees") return <IconStripe />;
  return <IconCvv />;
}

function ApplyHandoff({
  open,
  onClose,
  card,
}: {
  open: boolean;
  onClose: () => void;
  card: CardRecord;
}) {
  const url = card.url;
  const provider = card.issuer;
  return (
    <Sheet open={open} onOpenChange={(next) => !next && onClose()}>
      <SheetContent className="handoff-sheet">
        <span className="handoff-logo">
          <CreditCard size={27} strokeWidth={1.5} />
        </span>
        <SheetTitle>Your next step is with the issuer.</SheetTitle>
        <SheetDescription>
          You’ll continue to {provider} to check the current details and complete your application.
        </SheetDescription>
        <div className="handoff-summary">
          <strong>{card.name}</strong>
          <span>{card.issuer}</span>
        </div>
        <TickList
          items={[
            card.sourceKind === "directory"
              ? "Choose this card from the provider’s available options."
              : "Review the product’s current fees and benefits.",
            "Your application details stay with the provider.",
            "Approval is the issuer’s decision.",
          ]}
        />
        <a className="button button-dark" href={url} target="_blank" rel="noopener noreferrer">
          Continue to issuer
          <ArrowUpRight size={18} />
        </a>
        <p className="handoff-destination">Opens {new URL(url).hostname} in a new tab</p>
        <button className="text-link" onClick={onClose}>
          <ArrowLeft size={16} />
          Keep exploring
        </button>
      </SheetContent>
    </Sheet>
  );
}
