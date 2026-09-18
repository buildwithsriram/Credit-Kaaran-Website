# Credit Kaaran: one responsive website

This replaces the comparison experience. The two former concept routes redirect home.

## Source and design direction

- Brand guide v1.1: snow #F8F7F4, royal blue #4366B0, carbon #171717, orange #F49E1E as an accent; Raleway headings and Inter body text.
- Client workbook: eight consultation services and 35 normalized card/provider listings. Duplicate card rows are consolidated. Service prices reflect the supplied catalogue.
- Hand-drawn sitemap IMG_8309: Home, Consultation, Apply for cards, Courses, Webinars and Redemption; supporting introduction, learning and footer pages.
- Figma hMcTXVsCN9FKUKKKHUvzGu: category selection (858:193), category/detail structure (858:305), application sheet (858:428) and mobile sheet (849:265). Excluded section 908:764 is not used. Wireframe imagery and colours are not copied.
- Two newly generated transparent leather pockets provide material texture. Cards and their motion are rendered in the interface. The previous cover image is not referenced.

## Page map

| Route | Purpose |
| --- | --- |
| / | Welcome sequence, two wallets, introduction, benefits, learning links, FAQs |
| /?wallet=cards | Direct Instagram entry into card categories |
| /?wallet=consultation | Direct Instagram entry into services |
| /cards | Ten categories, searchable card collection, network filter |
| /cards/[category] | Category sidebar or mobile selector; matching cards |
| /card/[slug] | Card information, review tabs, official-provider application handoff |
| /consultation | Eight services with format filters |
| /consultation/[slug] | Service, catalogue price, preparation and Topmate handoff |
| /redemption | Points-help preparation and enquiry service |
| /courses | Free introductory guides and course availability notice |
| /learn/[slug] | Three readable learning guides with source links |
| /webinars | Availability notice and official announcement channel |
| /about, /contact | Brand introduction and official contact destinations |
| /privacy, /disclosures | Implemented data handling and product-link disclosures |

## Entrance and micro-interactions

1. Load both wallet assets and fonts, with a 350 ms minimum and 1.8 s maximum loading stage. Progress reflects settled assets; failure cannot lock the entrance.
2. Animate the monogram for 700 ms.
3. Introduce the centered title for 900 ms.
4. Measure the actual hero title and move the centered title into it over 850 ms with cubic-bezier(.76,0,.24,1).
5. Wallets slide into place from opposite edges over 1.2 s, with a 120 ms stagger.
6. Hover or keyboard focus raises and fans the live card layers over 650 ms. Service names remain visible; labels below each wallet explain the action.
7. Selecting a wallet lifts its cards out, then opens the matching collection after 520 ms. Touch users tap directly. Collections use a centered desktop dialog and a mobile bottom sheet.
8. Card and service tiles rise with short staggered delays. Details use accessible tabs; the next-step panel is a desktop side sheet and mobile bottom sheet.

Skip and Escape end the welcome immediately. It plays once per session and can be replayed from the home page. Direct wallet links skip the welcome. Reduced-motion settings remove the entrance and movement. Modal focus is trapped and restored; search and filters expose empty states.

## Working integrations and activation dependencies

- Card links use official issuer or provider destinations checked against public sources on 7 September 2026. Directory destinations are identified in the handoff panel. Affiliate tracking has not been invented.
- Consultations link to the publicly listed Topmate profile, https://topmate.io/credit_karan. Automated access to this profile was blocked; checkout and the availability of individual services could not be verified. The workbook supplies no direct service links. Provide the eight current Topmate service URLs to complete direct session-to-checkout navigation.
- Course curricula, hosted lessons, course checkout details and webinar dates/registration links were not supplied. Enrollment remains unavailable; free guides and official announcement links work.
- No visitor PII form, payment processor, fake booking confirmation or invented testimonial is implemented. Topmate and card providers own their respective applications and transactions.
- If affiliate URLs are supplied, update lib/site-content.ts and the link disclosures together. If an on-site booking or payment system is selected later, its storage, consent and cancellation requirements must be implemented with it.

## Implementation checks

Verification on 7 September 2026: production build passed; 87 frontend TypeScript files passed with no diagnostics; the built worker rendered 68 content routes, returned 404 for four invalid detail paths, and redirected both former-version paths home. Catalogue slugs, category membership, HTTPS destination syntax and wallet asset sizes were checked. Ordinary publishing does not include browser QA or verification of external provider checkout. Content, source links and route data are centralized in lib/site-content.ts and lib/learning-content.ts so the final client sitemap can be applied without rebuilding the brand or interaction system.
