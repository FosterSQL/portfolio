# Portfolio Design Guide

## 🎨 Visual Design System

### Typography Hierarchy

```
H1: 3.5rem (56px) - Page titles, Hero headings
H2: 2.5rem (40px) - Section headers
H3: 2rem (32px) - Subsection titles
H4: 1.5rem (24px) - Card titles
H5: 1.25rem (20px) - Small headings
H6: 1rem (16px) - Labels
Body1: 1rem (16px) - Main content
Body2: 0.875rem (14px) - Secondary content
```

### Color Usage Guide

#### Primary (Indigo) - #4c51bf

- Main navigation highlights
- Primary action buttons
- Link colors
- Active states
- Focus indicators

#### Secondary (Pink) - #ed64a6

- Secondary buttons
- Accent elements
- Chips and badges
- Decorative elements

#### Success (Green) - #48bb78

- Success messages
- Positive actions
- Confirmation states

#### Info (Blue) - #4299e1

- Informational messages
- Neutral actions
- Helper text

### Spacing System

```
xs: 8px   - Tight spacing, chips
sm: 16px  - Card padding, button gaps
md: 24px  - Section spacing
lg: 32px  - Page sections
xl: 48px  - Major sections
```

### Border Radius

```
Small: 8px  - Buttons, inputs
Medium: 12px - Cards, containers
Large: 16px - Feature cards, sections
```

### Shadow Depths

```
Level 1: 0px 2px 4px rgba(0,0,0,0.05)   - Subtle elevation
Level 2: 0px 4px 8px rgba(0,0,0,0.08)   - Cards at rest
Level 3: 0px 8px 16px rgba(0,0,0,0.1)   - Dropdowns, modals
Level 4: 0px 12px 28px rgba(0,0,0,0.15) - Cards on hover
```

---

## 📐 Layout Patterns

### Hero Section (Home Page)

```
┌─────────────────────────────────────────┐
│   Gradient Background (#667eea → #764ba2)│
│                                          │
│          Main Heading (H1)               │
│        Animated Subheading (H2)          │
│           Description Text               │
│                                          │
│      [Primary CTA] [Secondary CTA]       │
│                                          │
└─────────────────────────────────────────┘
```

### Card Grid Pattern (Projects, Skills)

```
┌──────────────┐  ┌──────────────┐
│    Image     │  │    Image     │
│              │  │              │
├──────────────┤  ├──────────────┤
│    Title     │  │    Title     │
│  Metadata    │  │  Metadata    │
│ Description  │  │ Description  │
│              │  │              │
└──────────────┘  └──────────────┘
```

### Timeline Pattern (Education)

```
        │
    ┌───●───────────────┐
    │   Item 1         │
    └──────────────────┘
        │
        ●───────────────┐
        │   Item 2      │
        └───────────────┘
        │
    ┌───●───────────────┐
    │   Item 3         │
    └──────────────────┘
        │
```

### Two-Column Form (Contact)

```
┌──────────────────┐  ┌──────────────────┐
│  Contact Form    │  │   Info Section   │
│                  │  │                  │
│  [Input Fields]  │  │  [Description]   │
│                  │  │                  │
│  [Submit Button] │  │  [Contact List]  │
│                  │  │                  │
└──────────────────┘  └──────────────────┘
```

---

## 🎭 Animation Guidelines

### Transition Durations

- **Quick**: 150ms - Small state changes, color shifts
- **Standard**: 300ms - Card hovers, button states
- **Slow**: 600ms - Page transitions, fade-ins

### Transform Effects

```css
/* Card Hover */
transform: translateY(-8px);
box-shadow: 0px 12px 28px rgba(0, 0, 0, 0.15);

/* Button Hover */
transform: translateY(-2px);
box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
```

### Fade In Animation

```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## 📱 Responsive Breakpoints

```javascript
// Material-UI default breakpoints
xs: 0px      // Mobile phones
sm: 600px    // Large phones, small tablets
md: 900px    // Tablets
lg: 1200px   // Desktop
xl: 1536px   // Large desktop
```

### Mobile Adjustments (< 600px)

- Single column layouts
- Hamburger menu
- Reduced typography sizes (H1: 2.5rem)
- Increased touch target sizes (min 44px)
- Stacked timeline layout

### Tablet Adjustments (600px - 900px)

- Two-column grids where appropriate
- Condensed navigation
- Optimized image sizes

### Desktop (> 900px)

- Full navigation bar
- Multi-column layouts
- Hover effects enabled
- Wider content areas

---

## 🎯 Component States

### Button States

```
Default:   Normal appearance
Hover:     Slight elevation, color shift
Active:    Pressed appearance
Disabled:  Reduced opacity (0.5)
Loading:   Spinner icon, disabled
```

### Card States

```
Default:   Subtle shadow
Hover:     Elevated, stronger shadow
Selected:  Border highlight (primary color)
Editing:   Blue border, white background
```

### Input States

```
Default:   Light gray border
Focus:     Primary color border, glow
Error:     Red border, error text below
Success:   Green border, success icon
Disabled:  Gray background, no interaction
```

---

## 🔤 Content Guidelines

### Headings

- Use sentence case for most headings
- Keep headings concise (< 60 characters)
- Use animated typing for personality

### Body Text

- Line height: 1.6-1.8 for readability
- Paragraph spacing: 1em
- Max width: 65-75 characters per line

### Buttons

- Action-oriented text (e.g., "Get Started", "View Projects")
- Keep to 1-3 words when possible
- Use icons to clarify actions

---

## 🎨 Icon Usage

### Material-UI Icons Library

```
Home:           HomeIcon
Education:      SchoolIcon
Projects:       WorkIcon / CodeIcon
Contact:        ContactMailIcon / EmailIcon
Skills:         DesignServicesIcon / CodeIcon
User:           PersonIcon
Add:            AddIcon
Edit:           EditIcon
Delete:         DeleteIcon
Save:           SaveIcon
Cancel:         CancelIcon
Download:       DownloadIcon
Location:       LocationOnIcon
Calendar:       CalendarTodayIcon
Menu:           MenuIcon
GitHub:         GitHubIcon
Database:       StorageIcon
Web:            WebIcon
```

---

## 🚀 Performance Best Practices

### Images

- Use WebP format when possible
- Lazy load images below the fold
- Set explicit width/height to prevent layout shift
- Use responsive images with srcset

### Animations

- Use CSS transforms (not top/left)
- Use opacity (not display/visibility)
- Respect `prefers-reduced-motion`
- Avoid animating expensive properties (box-shadow)

### Code Splitting

- Lazy load route components
- Split vendor bundles
- Use React.memo for expensive components

---

## ✅ Accessibility Checklist

- [ ] Semantic HTML structure
- [ ] Proper heading hierarchy
- [ ] Alt text for all images
- [ ] Keyboard navigation support
- [ ] Focus indicators visible
- [ ] ARIA labels where needed
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Form labels associated with inputs
- [ ] Error messages descriptive
- [ ] Skip to main content link

---

## 🎨 Design Principles

1. **Clarity**: Every element has a clear purpose
2. **Consistency**: Patterns repeat throughout the site
3. **Hierarchy**: Important information stands out
4. **Whitespace**: Generous spacing for breathing room
5. **Feedback**: User actions have clear responses
6. **Accessibility**: Usable by everyone
7. **Performance**: Fast and responsive
8. **Mobile-First**: Works on all devices

---

## 📝 Brand Voice

### Personality Traits

- Professional yet approachable
- Confident but not arrogant
- Technical but clear
- Modern and forward-thinking

### Writing Style

- Use active voice
- Be concise and clear
- Avoid jargon
- Use "I" for personal touch
- Be enthusiastic about technology

---

## 🎯 Call-to-Action Hierarchy

### Primary CTAs (Most Important)

- "View My Work"
- "Get In Touch"
- "Download Resume"
- Style: Contained button, primary color

### Secondary CTAs

- "Learn More"
- "See All Projects"
- Style: Outlined button, primary color

### Tertiary CTAs

- Navigation links
- Social media links
- Style: Text button or simple link

---

## 🌈 Gradient Palette

```css
/* Primary Gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Secondary Gradient */
background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);

/* Success Gradient */
background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
```

Use gradients sparingly for:

- Hero sections
- CTA cards
- Special highlights
- Loading states

---

This design guide ensures consistency across all pages and components!
