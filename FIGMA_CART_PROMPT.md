# TOOLFUT - FIGMA CART & CHECKOUT PROMPT (5000 char max)

ACT AS: World-class UI/UX Designer (Awwwards + Lusion.co level) specializing in premium e-commerce experiences.

**BRAND: TOOLFUT** - Professional power tools platform, dark/industrial, engineering-focused aesthetic.

---

## DESIGN SYSTEM

**Colors:**
- Primary BG: #0a0a0a | Secondary: #050505 | Tertiary: #111111
- Accent: #f97316 (Electric orange) | Hover: #ea580c | Glow: rgba(249,115,22,0.3)
- Text Primary: rgba(255,255,255,0.95) | Secondary: 0.7 | Muted: 0.5 | Subtle: 0.4 | Faint: 0.3
- Borders Light: rgba(255,255,255,0.05) | Medium: 0.06 | Accent: rgba(249,115,22,0.2)
- Overlay Light: 0.03 | Medium: 0.05 | Heavy: rgba(10,10,10,0.85)

**Typography:** System UI / Inter (Clean, precision-focused)
- Headlines: tracking-tight, text-white/90
- Body: tracking-normal, text-white/70
- Labels: tracking-wide, text-white/50, medium weight

**Spacing:** xs:0.5rem | sm:0.75rem | md:1rem | lg:1.25rem | xl:1.5rem | 2xl:2rem

**Radius:** 4-6px (micro) | 8px (standard) | 16px (large)

---

## CART STRUCTURE

**Header Section:**
- Sticky cart icon + item count badge (#f97316)
- Breadcrumb: Home > Shop > Cart
- "Tu carrito de herramientas" heading with accent glow
- Subtext: "x items | Total estimado"

**Cart Items (Main Content):**
- Product image gallery with cinematic lighting + subtle 5% hover zoom
- Image dots indicator for variants
- Semi-transparent hover overlay + #f97316 quick-view icon
- Product name (white/90, medium), description (white/50), SKU (white/30, monospace)
- Price: Original (strikethrough, white/40) + Sale (#f97316, xl, bold)
- Stock indicator: Green/Orange/Red pill
- Quantity: [−] [number] [+] with smooth counter animation
- Variant selectors: Color swatches (32px circles, #f97316 border when selected), Size dropdown, Material pills
- Actions: Remove (white/50, hover: red), Save for later, Quick reorder with #f97316 glow

**Cart Summary (Sticky Sidebar / Mobile Bottom Sheet):**
- Dark card (#111111, white/0.05 border)
- Subtotal + Discount (−$XX, #f97316) + Shipping (TBD/FREE) + Tax
- TOTAL: Large, #f97316, bold, subtle glow
- CTA: Full-width #f97316 button, hover #ea580c (scale 1.02x), dark text, bold
- Secondary: Continue shopping, Apply coupon, Save cart (all white/50)

**Coupon Section:**
- Dark input + orange focus ring
- Apply button (#f97316)
- Success message: "Cupón aplicado" (green)

**Empty State:**
- Centered cart icon outline (64px, white/30)
- "Tu carrito está vacío" (white/70)
- "Explora nuestro catálogo..." (white/40)
- CTA: "Seguir comprando" (#f97316 with arrow)

---

## MICRO-INTERACTIONS

✓ Item hover: Shift to #111111, border highlight
✓ Remove: Slide-out + fade (300ms ease-out)
✓ Quantity: Number pulse + scale (200ms)
✓ Coupon focus: Orange glow ring
✓ Summary: Smooth number transitions
✓ CTA: Hover scale + orange glow
✓ Mobile: Bottom summary slides up on scroll

---

## RESPONSIVE

**Desktop (>1024px):** 2-column (items left + sticky summary right), full details, all hovers
**Tablet (768-1024px):** 1-column, sticky bottom bar, simplified rows
**Mobile (<768px):** Full-width, bottom sheet summary, 44px+ touch targets, horizontal image scroll, stacked variants

---

## ACCESSIBILITY

✓ WCAG AA contrast
✓ 2px orange focus rings
✓ 44px minimum touch targets
✓ Red (#ef4444) error states
✓ #f97316 loading spinner
✓ Success toasts
✓ Full keyboard nav

---

## OUTPUT: CREATE FIGMA FRAMES

1. **Desktop Cart** (1440px) - Full layout, all interactions
2. **Tablet Cart** (768px) - Adjusted spacing & bottom bar
3. **Mobile Cart** (375px) - Touch-optimized, bottom sheet
4. **Empty State** (all breakpoints)
5. **Component Library** - Buttons, inputs, badges, cards, swatches
6. **Micro-interaction Specs** - Timing, easing, stagger details

---

## STYLE INSPIRATION

Dyson.com (premium tools) + Apple.com (minimalist luxury) + Lusion.co (immersive animations) + Awwwards best practices.

**Premium, trustworthy, cinematic—ready for high-end e-commerce.**
