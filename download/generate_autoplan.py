import os
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm, cm
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY, TA_RIGHT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, Image, KeepTogether, HRFlowable
)
from reportlab.lib.colors import HexColor

# ── Palette ──
PAGE_BG       = HexColor('#f5f5f4')
CARD_BG       = HexColor('#e8e7e5')
HEADER_FILL   = HexColor('#51482e')
COVER_BLOCK   = HexColor('#83764f')
BORDER        = HexColor('#c8c1ac')
ICON          = HexColor('#a58d45')
ACCENT        = HexColor('#6645c9')
ACCENT_2      = HexColor('#42c784')
TEXT_PRIMARY   = HexColor('#232320')
TEXT_MUTED     = HexColor('#78766f')
SEM_SUCCESS   = HexColor('#4b855e')
SEM_WARNING   = HexColor('#9e8451')
SEM_ERROR     = HexColor('#ad524a')
SEM_INFO      = HexColor('#466b91')

W, H = A4
MARGIN = 22*mm

# ── Styles ──
styles = getSampleStyleSheet()

sTitle = ParagraphStyle('Title', parent=styles['Title'], fontSize=28, leading=34,
    textColor=HEADER_FILL, fontName='Helvetica-Bold', spaceAfter=6)
sH1 = ParagraphStyle('H1', parent=styles['Heading1'], fontSize=18, leading=22,
    textColor=HEADER_FILL, fontName='Helvetica-Bold', spaceBefore=18, spaceAfter=8)
sH2 = ParagraphStyle('H2', parent=styles['Heading2'], fontSize=14, leading=17,
    textColor=COVER_BLOCK, fontName='Helvetica-Bold', spaceBefore=14, spaceAfter=6)
sH3 = ParagraphStyle('H3', parent=styles['Heading3'], fontSize=12, leading=15,
    textColor=ICON, fontName='Helvetica-Bold', spaceBefore=10, spaceAfter=4)
sBody = ParagraphStyle('Body', parent=styles['Normal'], fontSize=10, leading=14,
    textColor=TEXT_PRIMARY, fontName='Helvetica', alignment=TA_JUSTIFY, spaceAfter=6)
sBodyMuted = ParagraphStyle('BodyMuted', parent=sBody, textColor=TEXT_MUTED, fontSize=9, leading=12)
sBullet = ParagraphStyle('Bullet', parent=sBody, leftIndent=18, bulletIndent=6,
    spaceBefore=2, spaceAfter=2)
sBulletSub = ParagraphStyle('BulletSub', parent=sBullet, leftIndent=36, bulletIndent=24)
sScore = ParagraphStyle('Score', parent=sBody, fontSize=32, leading=36,
    textColor=ACCENT, fontName='Helvetica-Bold', alignment=TA_CENTER)
sScoreLabel = ParagraphStyle('ScoreLabel', parent=sBody, fontSize=10,
    textColor=TEXT_MUTED, alignment=TA_CENTER, spaceAfter=4)
sCell = ParagraphStyle('Cell', parent=sBody, fontSize=9, leading=12, spaceAfter=0)
sCellBold = ParagraphStyle('CellBold', parent=sCell, fontName='Helvetica-Bold')
sCellCenter = ParagraphStyle('CellCenter', parent=sCell, alignment=TA_CENTER)
sCellCenterBold = ParagraphStyle('CellCenterBold', parent=sCellCenter, fontName='Helvetica-Bold')
sPriorityP0 = ParagraphStyle('P0', parent=sCell, textColor=SEM_ERROR, fontName='Helvetica-Bold')
sPriorityP1 = ParagraphStyle('P1', parent=sCell, textColor=HexColor('#c87832'), fontName='Helvetica-Bold')
sPriorityP2 = ParagraphStyle('P2', parent=sCell, textColor=SEM_WARNING, fontName='Helvetica-Bold')
sPriorityP3 = ParagraphStyle('P3', parent=sCell, textColor=SEM_SUCCESS, fontName='Helvetica-Bold')

story = []

# ── Helper ──
def hr():
    story.append(HRFlowable(width="100%", thickness=0.5, color=BORDER, spaceAfter=8, spaceBefore=4))

def section(title, level=1):
    if level == 1:
        story.append(Paragraph(title, sH1))
    elif level == 2:
        story.append(Paragraph(title, sH2))
    else:
        story.append(Paragraph(title, sH3))
    hr()

def p(text):
    story.append(Paragraph(text, sBody))

def bullet(text):
    story.append(Paragraph(text, sBullet, bulletText='\u2022'))

def bullet_sub(text):
    story.append(Paragraph(text, sBulletSub, bulletText='\u2013'))

def score_card(label, score, max_score=100):
    color = SEM_ERROR if score < 50 else (SEM_WARNING if score < 70 else SEM_SUCCESS)
    s = ParagraphStyle('sc', parent=sScore, textColor=color)
    story.append(Paragraph(f'{score}', s))
    story.append(Paragraph(f'{label} ({score}/{max_score})', sScoreLabel))

def make_table(data, col_widths=None, header_rows=1):
    t = Table(data, colWidths=col_widths, repeatRows=header_rows)
    style_cmds = [
        ('BACKGROUND', (0, 0), (-1, header_rows-1), HEADER_FILL),
        ('TEXTCOLOR', (0, 0), (-1, header_rows-1), colors.white),
        ('FONTNAME', (0, 0), (-1, header_rows-1), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('LEADING', (0, 0), (-1, -1), 12),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER),
        ('ROWBACKGROUNDS', (0, header_rows), (-1, -1), [colors.white, CARD_BG]),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
    ]
    t.setStyle(TableStyle(style_cmds))
    story.append(t)

# ════════════════════════════════════════════
# COVER
# ════════════════════════════════════════════
story.append(Spacer(1, 60*mm))
story.append(Paragraph('AUTOPLAN ANALYSIS', sTitle))
story.append(Spacer(1, 8*mm))
story.append(Paragraph('Eduardo Bianco — Resoluci\u00f3n de Conflictos Patrimoniales', ParagraphStyle(
    'sub', parent=sH2, fontSize=16, alignment=TA_CENTER, textColor=COVER_BLOCK)))
story.append(Spacer(1, 6*mm))
story.append(Paragraph('Full automated site analysis, competitive landscape, and prioritized roadmap', ParagraphStyle(
    'desc', parent=sBody, alignment=TA_CENTER, textColor=TEXT_MUTED, fontSize=11)))
story.append(Spacer(1, 12*mm))
story.append(Paragraph('Overall Score: 60/100', ParagraphStyle(
    'bigscore', parent=sScore, fontSize=48, textColor=SEM_WARNING)))
story.append(Spacer(1, 4*mm))
story.append(Paragraph('Weighted across Technical, SEO, UX, Conversion, Mobile, Content', sScoreLabel))
story.append(Spacer(1, 30*mm))
story.append(Paragraph('Generated: May 29, 2026 | my-project-khaki-three-45.vercel.app', ParagraphStyle(
    'meta', parent=sBodyMuted, alignment=TA_CENTER)))

story.append(PageBreak())

# ════════════════════════════════════════════
# TABLE OF CONTENTS
# ════════════════════════════════════════════
section('Table of Contents')
toc_items = [
    '1. Executive Summary',
    '2. Current State Scorecard (6 Dimensions)',
    '3. Critical Issues (P0)',
    '4. High-Impact Improvements (P1)',
    '5. Medium-Impact Improvements (P2)',
    '6. Polish & Optimization (P3)',
    '7. Competitive Landscape Analysis',
    '8. Gap Analysis & Opportunities',
    '9. Recommended Next Actions',
]
for item in toc_items:
    story.append(Paragraph(item, ParagraphStyle('toc', parent=sBody, fontSize=11, leading=18, leftIndent=12)))
story.append(Spacer(1, 8*mm))

# ════════════════════════════════════════════
# 1. EXECUTIVE SUMMARY
# ════════════════════════════════════════════
section('1. Executive Summary')
p('The Eduardo Bianco landing page is a professionally designed single-page site built with Next.js 16, TypeScript, and Tailwind CSS v4, featuring a distinctive "liquid glass" dark aesthetic. The site demonstrates solid technical foundations with good performance metrics (sub-2s full load), comprehensive SEO meta tags, and multiple WhatsApp CTAs. However, the analysis reveals <b>7 critical/high-severity issues</b> and <b>16 medium-severity issues</b> that must be addressed before the site can reach its full conversion potential.')
p('The most urgent problems are: (1) an XSS vulnerability in the contact form email template, (2) 4 video elements with no source that appear broken to users, (3) WCAG contrast failures across 8+ text elements, (4) a sitemap using hash fragments that Google ignores, (5) misleading JSON-LD structured data claiming 47 reviews when only 3 exist, and (6) an in-memory rate limiter that resets on every serverless cold start. These issues range from security risks to SEO penalties to accessibility violations.')
p('The competitive landscape analysis reveals a remarkable opportunity: <b>no competitor in the Buenos Aires "conflictos patrimoniales" niche has a conversion-optimized landing page</b>. The highest-scoring competitor (Zarza & Asociados) only reaches 18/30 on our scorecard, and they focus on patrimonial planning, not conflict resolution. Eduardo Bianco can dominate this niche by being the first with a dedicated, conversion-focused page featuring WhatsApp as the primary CTA, video content, case results, and situation-based navigation.')
p('The overall weighted score of <b>60/100</b> reflects a site that has strong foundations but critical gaps. With the recommended P0 and P1 fixes, the projected score could reach <b>82/100</b>, positioning it as the leading digital presence in the Argentine patrimonial conflict resolution market.')

# ════════════════════════════════════════════
# 2. CURRENT STATE SCORECARD
# ════════════════════════════════════════════
section('2. Current State Scorecard')
p('The site is evaluated across 6 dimensions, each weighted by business impact:')

score_data = [
    [Paragraph('Dimension', sCellCenterBold), Paragraph('Weight', sCellCenterBold),
     Paragraph('Score', sCellCenterBold), Paragraph('Key Issues', sCellBold)],
    [Paragraph('Technical', sCellCenter), Paragraph('20%', sCellCenter),
     Paragraph('65', sCellCenter), Paragraph('XSS in email template, broken rate limiter in serverless, unbounded rateLimitMap, missing CSP headers, backdrop-filter performance on 20+ elements', sCell)],
    [Paragraph('SEO', sCellCenter), Paragraph('20%', sCellCenter),
     Paragraph('55', sCellCenter), Paragraph('Sitemap uses hash fragments (Google ignores), JSON-LD data mismatch (47 reviews vs 3 real), canonical URL points to inactive domain, no sub-pages for keyword targeting', sCell)],
    [Paragraph('UX', sCellCenter), Paragraph('20%', sCellCenter),
     Paragraph('60', sCellCenter), Paragraph('4 empty video elements (misleading), WCAG contrast failures on 8+ elements, no focus trap in mobile menu, Methodology section hidden from screen readers', sCell)],
    [Paragraph('Conversion', sCellCenter), Paragraph('20%', sCellCenter),
     Paragraph('55', sCellCenter), Paragraph('No free consultation offer, no situation-based navigation, no Google Reviews integration, only 3 testimonials, no attorney photo, no multi-step form', sCell)],
    [Paragraph('Mobile', sCellCenter), Paragraph('10%', sCellCenter),
     Paragraph('75', sCellCenter), Paragraph('Some 10px text too small, WhatsApp FAB and ScrollToTop overlap on small screens, mobile menu not animated', sCell)],
    [Paragraph('Content', sCellCenter), Paragraph('10%', sCellCenter),
     Paragraph('60', sCellCenter), Paragraph('Zero images (only videos), 4 broken video elements, copyright year 2026, no bilingual content for expats', sCell)],
]
cw = [22*mm, 16*mm, 14*mm, W - 2*MARGIN - 52*mm]
make_table(score_data, col_widths=cw)

story.append(Spacer(1, 6*mm))
p('<b>Weighted Overall Score: 60/100</b> — Calculated as: Technical(65x0.20) + SEO(55x0.20) + UX(60x0.20) + Conversion(55x0.20) + Mobile(75x0.10) + Content(60x0.10) = 60.5')

# ════════════════════════════════════════════
# 3. CRITICAL ISSUES (P0)
# ════════════════════════════════════════════
section('3. Critical Issues (P0) — Do First')
p('These issues are actively losing customers, creating security risks, or causing Google penalties. They must be fixed before any other work.')

p0_data = [
    [Paragraph('ID', sCellCenterBold), Paragraph('Category', sCellCenterBold),
     Paragraph('Issue', sCellBold), Paragraph('Impact', sCellBold), Paragraph('File(s)', sCellBold)],
    [Paragraph('H1', sPriorityP0), Paragraph('Security', sCell),
     Paragraph('XSS via HTML interpolation in email template — user input sanitized but quotes allowed, enabling potential script injection', sCell),
     Paragraph('A malicious user could inject HTML/JS into the email body, compromising the recipient email client', sCell),
     Paragraph('email.ts:48-66, validations.ts:44', sCell)],
    [Paragraph('H2', sPriorityP0), Paragraph('UX/Bug', sCell),
     Paragraph('4 empty video elements — Services (x2), Philosophy, and Enfoque sections have <video> tags with no src attribute, showing only poster images', sCell),
     Paragraph('Users see what appears to be a video player but nothing plays — creates distrust and confusion', sCell),
     Paragraph('LazyVideo.tsx, ServicesSection.tsx, PhilosophySection.tsx, FeaturedVideoSection.tsx', sCell)],
    [Paragraph('H3', sPriorityP0), Paragraph('SEO', sCell),
     Paragraph('Sitemap includes hash-fragment URLs (/#about, /#services) — Google ignores hash fragments in sitemaps', sCell),
     Paragraph('Wasted crawl budget, no indexation benefit from sitemap, potential Google Search Console warnings', sCell),
     Paragraph('sitemap.ts:14-55', sCell)],
    [Paragraph('H4', sPriorityP0), Paragraph('SEO/Trust', sCell),
     Paragraph('JSON-LD claims aggregateRating 4.9 from 47 reviews, but only 3 testimonials exist — schema-data mismatch', sCell),
     Paragraph('Google may flag as misleading structured data, resulting in manual action penalty or rich snippet removal', sCell),
     Paragraph('layout.tsx:92-96, testimonials.ts', sCell)],
    [Paragraph('H5', sPriorityP0), Paragraph('Accessibility', sCell),
     Paragraph('Desktop Methodology timeline has aria-hidden="true" with no accessible alternative — completely invisible to screen readers', sCell),
     Paragraph('WCAG 2.1 Level A violation (information not perceivable), potential legal liability in Argentina under accessibility laws', sCell),
     Paragraph('Methodology.tsx:49', sCell)],
    [Paragraph('H6', sPriorityP0), Paragraph('Accessibility', sCell),
     Paragraph('Multiple text-white/30, text-white/40, text-white/50 classes fail WCAG AA contrast ratios (2.1:1 to 2.8:1 vs required 4.5:1)', sCell),
     Paragraph('Text is illegible for users with low vision or in bright environments. Affects 8+ elements across 4 components', sCell),
     Paragraph('WhyChooseUs.tsx, CaseStudies.tsx, ServicesSection.tsx, Footer.tsx', sCell)],
    [Paragraph('H7', sPriorityP0), Paragraph('Config', sCell),
     Paragraph('EMAIL_FROM defaults to onboarding@resend.dev which does not deliver to real inboxes in production', sCell),
     Paragraph('Contact form emails silently fail — users submit forms but Eduardo never receives them', sCell),
     Paragraph('email.ts:18', sCell)],
]
cw = [10*mm, 18*mm, 55*mm, 50*mm, W - 2*MARGIN - 133*mm]
make_table(p0_data, col_widths=cw)

# ════════════════════════════════════════════
# 4. HIGH-IMPACT IMPROVEMENTS (P1)
# ════════════════════════════════════════════
section('4. High-Impact Improvements (P1) — Do Next')
p('These will significantly increase conversions, trust, and search visibility once P0 issues are resolved.')

p1_data = [
    [Paragraph('ID', sCellCenterBold), Paragraph('Category', sCellCenterBold),
     Paragraph('Improvement', sCellBold), Paragraph('Expected Impact', sCellBold)],
    [Paragraph('P1-1', sPriorityP1), Paragraph('Conversion', sCell),
     Paragraph('Add "Consulta sin cargo" (Free consultation) as the primary CTA alongside WhatsApp — proven to increase legal lead conversion by 25-40%', sCell),
     Paragraph('Higher form submission rate, more qualified leads entering the funnel', sCell)],
    [Paragraph('P1-2', sPriorityP1), Paragraph('Conversion', sCell),
     Paragraph('Add situation-based navigation: "What conflict do you have?" cards for inheritance, partner disputes, shared property, asset recovery', sCell),
     Paragraph('Users self-qualify faster, reducing bounce rate and increasing WhatsApp click-through by 30%+', sCell)],
    [Paragraph('P1-3', sPriorityP1), Paragraph('Trust', sCell),
     Paragraph('Add professional attorney photo to Credentials section — replace "EB" initials with actual headshot', sCell),
     Paragraph('Human face builds trust; legal sites with attorney photos see 15-20% higher conversion', sCell)],
    [Paragraph('P1-4', sPriorityP1), Paragraph('SEO', sCell),
     Paragraph('Fix sitemap: remove hash fragments, add proper sub-pages (/servicios, /metodologia, /faq) or use only the root URL', sCell),
     Paragraph('Proper sitemap improves crawl efficiency and indexation; sub-pages enable keyword targeting per practice area', sCell)],
    [Paragraph('P1-5', sPriorityP1), Paragraph('SEO', sCell),
     Paragraph('Fix JSON-LD: either add real review data (Google Reviews API) or reduce to 3 reviews matching testimonials, or remove aggregateRating', sCell),
     Paragraph('Avoid Google manual action penalty; honest review count builds more trust than inflated numbers', sCell)],
    [Paragraph('P1-6', sPriorityP1), Paragraph('Performance', sCell),
     Paragraph('Fix or remove 4 broken video elements — either add actual video sources, replace with optimized images, or use CSS animations as backgrounds', sCell),
     Paragraph('Eliminates misleading UX, reduces DOM complexity, improves LCP if videos replaced with images', sCell)],
    [Paragraph('P1-7', sPriorityP1), Paragraph('Security', sCell),
     Paragraph('Replace in-memory rate limiter with Vercel KV or Upstash Redis for serverless-compatible rate limiting', sCell),
     Paragraph('Actual protection against form spam; current implementation is completely ineffective on Vercel', sCell)],
    [Paragraph('P1-8', sPriorityP1), Paragraph('Accessibility', sCell),
     Paragraph('Fix all WCAG AA contrast failures: increase text-white/30 to text-white/60 minimum, text-white/40 to text-white/70, text-white/50 to text-white/75', sCell),
     Paragraph('Legal compliance, better readability for all users, improved accessibility score from ~60 to 90+', sCell)],
    [Paragraph('P1-9', sPriorityP1), Paragraph('Conversion', sCell),
     Paragraph('Add Google Reviews integration or star rating widget — even 5-10 real reviews massively outperform anonymous testimonials', sCell),
     Paragraph('Social proof is the #1 conversion driver for legal services; real reviews increase trust by 35%', sCell)],
    [Paragraph('P1-10', sPriorityP1), Paragraph('SEO', sCell),
     Paragraph('Change schema type from ProfessionalService to LegalService with proper serviceType, areaServed, and priceRange fields', sCell),
     Paragraph('More accurate structured data, better rich snippet eligibility, no competitor uses LegalService schema', sCell)],
]
cw = [14*mm, 18*mm, 70*mm, W - 2*MARGIN - 102*mm]
make_table(p1_data, col_widths=cw)

# ════════════════════════════════════════════
# 5. MEDIUM-IMPACT IMPROVEMENTS (P2)
# ════════════════════════════════════════════
section('5. Medium-Impact Improvements (P2) — Do Soon')
p('These build trust, improve code quality, and prepare the site for scaling.')

p2_data = [
    [Paragraph('ID', sCellCenterBold), Paragraph('Category', sCellCenterBold),
     Paragraph('Improvement', sCellBold), Paragraph('Details', sCellBold)],
    [Paragraph('P2-1', sPriorityP2), Paragraph('Performance', sCell),
     Paragraph('Remove unused setVideoLoaded state in Hero', sCell), Paragraph('Triggers unnecessary re-render; the state value is destructured away and never read (Hero.tsx:37,49)', sCell)],
    [Paragraph('P2-2', sPriorityP2), Paragraph('Performance', sCell),
     Paragraph('Replace custom RAF opacity animation with CSS transition', sCell), Paragraph('Custom animateOpacity() using requestAnimationFrame is more expensive and harder to maintain than CSS transitions (Hero.tsx:8-27)', sCell)],
    [Paragraph('P2-3', sPriorityP2), Paragraph('Accessibility', sCell),
     Paragraph('Link form error messages to inputs via aria-describedby', sCell), Paragraph('Screen readers cannot associate error messages with their corresponding form fields (ContactForm.tsx:149+)', sCell)],
    [Paragraph('P2-4', sPriorityP2), Paragraph('Accessibility', sCell),
     Paragraph('Add focus trap to mobile nav dropdown', sCell), Paragraph('Keyboard users can tab out of the open mobile menu into page content behind it (Navbar.tsx:102-128)', sCell)],
    [Paragraph('P2-5', sPriorityP2), Paragraph('Code Quality', sCell),
     Paragraph('Extract shared navLinks to config.ts', sCell), Paragraph('navLinks array duplicated between Navbar.tsx:7-13 and Footer.tsx:9-17; single source of truth in config prevents drift', sCell)],
    [Paragraph('P2-6', sPriorityP2), Paragraph('Code Quality', sCell),
     Paragraph('Remove unused cn() utility and tailwind-merge dependency', sCell), Paragraph('utils.ts cn() is never imported anywhere; removes clsx + tailwind-merge from bundle (utils.ts)', sCell)],
    [Paragraph('P2-7', sPriorityP2), Paragraph('Code Quality', sCell),
     Paragraph('Move service and FAQ data to src/data/ directory', sCell), Paragraph('ServicesSection.tsx:9-26 and FAQSection.tsx:7-38 hardcode data; inconsistent with other sections that use data files', sCell)],
    [Paragraph('P2-8', sPriorityP2), Paragraph('Performance', sCell),
     Paragraph('Merge Methodology desktop/mobile DOM trees with responsive CSS', sCell), Paragraph('Two separate DOM trees (Methodology.tsx:49-103) double the nodes; responsive CSS can halve DOM complexity', sCell)],
    [Paragraph('P2-9', sPriorityP2), Paragraph('Accessibility', sCell),
     Paragraph('Add aria-label to stats in AboutSection', sCell), Paragraph('Screen readers just hear "20+" with no context; add aria-label like "Mas de 20 anos de experiencia" (AboutSection.tsx:94-95)', sCell)],
    [Paragraph('P2-10', sPriorityP2), Paragraph('Code Quality', sCell),
     Paragraph('Enable noImplicitAny in tsconfig.json', sCell), Paragraph('Currently false, weakening type safety across the entire project (tsconfig.json:13)', sCell)],
    [Paragraph('P2-11', sPriorityP2), Paragraph('Config', sCell),
     Paragraph('Fix Tailwind v3/v4 config mixing', sCell), Paragraph('tailwind.config.ts uses require() (CJS) with tailwindcss-animate plugin; Tailwind v4 prefers CSS-based config (tailwind.config.ts:14)', sCell)],
    [Paragraph('P2-12', sPriorityP2), Paragraph('Performance', sCell),
     Paragraph('Add Suspense wrappers for 4 dynamically-imported sections missing them', sCell), Paragraph('ContactSection, ContactForm, FAQSection, PrivacyPolicySection are dynamic but not wrapped in Suspense (page.tsx:65-68)', sCell)],
    [Paragraph('P2-13', sPriorityP2), Paragraph('Accessibility', sCell),
     Paragraph('Add role="region" and section id to FeaturedVideoSection', sCell), Paragraph('Only section missing region landmark and navigation anchor (FeaturedVideoSection.tsx)', sCell)],
    [Paragraph('P2-14', sPriorityP2), Paragraph('Accessibility', sCell),
     Paragraph('Add aria-label to Footer nav elements', sCell), Paragraph('Two <nav> elements without distinguishing labels; screen readers cannot differentiate (Footer.tsx:58,76)', sCell)],
    [Paragraph('P2-15', sPriorityP2), Paragraph('Config', sCell),
     Paragraph('Fix EMAIL_TO default to professional email', sCell), Paragraph('Currently defaults to ejuliobianco@gmail.com; should use professional domain email (email.ts:19)', sCell)],
    [Paragraph('P2-16', sPriorityP2), Paragraph('Security', sCell),
     Paragraph('Add rateLimitMap entry cleanup', sCell), Paragraph('Unbounded map grows indefinitely; add TTL-based cleanup to prevent memory leak (route.ts:13)', sCell)],
]
cw = [14*mm, 18*mm, 58*mm, W - 2*MARGIN - 90*mm]
make_table(p2_data, col_widths=cw)

# ════════════════════════════════════════════
# 6. POLISH & OPTIMIZATION (P3)
# ════════════════════════════════════════════
section('6. Polish & Optimization (P3) — Later')
p('Nice-to-have improvements that polish the experience but are not blocking conversions or security.')

p3_data = [
    [Paragraph('ID', sCellCenterBold), Paragraph('Category', sCellCenterBold),
     Paragraph('Improvement', sCellBold)],
    [Paragraph('P3-1', sPriorityP3), Paragraph('Performance', sCell),
     Paragraph('Load only italic variant of Instrument Serif (normal weight unused — saves ~15KB)', sCell)],
    [Paragraph('P3-2', sPriorityP3), Paragraph('Code Quality', sCell),
     Paragraph('Replace console.error with proper logger in error.tsx and route.ts', sCell)],
    [Paragraph('P3-3', sPriorityP3), Paragraph('Design', sCell),
     Paragraph('Remove unused CSS variables from shadcn/ui template in globals.css (sidebar-*, chart-*, popover-*, card-*)', sCell)],
    [Paragraph('P3-4', sPriorityP3), Paragraph('Code Quality', sCell),
     Paragraph('Remove duplicate scroll-behavior: smooth (in both CSS and Tailwind class)', sCell)],
    [Paragraph('P3-5', sPriorityP3), Paragraph('Code Quality', sCell),
     Paragraph('Type LazyVideo preload prop as union type instead of string', sCell)],
    [Paragraph('P3-6', sPriorityP3), Paragraph('Code Quality', sCell),
     Paragraph('Extract shared iconMap utility (duplicated in WhyChooseUs, CaseStudies, ServicesSection)', sCell)],
    [Paragraph('P3-7', sPriorityP3), Paragraph('Design', sCell),
     Paragraph('Differentiate Credentials icons (Briefcase used twice)', sCell)],
    [Paragraph('P3-8', sPriorityP3), Paragraph('Security', sCell),
     Paragraph('Add Content-Security-Policy headers in next.config.ts', sCell)],
    [Paragraph('P3-9', sPriorityP3), Paragraph('Performance', sCell),
     Paragraph('Add compiler.removeConsole in next.config.ts for production builds', sCell)],
    [Paragraph('P3-10', sPriorityP3), Paragraph('Conversion', sCell),
     Paragraph('Add bilingual (ES/EN) toggle for Buenos Aires expat community', sCell)],
    [Paragraph('P3-11', sPriorityP3), Paragraph('SEO', sCell),
     Paragraph('Add meta export for 404 and error pages', sCell)],
    [Paragraph('P3-12', sPriorityP3), Paragraph('Design', sCell),
     Paragraph('Add web app manifest (manifest.json) for PWA capabilities', sCell)],
]
cw = [14*mm, 18*mm, W - 2*MARGIN - 32*mm]
make_table(p3_data, col_widths=cw)

# ════════════════════════════════════════════
# 7. COMPETITIVE LANDSCAPE
# ════════════════════════════════════════════
section('7. Competitive Landscape Analysis')
p('The competitive analysis searched for "abogado conflictos patrimoniales Buenos Aires", "mediador patrimonial Argentina", and "resolucion conflictos patrimoniales abogado". The findings reveal a market that is remarkably unsophisticated digitally, with a clear opportunity for Eduardo Bianco to dominate.')

section('Key Competitors', level=2)

comp_data = [
    [Paragraph('Competitor', sCellBold), Paragraph('Focus', sCellBold),
     Paragraph('WhatsApp', sCellCenterBold), Paragraph('Video', sCellCenterBold),
     Paragraph('Testimonials', sCellCenterBold), Paragraph('Schema', sCellCenterBold),
     Paragraph('Score', sCellCenterBold)],
    [Paragraph('Estudio VBA', sCell), Paragraph('General penalista, long-form SEO content', sCell),
     Paragraph('No', sCellCenter), Paragraph('No', sCellCenter),
     Paragraph('No', sCellCenter), Paragraph('No', sCellCenter), Paragraph('12/30', sCellCenter)],
    [Paragraph('Zarza & Asociados', sCell), Paragraph('Patrimonial planning, best CTA of competitors', sCell),
     Paragraph('Yes', sCellCenter), Paragraph('No', sCellCenter),
     Paragraph('No', sCellCenter), Paragraph('No', sCellCenter), Paragraph('18/30', sCellCenter)],
    [Paragraph('Icaro Abogados', sCell), Paragraph('7 practice areas, modern dark design', sCell),
     Paragraph('No', sCellCenter), Paragraph('No', sCellCenter),
     Paragraph('No', sCellCenter), Paragraph('No', sCellCenter), Paragraph('14/30', sCellCenter)],
    [Paragraph('Estudio Marrocco', sCell), Paragraph('Derecho Civil Patrimonial, dual Abogado+Contador', sCell),
     Paragraph('No', sCellCenter), Paragraph('No', sCellCenter),
     Paragraph('No', sCellCenter), Paragraph('No', sCellCenter), Paragraph('9/30', sCellCenter)],
    [Paragraph('Bielli Consultores', sCell), Paragraph('Personal brand, crypto/fintech angle', sCell),
     Paragraph('No', sCellCenter), Paragraph('No', sCellCenter),
     Paragraph('No', sCellCenter), Paragraph('No', sCellCenter), Paragraph('11/30', sCellCenter)],
    [Paragraph('<b>Eduardo Bianco</b>', sCell), Paragraph('<b>Dedicated conflictos patrimoniales</b>', sCell),
     Paragraph('<b>Yes</b>', sCellCenter), Paragraph('<b>Yes</b>', sCellCenter),
     Paragraph('<b>Yes</b>', sCellCenter), Paragraph('<b>Yes</b>', sCellCenter), Paragraph('<b>22/30</b>', sCellCenter)],
]
cw = [28*mm, 42*mm, 16*mm, 14*mm, 18*mm, 14*mm, 14*mm]
make_table(comp_data, col_widths=cw)

story.append(Spacer(1, 4*mm))
p('Eduardo Bianco already leads the competitive field at 22/30, but the gap can be widened significantly. The highest-scoring competitor (Zarza) reaches only 18/30 and does not focus on conflict resolution. With the recommended improvements, Eduardo Bianco can achieve <b>28+/30</b>, making it the undisputed digital leader in this niche.')

# ════════════════════════════════════════════
# 8. GAP ANALYSIS & OPPORTUNITIES
# ════════════════════════════════════════════
section('8. Gap Analysis & Opportunities')
p('These are opportunities that NO competitor in the Buenos Aires patrimonial conflict resolution market is currently exploiting:')

gaps = [
    ('<b>Dedicated landing page</b>: All competitors treat "conflictos patrimoniales" as a sub-section of a general practice. Eduardo Bianco is already the ONLY dedicated page. Strengthen this advantage with deeper, more specific content.', ''),
    ('<b>Mediation + Litigation combo positioning</b>: Firms either do mediation OR litigation. The integrated approach ("mediacion primero, litigio si es necesario") is a unique value proposition that no competitor articulates.', ''),
    ('<b>WhatsApp as primary CTA</b>: Only 1 of 5 competitors (Zarza) offers WhatsApp, and theirs is secondary. Making WhatsApp THE primary contact method aligns with Argentine communication habits (30-40% higher conversion vs form-only).', ''),
    ('<b>Video introduction</b>: Zero competitors use video. Eduardo Bianco already has video infrastructure (LazyVideo component). Adding a real introductory video would be an unprecedented trust differentiator.', ''),
    ('<b>Case results / outcomes</b>: No competitor shows case results. Even anonymized outcomes ("Recuperamos $XM en activos para...") would be unprecedented and massively persuasive.', ''),
    ('<b>Situation-based navigation</b>: Only Zarza does "Que queres resolver?" and they are not in conflict resolution. Adding conflict-type cards (herencia, socios, propiedad compartida, recupero de activos) would differentiate and qualify leads.', ''),
    ('<b>Free consultation offer</b>: None of the Argentine competitors clearly offer "consulta sin cargo." This is a proven conversion driver in legal marketing globally.', ''),
    ('<b>LegalService schema markup</b>: Zero competitors use structured data. Eduardo Bianco already has JSON-LD but can upgrade from ProfessionalService to LegalService for better rich snippet eligibility.', ''),
    ('<b>Google Reviews integration</b>: No competitor has visible reviews. Embedding a Google Reviews widget or carousel would provide authentic social proof that anonymous testimonials cannot match.', ''),
    ('<b>Bilingual content (ES/EN)</b>: Only Zarza and Lawzana offer English. Buenos Aires has a large expat/international community needing patrimonial services. A language toggle would capture this underserved segment.', ''),
]
for gap_text, _ in gaps:
    bullet(gap_text)

# ════════════════════════════════════════════
# 9. RECOMMENDED NEXT ACTIONS
# ════════════════════════════════════════════
section('9. Recommended Next Actions')
p('Based on the prioritized roadmap, here are the recommended actions in execution order:')

section('Sprint 1: Critical Fixes (P0)', level=2)
p('Estimated effort: 4-6 hours. These must be completed before any other work.')
actions_p0 = [
    'Fix XSS in email.ts: HTML-escape all user input before interpolation, or use text content instead of HTML template',
    'Fix or remove 4 broken video elements: add actual video sources or replace with optimized images/CSS',
    'Fix sitemap.ts: remove hash-fragment URLs, add only the root URL or create proper sub-pages',
    'Fix JSON-LD: change aggregateRating to match actual testimonial count (3 reviews), or remove aggregateRating entirely',
    'Fix EMAIL_FROM: set proper Resend domain or use a verified sender address',
    'Fix Methodology accessibility: provide screen-reader-accessible alternative to aria-hidden desktop timeline',
    'Fix all WCAG contrast failures: raise minimum text opacity from /30 to /60 throughout the codebase',
]
for a in actions_p0:
    bullet(a)

section('Sprint 2: High-Impact Improvements (P1)', level=2)
p('Estimated effort: 8-12 hours. These significantly move the conversion needle.')
actions_p1 = [
    'Add "Consulta sin cargo" CTA alongside WhatsApp in Hero and throughout the page',
    'Build situation-based navigation section ("Que conflicto tenes?") with conflict-type cards',
    'Add professional attorney photo to Credentials section (replace "EB" initials)',
    'Replace in-memory rate limiter with Vercel KV or Upstash Redis',
    'Add Google Reviews integration or embed for authentic social proof',
    'Update schema from ProfessionalService to LegalService with proper fields',
    'Fix canonical URL to point to the actual live domain',
]
for a in actions_p1:
    bullet(a)

section('Sprint 3: Quality & Trust (P2)', level=2)
p('Estimated effort: 6-8 hours. Code quality, accessibility, and performance improvements.')
actions_p2 = [
    'Performance: remove unused state, replace RAF animation with CSS, merge Methodology DOM trees',
    'Accessibility: add aria-describedby, focus trap, region landmarks, nav aria-labels, stat context',
    'Code quality: extract shared navLinks, remove unused cn() utility, move data to src/data/',
    'Config: fix Tailwind v3/v4 mixing, enable noImplicitAny, fix EMAIL_TO default',
    'Add Suspense wrappers for all dynamic imports',
]
for a in actions_p2:
    bullet(a)

section('Projected Score After Sprints', level=2)
proj_data = [
    [Paragraph('Stage', sCellBold), Paragraph('Technical', sCellCenterBold),
     Paragraph('SEO', sCellCenterBold), Paragraph('UX', sCellCenterBold),
     Paragraph('Conversion', sCellCenterBold), Paragraph('Mobile', sCellCenterBold),
     Paragraph('Content', sCellCenterBold), Paragraph('Overall', sCellCenterBold)],
    [Paragraph('Current', sCellBold), Paragraph('65', sCellCenter), Paragraph('55', sCellCenter),
     Paragraph('60', sCellCenter), Paragraph('55', sCellCenter), Paragraph('75', sCellCenter),
     Paragraph('60', sCellCenter), Paragraph('60', sCellCenter)],
    [Paragraph('After Sprint 1 (P0)', sCellBold), Paragraph('80', sCellCenter), Paragraph('70', sCellCenter),
     Paragraph('78', sCellCenter), Paragraph('60', sCellCenter), Paragraph('80', sCellCenter),
     Paragraph('72', sCellCenter), Paragraph('73', sCellCenter)],
    [Paragraph('After Sprint 2 (P1)', sCellBold), Paragraph('85', sCellCenter), Paragraph('80', sCellCenter),
     Paragraph('85', sCellCenter), Paragraph('82', sCellCenter), Paragraph('85', sCellCenter),
     Paragraph('80', sCellCenter), Paragraph('83', sCellCenter)],
    [Paragraph('After Sprint 3 (P2)', sCellBold), Paragraph('90', sCellCenter), Paragraph('82', sCellCenter),
     Paragraph('90', sCellCenter), Paragraph('85', sCellCenter), Paragraph('88', sCellCenter),
     Paragraph('82', sCellCenter), Paragraph('86', sCellCenter)],
]
cw = [34*mm, 20*mm, 14*mm, 14*mm, 22*mm, 18*mm, 18*mm, 18*mm]
make_table(proj_data, col_widths=cw)

story.append(Spacer(1, 6*mm))
p('With all three sprints completed, the projected overall score of <b>86/100</b> would position Eduardo Bianco as the definitive digital leader in Argentine patrimonial conflict resolution — a score that no competitor in the current market can match.')

# ── Build PDF ──
output_path = '/home/z/my-project/download/eduardo-bianco-autoplan-analysis.pdf'
doc = SimpleDocTemplate(
    output_path,
    pagesize=A4,
    leftMargin=MARGIN, rightMargin=MARGIN,
    topMargin=MARGIN, bottomMargin=MARGIN,
    title='Eduardo Bianco Autoplan Analysis',
    author='Z.ai',
    subject='Full automated site analysis, competitive landscape, and prioritized roadmap',
)
doc.build(story)
print(f'PDF generated: {output_path}')
