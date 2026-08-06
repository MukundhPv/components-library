export type BlockCategory =
  | 'command-palette'
  | 'search'
  | 'filter-pills'
  | 'sort'
  | 'stat-card'
  | 'toast'
  | 'skeleton'
  | 'tabs'
  | 'tag-input'
  | 'pricing-toggle'

export interface UIBlock {
  id: string
  name: string
  category: BlockCategory
  description: string
  longDescription: string
  prompt: string
  tags: string[]
  accentColor: string
}

export interface BlockCategoryMeta {
  id: BlockCategory
  label: string
  description: string
  color: string
  count: number
}

export const blockCategories: BlockCategoryMeta[] = [
  {
    id: 'command-palette',
    label: 'Command Palette',
    description: 'CMD+K style overlay with fuzzy search and keyboard navigation.',
    color: '#a855f7',
    count: 2,
  },
  {
    id: 'search',
    label: 'Search Bar',
    description: 'Expanding animated search with live suggestions dropdown.',
    color: '#6366f1',
    count: 2,
  },
  {
    id: 'filter-pills',
    label: 'Filter Pills',
    description: 'Animated filter chip selection with active count badge.',
    color: '#06b6d4',
    count: 2,
  },
  {
    id: 'sort',
    label: 'Sort & Order',
    description: 'Dropdown sort selectors with smooth animated transitions.',
    color: '#10b981',
    count: 2,
  },
  {
    id: 'stat-card',
    label: 'Stat Cards',
    description: 'Animated number counters with trend indicators and sparklines.',
    color: '#f59e0b',
    count: 2,
  },
  {
    id: 'toast',
    label: 'Toast Notifications',
    description: 'Slide-in notification toasts with stacking and auto-dismiss.',
    color: '#ec4899',
    count: 2,
  },
  {
    id: 'skeleton',
    label: 'Skeletons',
    description: 'Shimmer loading placeholders that match content layout.',
    color: '#64748b',
    count: 2,
  },
  {
    id: 'tabs',
    label: 'Tab Switcher',
    description: 'Pill tabs with a sliding animated indicator and content transitions.',
    color: '#0ea5e9',
    count: 2,
  },
  {
    id: 'tag-input',
    label: 'Tag Input',
    description: 'Animated tag creation and removal with keyboard support.',
    color: '#84cc16',
    count: 2,
  },
  {
    id: 'pricing-toggle',
    label: 'Pricing Toggle',
    description: 'Monthly/annual billing toggle with animated price transitions.',
    color: '#f97316',
    count: 2,
  },
]

export const blocks: UIBlock[] = [
  // COMMAND PALETTE
  {
    id: 'command-palette-default',
    name: 'Command Palette',
    category: 'command-palette',
    description: 'Full CMD+K command palette with search, groups, and keyboard nav.',
    longDescription: 'A full-featured command palette triggered by CMD+K. Features fuzzy search across grouped commands, keyboard navigation (arrow keys + enter), and a frosted glass backdrop. Dismisses on Escape or outside click.',
    prompt: `Build a CMD+K command palette overlay. Trigger on Cmd/Ctrl+K keydown. Render a centered modal with frosted glass backdrop (backdrop-blur-md, bg-black/60). Inside: a search input at top (auto-focused), below it a scrollable list of grouped commands. Each command has an icon, label, and optional shortcut badge. Filter commands in real-time as user types (fuzzy match on label). Arrow Up/Down navigate the list, Enter executes the focused command, Escape closes. Animate entry with framer-motion: scale 0.95→1, opacity 0→1, 200ms spring. Use a fixed z-index of 9999.`,
    tags: ['search', 'keyboard', 'overlay', 'navigation'],
    accentColor: '#a855f7',
  },
  {
    id: 'command-palette-compact',
    name: 'Compact Command Bar',
    category: 'command-palette',
    description: 'Minimal floating command bar pinned to top of screen.',
    longDescription: 'A compact command bar that slides down from the top on CMD+K. Narrower than a full palette — just a search bar with instant results. Great for focused toolbars.',
    prompt: `Create a compact command bar that slides down from the top of the viewport on CMD+K. Width: 480px, centered. Animate from translateY(-100%) to translateY(0) with spring physics. The bar has a single input and shows up to 5 results below it in a compact list (no groups). Results highlight on hover and arrow key navigation. Pin to the top with a subtle shadow. Dismiss on Escape, click outside, or selecting a command.`,
    tags: ['search', 'compact', 'slide', 'toolbar'],
    accentColor: '#a855f7',
  },

  // SEARCH
  {
    id: 'search-expanding',
    name: 'Expanding Search',
    category: 'search',
    description: 'Icon that expands into a full search input on click.',
    longDescription: 'A search icon button that animates into a full-width input field on click. Collapses back on blur or Escape. Smooth width animation using layout transitions.',
    prompt: `Create an expanding search bar. Default state: a circular icon button (search icon, 40px). On click, animate width from 40px to 280px using framer-motion layout animation (duration: 0.3s, ease: [0.4, 0, 0.2, 1]). Auto-focus the input after expansion. Show a clear (X) button when text is present. On blur with no text or on Escape, animate back to icon. Use AnimatePresence for the X button. The icon should fade out as the bar expands.`,
    tags: ['input', 'expand', 'icon', 'animation'],
    accentColor: '#6366f1',
  },
  {
    id: 'search-suggestions',
    name: 'Search with Suggestions',
    category: 'search',
    description: 'Search input with an animated suggestions dropdown.',
    longDescription: 'A search bar with a live suggestions dropdown that animates in below the input. Each suggestion highlights on hover. Keyboard navigable. Shows recent searches when empty.',
    prompt: `Build a search input with an animated suggestions dropdown. On focus, show a dropdown (AnimatePresence, slide down + fade in, 200ms). When empty, show "Recent searches" with 3 example items. As user types, filter suggestions in real-time. Each suggestion row: left icon, main text with matched portion bolded, right arrow. Keyboard: Up/Down to navigate, Enter to select, Escape to close. Close on outside click. Dropdown has max-height 280px with overflow-y scroll. Style: dark bg, subtle border, rounded-xl.`,
    tags: ['input', 'dropdown', 'suggestions', 'keyboard'],
    accentColor: '#6366f1',
  },

  // FILTER PILLS
  {
    id: 'filter-pills-default',
    name: 'Filter Pills',
    category: 'filter-pills',
    description: 'Animated multi-select filter chips with active count.',
    longDescription: 'A row of filter pill buttons. Multi-select supported. Active pills animate their background fill. An active count badge appears when filters are selected. A "Clear all" appears inline.',
    prompt: `Create a filter pill row. Each pill: label, optional icon. On click, toggle selected state. Selected state: filled background (accent color), white text. Unselected: transparent bg, muted border, muted text. Use framer-motion layout animation so pill width changes smoothly when a checkmark icon appears on selection. Show a badge "3 active" that animates in (scale + fade) when any filter is selected. Add a "Clear" button that appears with AnimatePresence when filters are active. Deselect all on clear.`,
    tags: ['filter', 'multi-select', 'pills', 'badge'],
    accentColor: '#06b6d4',
  },
  {
    id: 'filter-pills-grouped',
    name: 'Grouped Filters',
    category: 'filter-pills',
    description: 'Categorized filter sections that expand and collapse.',
    longDescription: 'Filters organized into expandable groups (e.g., Status, Priority, Assignee). Each group shows its own active count. Clicking a group header expands/collapses it with a smooth height animation.',
    prompt: `Build a grouped filter panel. Each group has a header (label + active count badge + chevron). On click, toggle expand/collapse using AnimatePresence with height animation (framer-motion). Inside each group: checkbox-style filter items. Checked items show a filled checkbox with checkmark (animated on toggle). Group headers show count of active items in that group as a small badge. A "Reset all" at the top resets everything and animates badges to 0.`,
    tags: ['filter', 'groups', 'accordion', 'checkbox'],
    accentColor: '#06b6d4',
  },

  // SORT
  {
    id: 'sort-dropdown',
    name: 'Sort Dropdown',
    category: 'sort',
    description: 'Animated dropdown sort selector with active indicator.',
    longDescription: 'A sort button that opens a dropdown with sort options. The active sort option has an animated checkmark. The button label updates to show the current sort with a smooth text transition.',
    prompt: `Create a sort dropdown button. Button shows current sort label + a sort icon + chevron. On click, open a dropdown (AnimatePresence, scale 0.95→1 + fade, transform-origin: top). Options list: each row has label and an optional ascending/descending indicator. Active option shows an animated checkmark (scale in). On selection, close dropdown and update button label with a crossfade text transition (AnimatePresence with mode="wait"). Include: Newest, Oldest, Alphabetical, Most Popular, Price (Low→High), Price (High→Low).`,
    tags: ['sort', 'dropdown', 'select', 'animated'],
    accentColor: '#10b981',
  },
  {
    id: 'sort-toggle',
    name: 'Sort Toggle Bar',
    category: 'sort',
    description: 'Inline sort buttons with animated sliding active indicator.',
    longDescription: 'A compact toggle bar with sort options. A sliding pill indicator moves between options on selection. Direction arrow animates to show ascending/descending.',
    prompt: `Build an inline sort toggle bar. Render sort options as a row of buttons inside a container with a rounded-full background. The active option has a white/accent pill background that slides between options using a shared layoutId (framer-motion layout animation). Clicking the active option toggles asc/desc — animate an arrow icon rotating 180deg on direction change. The sliding pill should feel smooth and springy (spring stiffness: 300, damping: 25).`,
    tags: ['sort', 'toggle', 'sliding', 'direction'],
    accentColor: '#10b981',
  },

  // STAT CARDS
  {
    id: 'stat-counter',
    name: 'Animated Stat Card',
    category: 'stat-card',
    description: 'Metric card with number that counts up on scroll into view.',
    longDescription: 'A dashboard stat card. The number animates from 0 to its value when it enters the viewport. Includes a trend indicator (up/down arrow + percentage) with color coding.',
    prompt: `Create an animated stat card. Use IntersectionObserver to trigger when in view. Animate the number from 0 to target value over 1.5s using an easing function (ease-out cubic). Show: label, large number, trend badge (e.g. "+12.5% vs last month" in green for positive, red for negative with arrow icon). The trend badge should slide in 300ms after the number starts counting. Card has a subtle top border in the metric's accent color. Add a small sparkline (5-7 data points as an SVG path) in the bottom right.`,
    tags: ['stats', 'counter', 'dashboard', 'metric'],
    accentColor: '#f59e0b',
  },
  {
    id: 'stat-grid',
    name: 'Stat Grid',
    category: 'stat-card',
    description: 'Grid of 4 stat cards that stagger-animate on mount.',
    longDescription: 'Four stat cards in a 2x2 grid. Each card stagger-animates on mount with a slide-up + fade. Numbers count up in sequence. Hovering a card lifts it slightly.',
    prompt: `Build a 2x2 stat card grid. Each card has: icon (top left), label, large number, trend badge. Cards animate in with staggered slide-up (staggerChildren: 0.1, each child: y 20→0, opacity 0→1). Numbers count up when cards enter view — stagger the count start by 150ms per card. On hover, each card lifts (translateY -4px, deeper shadow) with spring physics. Use consistent sizing and alignment across all 4 cards.`,
    tags: ['stats', 'grid', 'stagger', 'dashboard'],
    accentColor: '#f59e0b',
  },

  // TOAST
  {
    id: 'toast-stack',
    name: 'Toast Stack',
    category: 'toast',
    description: 'Stacking toasts that slide in from the corner with auto-dismiss.',
    longDescription: 'A toast notification system. Toasts stack in the bottom-right, slide in with a spring animation, and auto-dismiss after 4s with a countdown progress bar. Supports success, error, warning, info variants.',
    prompt: `Build a toast notification system. Position: fixed bottom-right, stacked vertically. Each toast: icon (variant-specific), title, optional description, close button, progress bar that depletes over 4s. Entry: slide in from the right (x: 100%→0) + fade, spring physics. Exit: slide right + fade, AnimatePresence. Stacking: new toasts push up existing ones (layout animation). Variants: success (green), error (red), warning (amber), info (blue). Pause progress on hover. Max 5 toasts visible, oldest auto-removed.`,
    tags: ['toast', 'notification', 'stack', 'alert'],
    accentColor: '#ec4899',
  },
  {
    id: 'toast-banner',
    name: 'Alert Banner',
    category: 'toast',
    description: 'Full-width dismissible alert banner with animated entry.',
    longDescription: 'A top-of-page alert banner that slides down on mount. Has a dismiss button and can include an action link. Supports multiple severity levels.',
    prompt: `Create a dismissible alert banner. Position: fixed top-0, full width, z-index 100. Entry: animate from height 0 + opacity 0 to full height over 300ms. Inside: icon, message text, optional "Take action" link, dismiss X button. On dismiss: animate back to height 0 (AnimatePresence). Variants: info (blue), success (green), warning (amber), error (red). Each variant has a left border accent, icon, and background tint. The banner pushes page content down — update a CSS variable or padding-top on body to account for banner height.`,
    tags: ['banner', 'alert', 'dismiss', 'full-width'],
    accentColor: '#ec4899',
  },

  // SKELETON
  {
    id: 'skeleton-card',
    name: 'Card Skeleton',
    category: 'skeleton',
    description: 'Shimmer skeleton that matches a card layout exactly.',
    longDescription: 'A loading skeleton that precisely mirrors a content card — image placeholder, title line, subtitle lines, action area. The shimmer animation sweeps left-to-right.',
    prompt: `Build a card loading skeleton. Match the layout of a content card: top image area (aspect-ratio 16/9, full width), then padding area with: one wide line (title, 70% width), two narrower lines (description, 90% and 60% width), a bottom row with a small circle (avatar) + two short lines. All shapes: rounded-md, bg: #1a1a1a. Animate a shimmer: a white gradient (linear-gradient, 90deg, transparent, rgba(255,255,255,0.06), transparent) that moves left to right over 1.5s, repeat Infinity. Use CSS background-position animation or a moving div overlay.`,
    tags: ['loading', 'skeleton', 'shimmer', 'placeholder'],
    accentColor: '#64748b',
  },
  {
    id: 'skeleton-list',
    name: 'List Skeleton',
    category: 'skeleton',
    description: 'Shimmer skeleton for a list/table with staggered rows.',
    longDescription: 'A loading skeleton for list or table views. Rows stagger their shimmer animation so they appear to load in sequence — giving a sense of progress.',
    prompt: `Create a list skeleton with 5 rows. Each row: a circle avatar (40px) on the left, then 2 lines (title: 40% width, subtitle: 25% width), then a short pill on the right (status badge placeholder). Rows animate their shimmer with staggered animation-delay (0, 150, 300, 450, 600ms) so the shimmer cascades top-to-bottom. This gives the impression of content arriving row by row. Style matches a dark list/table. Add a header skeleton row above (taller, 2 short pills).`,
    tags: ['loading', 'skeleton', 'list', 'table'],
    accentColor: '#64748b',
  },

  // TABS
  {
    id: 'tabs-sliding',
    name: 'Sliding Tab Switcher',
    category: 'tabs',
    description: 'Tabs with a smoothly sliding active pill indicator.',
    longDescription: 'A tab bar where the active indicator is a background pill that slides between tabs using framer-motion layoutId. Tab content transitions with a fade + slight horizontal slide.',
    prompt: `Build a tab switcher with a sliding indicator. Container: a rounded-full or rounded-xl pill background (dark). Each tab: a button with label (and optional icon). The active tab has a white or accent background pill that slides between tabs using framer-motion layoutId="tab-indicator" with spring transition (stiffness: 300, damping: 28). Tab content below: use AnimatePresence with mode="wait" — exit: x: -10, opacity: 0; enter: x: 10→0, opacity: 0→1; duration: 180ms. Include 4 tabs: Overview, Analytics, Reports, Settings.`,
    tags: ['tabs', 'navigation', 'sliding', 'content'],
    accentColor: '#0ea5e9',
  },
  {
    id: 'tabs-underline',
    name: 'Underline Tabs',
    category: 'tabs',
    description: 'Minimal underline-style tabs with animated line indicator.',
    longDescription: 'Classic underline tabs with a smooth animated line that slides between active tabs. Clean, minimal style suitable for content-heavy pages.',
    prompt: `Create underline-style tabs. Each tab: a text button, no background. Active tab: text color white (vs muted for inactive). The active indicator: a 2px bottom border that slides between tabs using framer-motion layoutId="underline" with spring (stiffness: 350, damping: 30). The line should match the width of the active tab label exactly. On tab change, the line slides smoothly. Hovering inactive tabs shows a subtle underline (opacity 0.3). Content transitions with crossfade (opacity only, 150ms).`,
    tags: ['tabs', 'minimal', 'underline', 'indicator'],
    accentColor: '#0ea5e9',
  },

  // TAG INPUT
  {
    id: 'tag-input-default',
    name: 'Animated Tag Input',
    category: 'tag-input',
    description: 'Input that creates animated tags on Enter or comma.',
    longDescription: 'A tag input field. Type and press Enter or comma to create a tag. Tags animate in with a scale + fade. Click the × on a tag to remove it with an exit animation. Supports backspace to remove the last tag.',
    prompt: `Build an animated tag input. Render existing tags + a text input inline in a flex-wrap container styled as an input. On Enter or comma press: create a new tag, clear the input. Tag entry animation: scale 0→1 + opacity 0→1, spring (stiffness: 400, damping: 20). Tag removal: click × icon, exit animation scale 1→0 + opacity 1→0 (AnimatePresence). Backspace on empty input removes the last tag. Max 10 tags. Duplicate detection: shake animation (x: [0,-5,5,-3,3,0], 300ms) if duplicate entered. Each tag: label + × button, accent bg, rounded-full.`,
    tags: ['input', 'tags', 'chips', 'animated'],
    accentColor: '#84cc16',
  },
  {
    id: 'tag-input-suggestions',
    name: 'Tag Input with Suggestions',
    category: 'tag-input',
    description: 'Tag input with a live suggestion dropdown.',
    longDescription: 'A tag input that shows a dropdown of matching suggestions as you type. Click or keyboard-select a suggestion to add it as a tag. Already-added tags are grayed out in the list.',
    prompt: `Extend the animated tag input with a suggestions dropdown. As the user types, show a dropdown of matching suggestions (fuzzy match). Already-added tags appear in the list but are grayed out and non-selectable. Dropdown entry: AnimatePresence, slide down + fade. Keyboard: Up/Down to navigate suggestions, Enter to select, Escape to close dropdown. Each suggestion row: colored dot (tag color) + label. Selecting adds the tag and clears the input. Clicking outside closes the dropdown. Suggestions list: max 5 items, scrollable.`,
    tags: ['input', 'tags', 'suggestions', 'autocomplete'],
    accentColor: '#84cc16',
  },

  // PRICING TOGGLE
  {
    id: 'pricing-toggle-default',
    name: 'Pricing Toggle',
    category: 'pricing-toggle',
    description: 'Monthly/annual billing toggle with animated price crossfade.',
    longDescription: 'A billing period toggle. Switching between monthly and annual animates the prices with a crossfade + slide. The annual option shows a savings badge that bounces in.',
    prompt: `Build a pricing period toggle. Toggle: a pill switch (Monthly / Annually) with a sliding indicator (layoutId). When switching to Annual: prices animate with AnimatePresence mode="wait" — old price exits (y: -10, opacity 0), new price enters (y: 10→0, opacity 0→1) over 200ms. A "Save 20%" badge appears next to Annual with a scale bounce animation (scale: 0→1.1→1). Update 3 pricing cards simultaneously. The toggle switch itself uses a spring-animated thumb that slides left/right.`,
    tags: ['pricing', 'toggle', 'billing', 'animation'],
    accentColor: '#f97316',
  },
  {
    id: 'pricing-toggle-cards',
    name: 'Pricing Cards',
    category: 'pricing-toggle',
    description: 'Full pricing card set with toggle, features list, and CTA.',
    longDescription: 'Three pricing tiers with a billing toggle. The popular plan has a highlighted border and badge. Feature lists animate in on mount. CTA buttons have hover interactions.',
    prompt: `Create a complete pricing section with 3 cards (Free, Pro, Enterprise) and a monthly/annual toggle. Each card: plan name, price (animated on toggle switch), feature list with checkmarks, CTA button. The "Pro" card: slightly larger, accent border glow, "Most Popular" badge at top. Features list items stagger-animate on mount (0.05s delay each, slide-up + fade). The CTA on Pro: use the LiquidButton fill effect on hover. Price change on toggle: AnimatePresence crossfade, 250ms. Add a subtle gradient background to the popular card.`,
    tags: ['pricing', 'cards', 'features', 'CTA'],
    accentColor: '#f97316',
  },
]

export function getBlocksByCategory(category: BlockCategory): UIBlock[] {
  return blocks.filter((b) => b.category === category)
}

export function getBlockById(id: string): UIBlock | undefined {
  return blocks.find((b) => b.id === id)
}

export function getBlockCategoryMeta(id: BlockCategory): BlockCategoryMeta | undefined {
  return blockCategories.find((c) => c.id === id)
}
