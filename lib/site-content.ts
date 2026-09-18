export const brand = {
  name: "Credit Kaaran", person: "Arvind R", instagram: "https://www.instagram.com/creditkaaaran/",
  topmate: "https://topmate.io/credit_karan", language: "Tamil · English · Tanglish",
  description: "Credit cards, made clear. Explore cards, book a conversation and make more of your rewards.",
};

export type Category = {slug:string;name:string;short:string;line:string;description:string;icon:string;tone:string;checks:string[]};
export const categories:Category[] = [
 {slug:"cashback",name:"Cashback",short:"Everyday, rewarding.",line:"For the things you already buy.",description:"Find a card that fits your everyday spending, from online shopping to monthly bills.",icon:"wallet",tone:"blue",checks:["Eligible spending categories","Monthly cashback limits","Annual fee and waiver rules"]},
 {slug:"travel",name:"Travel & miles",short:"Your next departure.",line:"Turn everyday spending into possibilities.",description:"Explore airline miles, hotel rewards and travel benefits in one place.",icon:"plane",tone:"silver",checks:["Airline and hotel transfer partners","Lounge access conditions","Reward conversion and expiry"]},
 {slug:"upi",name:"UPI & digital",short:"Tap. Scan. Reward.",line:"A card for your daily scan-and-pay.",description:"Browse the cards and platforms listed for UPI spending in our collection.",icon:"scan",tone:"carbon",checks:["Supported UPI apps and transactions","Merchant exclusions","Reward limits and membership fees"]},
 {slug:"fuel",name:"Fuel",short:"Make every kilometre count.",line:"Built around your regular fuel stop.",description:"Start with the fuel brand you use, then compare the card’s conditions.",icon:"fuel",tone:"blue",checks:["Partner fuel stations","Fuel reward limits","Surcharge waiver conditions"]},
 {slug:"premium",name:"Premium",short:"More considered privileges.",line:"Benefits worth making room for.",description:"Discover travel, business and lifestyle cards. Look beyond the welcome offer.",icon:"sparkles",tone:"carbon",checks:["Benefits you will actually use","Annual fees and renewal value","Income and eligibility criteria"]},
 {slug:"dining",name:"Food & dining",short:"Good taste. Better value.",line:"For your table, and your takeaway.",description:"Explore dining and food delivery cards around the places you already enjoy.",icon:"dining",tone:"silver",checks:["Participating restaurants and apps","Discount or cashback limits","Minimum spends and exclusions"]},
 {slug:"movies",name:"Movies",short:"Your next big-screen moment.",line:"A little more from movie night.",description:"Compare the entertainment cards in the collection before your next booking.",icon:"ticket",tone:"carbon",checks:["Eligible cinemas or ticket platforms","Monthly spending milestones","Voucher validity and booking charges"]},
 {slug:"forex",name:"Forex & international",short:"Ready for elsewhere.",line:"Spend abroad with the details in view.",description:"Explore international spending options and check all associated charges.",icon:"globe",tone:"silver",checks:["Current forex markup","Cash withdrawal and other charges","Acceptance and eligibility"]},
 {slug:"secured",name:"FD-backed cards",short:"A different starting point.",line:"Explore credit backed by a fixed deposit.",description:"See secured card options and understand the deposit commitment before applying.",icon:"shield",tone:"blue",checks:["Minimum deposit and lien conditions","Card fees and credit limit","Deposit closure and card closure rules"]},
 {slug:"first-card",name:"Your first card",short:"Start with understanding.",line:"Your first step, with a little clarity.",description:"New to credit cards? Begin with the billing, fees and repayment terms.",icon:"graduation",tone:"silver",checks:["Eligibility and required documents","Annual fees and repayment dates","How the card fits your normal spending"]},
];
export type CardRecord = {slug:string;name:string;issuer:string;categories:string[];summary:string;network:string;tone:string;url:string;sourceKind:"product"|"directory";art?:string};
const destinations = {
 sbi:"https://www.sbicard.com/en/eapply.page", hsbc:"https://www.hsbc.co.in/credit-cards/", hdfc:"https://www.hdfcbank.com/personal/pay/cards/credit-cards", idfc:"https://www.idfcfirst.bank.in/credit-card", axis:"https://www.axisbank.com/retail/cards/credit-card", rbl:"https://www.rblbank.com/personal-banking/cards/credit-cards", indusind:"https://www.indusind.com/in/en/personal/cards/credit-card.html", kotak:"https://www.kotak.com/en/personal-banking/cards/credit-cards.html", amex:"https://www.americanexpress.com/in/credit-cards/", bob:"https://www.bobcard.co.in/credit-cards", au:"https://www.au.bank.in/credit-cards", scapia:"https://www.scapia.cards/", kiwi:"https://gokiwi.in/", salaryse:"https://www.salaryse.com/", novio:"https://www.novio.in/", stable:"https://stablemoney.in/", niyo:"https://goniyo.com/", uni:"https://www.uni.cards/", jupiter:"https://jupiter.money/",
};
const card = (slug:string,name:string,issuer:string,cats:string[],summary:string,network:string,key:keyof typeof destinations,url?:string):CardRecord => ({slug,name,issuer,categories:cats,summary,network,tone:categories.find(c=>c.slug===cats[0])?.tone||"blue",url:url||destinations[key],sourceKind:url?"product":"directory"});
export const cards:CardRecord[] = [
 card("axis-credit-cards","Axis Bank Credit Cards","Axis Bank",["first-card"],"Explore the bank’s available credit cards and application options.","See issuer","axis"),
 card("scapia","Scapia","Federal Bank × Scapia",["travel","forex"],"A travel-focused card connected to the Scapia travel platform.","See issuer","scapia"),
 card("kiwi","Kiwi RuPay","Kiwi / partner bank",["upi"],"A card and app experience for everyday UPI payments.","RuPay","kiwi"),
 card("first-wow","FIRST WOW!","IDFC FIRST Bank",["secured","first-card","forex"],"A credit card backed by a fixed deposit with IDFC FIRST Bank.","Visa","idfc","https://www.idfcfirst.bank.in/credit-card/wow"),
 card("novio","novio RuPay","SBM Bank × novio",["secured","upi"],"A secured RuPay credit card connected to the novio platform.","RuPay","novio"),
 card("suryoday-stable","Suryoday FD Card","Suryoday Bank / Stable Money",["secured"],"Explore fixed-deposit-backed credit through the Stable Money platform.","RuPay","stable"),
 card("simplyclick","SimplyCLICK","SBI Card",["first-card","cashback"],"An online-shopping-focused credit card from SBI Card.","Visa","sbi","https://www.sbicard.com/en/personal/credit-cards/simplyclick-sbi-card.html"),
 card("hsbc-live-plus","Live+","HSBC",["cashback","dining"],"An everyday spending card with a focus on food, dining and groceries.","Visa","hsbc"),
 card("hsbc-travelone","TravelOne","HSBC",["travel"],"A travel card with airline and hotel transfer partners.","Mastercard","hsbc"),
 card("marriott-bonvoy","Marriott Bonvoy","HDFC Bank",["travel"],"A hotel rewards card for the Marriott Bonvoy programme.","Diners Club","hdfc"),
 card("first-mayura","FIRST Mayura","IDFC FIRST Bank",["premium","travel","forex"],"A metal travel card from the IDFC FIRST Bank collection.","Mastercard","idfc"),
 card("sbi-miles","SBI Card MILES","SBI Card",["travel"],"Explore SBI Card’s travel-credit and partner-transfer programme.","Mastercard","sbi","https://www.sbicard.com/en/personal/credit-cards/sbi-card-miles.html"),
 card("indianoil-xtra","IndianOil XTRA","RBL Bank",["fuel"],"A fuel co-branded card for IndianOil purchases.","Mastercard","rbl"),
 card("bpcl-octane","BPCL OCTANE","SBI Card",["fuel"],"A fuel co-branded credit card for BPCL purchases.","Visa","sbi","https://www.sbicard.com/en/personal/credit-cards/bpcl-sbi-card-octane.html"),
 card("first-power","FIRST Power / Power+","IDFC FIRST Bank",["fuel"],"Explore the HPCL fuel card variants from IDFC FIRST Bank.","RuPay","idfc"),
 card("salaryse","SalarySe","SalarySe / partner bank",["upi"],"A salary-linked card platform with UPI credit card options.","RuPay","salaryse"),
 card("indusind-tiger","Tiger","IndusInd Bank",["premium"],"A lifestyle card in the IndusInd Bank collection.","Visa","indusind"),
 card("bizblack","BizBlack Metal","HDFC Bank",["premium"],"A business credit card for self-employed professionals and business owners.","Diners Club","hdfc"),
 card("amex-platinum-reserve","Platinum Reserve","American Express",["premium"],"Explore the Platinum Reserve credit card and its lifestyle benefits.","Amex","amex"),
 card("pvr-inox","PVR INOX","Kotak Mahindra Bank",["movies"],"A cinema co-branded card for PVR INOX moviegoers.","See issuer","kotak"),
 card("rbl-play","Play","RBL Bank",["movies"],"An entertainment-focused credit card connected to BookMyShow.","See issuer","rbl"),
 card("hdfc-swiggy","Swiggy HDFC Bank","HDFC Bank",["dining","cashback"],"A co-branded credit card built around Swiggy and everyday online spending.","Mastercard","hdfc"),
 card("eazydiner","EazyDiner Signature","IndusInd Bank",["dining"],"A dining co-branded card connected to the EazyDiner programme.","Visa","indusind"),
 card("world-safari","World Safari","RBL Bank",["forex","travel"],"An international travel card in the RBL Bank collection.","Mastercard","rbl"),
 card("niyo-global","Niyo Global","Niyo / partner bank",["forex"],"Explore Niyo’s international spending products and available variants.","See issuer","niyo"),
 card("uni-gold-x","Uni Gold X","Uni / partner bank",["forex"],"Explore the Uni Gold X product and its international spending features.","See issuer","uni"),
 card("axis-ace","ACE","Axis Bank",["cashback"],"A cashback credit card built around everyday payments.","Visa","axis"),
 card("hsbc-rupay","RuPay Cashback","HSBC",["cashback","upi"],"An HSBC cashback card for supported RuPay and UPI payments.","RuPay","hsbc"),
 card("sbi-cashback","CASHBACK SBI Card","SBI Card",["cashback"],"A cashback-focused card for eligible online and offline spending.","Visa","sbi"),
 card("bob-cashback","BOBCARD Cashback","BOBCARD",["cashback"],"Explore the cashback credit card from BOBCARD.","See issuer","bob"),
 card("kotak-cashback-plus","Cashback+","Kotak Mahindra Bank",["cashback"],"Explore Kotak’s cashback-focused credit card.","See issuer","kotak"),
 card("jupiter-edge","Edge","Jupiter × CSB Bank",["cashback","upi"],"A RuPay credit card connected to the Jupiter app.","RuPay","jupiter"),
 card("first-earn","FIRST EA₹N","IDFC FIRST Bank",["secured","upi"],"An FD-backed virtual RuPay card from IDFC FIRST Bank.","RuPay","idfc"),
 card("first-hello","FIRST Hello Cashback","IDFC FIRST Bank",["secured","cashback"],"Explore the FD-backed cashback card in the FIRST collection.","See issuer","idfc"),
 card("au-nomo","AU NOMO","AU Small Finance Bank",["secured"],"Explore AU’s fixed-deposit-backed credit card.","See issuer","au"),
];

// Product destinations checked against official issuer/provider sources on 7 September 2026.
const verifiedLinks:Record<string,string> = {
 "au-nomo":"https://www.au.bank.in/personal-banking/credit-cards/nomo-credit-card",
 "rbl-play":"https://www.rbl.bank.in/personal-banking/cards/credit-cards/rbl-bank-play-credit-card",
  "marriott-bonvoy": "https://www.hdfc.bank.in/credit-cards/marriott-bonvoy-credit-card",
  "bizblack": "https://www.hdfc.bank.in/business-credit-cards/biz-black-credit-card",
  "first-mayura": "https://www.idfcfirst.bank.in/credit-card/metal-credit-card/mayura",
  "first-power": "https://www.idfcfirst.bank.in/credit-card/hpcl-power-fuel-credit-card",
  "first-earn": "https://www.idfcfirst.bank.in/credit-card/secured-rupay-credit-card",
  "first-hello": "https://www.idfcfirst.bank.in/credit-card/hello-cashback-credit-card",
  "sbi-cashback": "https://www.sbicard.com/en/personal/credit-cards/cashback-sbi-card.html",
  "hsbc-rupay": "https://www.hsbc.bank.in/credit-cards/products/rupay-cashback-credit-card/",
  "scapia": "https://www.scapia.cards/",
  "kiwi": "https://gokiwi.in/",
  "novio": "https://www.novio.in/",
  "salaryse": "https://www.salaryse.com/",
  "niyo-global": "https://goniyo.com/",
  "uni-gold-x": "https://uni.cards/",
  "jupiter-edge": "https://jupiter.money/edge-plus-upi-rupay-credit-card/",
  "suryoday-stable": "https://stablemoney.in/credit-card",
  "amex-platinum-reserve": "https://www.americanexpress.com/in/credit-cards/platinum-reserve-credit-card/",
  "pvr-inox": "https://www.kotak.bank.in/en/personal-banking/cards/credit-cards/pvr-inox-kotak-credit-card.html",
  "kotak-cashback-plus": "https://www.kotak.bank.in/en/personal-banking/cards/credit-cards/kotak-cashback-plus-credit-card.html",
  "bob-cashback": "https://www.bobcard.co.in/",
  "indusind-tiger": "https://www.indusind.bank.in/in/en/personal/cards/credit-card/tiger-credit-card.html",
  "world-safari": "https://www.rbl.bank.in/personal-banking/cards/credit-cards/world-safari-credit-card",
  "axis-credit-cards": "https://www.axis.bank.in/cards/credit-card",
  "hsbc-live-plus": "https://www.hsbc.co.in/credit-cards/products/live-plus/",
  "hsbc-travelone": "https://www.hsbc.co.in/credit-cards/products/travelone/",
  "hdfc-swiggy": "https://www.hdfc.bank.in/credit-cards/swiggy-hdfc-bank-credit-card",
  "indianoil-xtra": "https://www.rbl.bank.in/personal-banking/cards/credit-cards/indianoil-rbl-bank-xtra-credit-card",
  "axis-ace": "https://www.axis.bank.in/cards/credit-card/axis-bank-ace-credit-card",
  "eazydiner": "https://www.indusind.bank.in/in/en/personal/cards/credit-card/eazydiner-credit-card.html"
};
for(const c of cards){if(verifiedLinks[c.slug]){c.url=verifiedLinks[c.slug];c.sourceKind=["axis-credit-cards","salaryse","bob-cashback","niyo-global","uni-gold-x"].includes(c.slug)?"directory":"product";}}

export type Service = {slug:string;name:string;label:string;format:"call"|"message"|"plan";duration:string;price:number;summary:string;fit:string;outcomes:string[];prepare:string[]};
export const services:Service[] = [
 {slug:"quick-question",name:"Quick Card Question",label:"One question. Clearer thinking.",format:"call",duration:"15 min",price:499,summary:"A focused video call for one specific credit card question, a bank or application issue, or the basics.",fit:"You have one question and want to talk it through.",outcomes:["Discuss one specific card question","Understand your options","Leave with a clear next step"],prepare:["Your main question","Card name, if relevant"]},
 {slug:"first-card",name:"First Credit Card Picker",label:"Your first card, understood.",format:"call",duration:"30 min",price:1400,summary:"A conversation for students and people in their first job who are choosing their first credit card.",fit:"You’re getting started and want help understanding the choices.",outcomes:["Understand what to look for in a first card","Discuss your normal spending habits","Learn the billing and repayment basics"],prepare:["Your main spending categories","What you want from your first card"]},
 {slug:"card-strategy",name:"Complete Card Strategy",label:"Give every card a purpose.",format:"call",duration:"60 min",price:2999,summary:"A deeper conversation about your spending, existing cards and goals, including a points-to-travel roadmap.",fit:"You have a few cards and want them to work better together.",outcomes:["Review your current card portfolio","Identify overlaps and gaps","Discuss a practical points-to-travel roadmap"],prepare:["Names of your existing cards","Your spending categories and travel goals"]},
 {slug:"couple-session",name:"Couple Session",label:"Two wallets. Shared goals.",format:"call",duration:"60 min",price:4299,summary:"A joint session for working couples to coordinate spending and work towards shared reward goals.",fit:"You and your partner want a coordinated approach.",outcomes:["Review both partners’ card portfolios","Discuss which card to use where","Plan shared reward goals"],prepare:["Both partners’ card names","Shared spending categories and goals"]},
 {slug:"nri-setup",name:"NRI Credit Card Setup",label:"A little clarity, across borders.",format:"call",duration:"45 min",price:4599,summary:"A conversation about credit card strategy for NRIs, covering Indian and international cards and airline miles.",fit:"You live abroad and have card questions across two countries.",outcomes:["Discuss Indian and international card options","Understand key cross-border considerations","Explore airline-miles questions"],prepare:["Your country of residence","Existing card names and travel patterns"]},
 {slug:"points-redemption",name:"Points Redemption Enquiry",label:"Your points. A clearer plan.",format:"message",duration:"Reply within 2 days",price:100,summary:"A text enquiry for help understanding how to redeem the reward points you already hold.",fit:"You have points or miles and a redemption question.",outcomes:["Share a focused redemption question","Understand the possible routes","Receive a written response"],prepare:["Reward programme and approximate balance","Travel destination and flexible dates, if relevant"]},
 {slug:"priority-whatsapp",name:"Priority WhatsApp Access",label:"Keep the conversation going.",format:"message",duration:"30 days access",price:1999,summary:"Unlimited credit card questions over WhatsApp for 30 days. The client service sheet lists a reply window of up to 7 days.",fit:"You want ongoing help with questions as they come up.",outcomes:["Ask card questions over the access period","Follow up as your questions evolve","Discuss usage and reward questions"],prepare:["Your first question","Relevant card names"]},
 {slug:"annual-plan",name:"Annual Card Optimisation",label:"A year of considered choices.",format:"plan",duration:"18 items · 1 year",price:14999,summary:"A year-long package of six strategy calls, six months of Priority WhatsApp Access and six Quick Card Questions.",fit:"You want to revisit your card strategy throughout the year.",outcomes:["6 Complete Card Strategy Calls","6 months of Priority WhatsApp Access","6 Quick Card Questions"],prepare:["Your current portfolio","Your goals for the coming year"]},
];
export const faqs = [
 {q:"I came from Instagram. Where do I start?",a:"Open Apply for cards if you want to explore options. Open Consultation if you want help with a question or your existing cards. You can browse without creating an account."},
 {q:"Do I apply for a card on this website?",a:"You explore the cards here. The application happens on the bank or provider’s website. The issuer decides eligibility, approval and the final terms."},
 {q:"How do consultations work?",a:"Choose a session, review what it covers, then continue to Arvind’s Topmate page to check the current service, availability, price and booking terms."},
 {q:"Which language can I use?",a:"Credit Kaaran’s explanations are built around Tamil, English and Tanglish. Use the language you’re comfortable with when choosing a session."},
 {q:"Do I need to share my card number?",a:"No. Use the card name when preparing a question. Never share your card number, CVV, OTP, PIN or account password."},
];
export const categoryBySlug=(slug:string)=>categories.find(c=>c.slug===slug);
export const serviceBySlug=(slug:string)=>services.find(s=>s.slug===slug);
export const cardBySlug=(slug:string)=>cards.find(c=>c.slug===slug);
export const money=(amount:number)=>new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(amount);
