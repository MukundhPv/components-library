export type Category =
  | 'magnetic'
  | 'elastic'
  | 'particle'
  | 'spotlight'
  | 'tilt'
  | 'scramble'
  | 'glitch'
  | 'breathing'
  | 'ripple'
  | 'liquid'

export interface MicroInteraction {
  id: string
  name: string
  category: Category
  description: string
  longDescription: string
  prompt: string
  tags: string[]
  component: string
  accentColor: string
}

export interface CategoryMeta {
  id: Category
  label: string
  description: string
  color: string
  count: number
}

export const categories: CategoryMeta[] = [
  {
    id: 'magnetic',
    label: 'Magnetic',
    description: 'Elements physically attracted to the cursor using spring physics.',
    color: '#a855f7',
    count: 3,
  },
  {
    id: 'elastic',
    label: 'Elastic',
    description: 'Spring-based bounce and stretch animations on interaction.',
    color: '#6366f1',
    count: 3,
  },
  {
    id: 'particle',
    label: 'Particle Burst',
    description: 'Explosive particle effects that emit on user interaction.',
    color: '#f59e0b',
    count: 3,
  },
  {
    id: 'spotlight',
    label: 'Spotlight',
    description: 'Cursor-tracked light that illuminates dark surfaces.',
    color: '#06b6d4',
    count: 3,
  },
  {
    id: 'tilt',
    label: '3D Tilt',
    description: 'Mouse-tracked 3D perspective transforms with inner glow.',
    color: '#10b981',
    count: 3,
  },
  {
    id: 'scramble',
    label: 'Text Scramble',
    description: 'Matrix-style character scramble that resolves to real text.',
    color: '#84cc16',
    count: 3,
  },
  {
    id: 'glitch',
    label: 'Glitch',
    description: 'Digital corruption and signal distortion on hover.',
    color: '#ef4444',
    count: 3,
  },
  {
    id: 'breathing',
    label: 'Breathing',
    description: 'Organic ambient pulse that makes elements feel alive.',
    color: '#ec4899',
    count: 3,
  },
  {
    id: 'ripple',
    label: 'Ripple',
    description: 'Click-triggered wave propagation across the element.',
    color: '#0ea5e9',
    count: 3,
  },
  {
    id: 'liquid',
    label: 'Liquid Fill',
    description: 'Organic blob fill that rises on hover interaction.',
    color: '#f97316',
    count: 3,
  },
]

export const interactions: MicroInteraction[] = [
  // MAGNETIC
  {
    id: 'magnetic-button',
    name: 'Magnetic Button',
    category: 'magnetic',
    description: 'Button that physically drifts toward the cursor on proximity.',
    longDescription: 'When the cursor enters within 120px of the button, it smoothly drifts toward the cursor using spring physics. The displacement is proportional to cursor distance. Snaps back on mouse leave.',
    prompt: `Add a magnetic hover effect to this button. When the mouse cursor enters within 120px of the button's center, the button should smoothly drift toward the cursor position using spring physics (framer-motion useSpring, stiffness: 150, damping: 15). The movement should be proportional to cursor proximity — maximum displacement of 20px on each axis. The button snaps back smoothly when the cursor exits the proximity zone. Track mouse position using a ref on the wrapper element and calculate relative offset from the button center.`,
    tags: ['button', 'physics', 'cursor', 'hover'],
    component: 'MagneticButton',
    accentColor: '#a855f7',
  },
  {
    id: 'magnetic-icon',
    name: 'Magnetic Icon',
    category: 'magnetic',
    description: 'Icon that orbits and locks onto cursor proximity.',
    longDescription: 'An icon element with magnetic pull toward the cursor. When nearby, the icon tilts and moves toward the cursor. Creates a tactile, alive feel for navigation icons.',
    prompt: `Apply a magnetic cursor effect to this icon element. Use framer-motion's useMotionValue and useSpring (stiffness: 200, damping: 20) to track cursor X/Y relative to the icon center. When cursor is within 80px, pull the icon up to 15px toward the cursor and add a subtle 10deg rotation in the direction of movement. Add a soft purple glow on proximity. Reset all transforms smoothly on mouse leave.`,
    tags: ['icon', 'physics', 'cursor', 'navigation'],
    component: 'MagneticIcon',
    accentColor: '#a855f7',
  },
  {
    id: 'magnetic-card',
    name: 'Magnetic Card',
    category: 'magnetic',
    description: 'Card that subtly gravitates toward the cursor on approach.',
    longDescription: 'A card component with a wide magnetic field. As the cursor approaches, the card gently shifts its position — creating the impression of awareness and responsiveness.',
    prompt: `Add a wide-field magnetic effect to this card. Detect cursor proximity within 200px of the card. Use useSpring (stiffness: 80, damping: 20) to gently shift the card up to 8px toward the cursor. Add a subtle border glow that intensifies as the cursor gets closer — opacity proportional to (1 - distance/200). The card should feel like it's aware of the user's presence.`,
    tags: ['card', 'physics', 'ambient', 'hover'],
    component: 'MagneticCard',
    accentColor: '#a855f7',
  },

  // ELASTIC
  {
    id: 'elastic-button',
    name: 'Elastic Button',
    category: 'elastic',
    description: 'Button with tactile spring compression and bounce on click.',
    longDescription: 'On hover, the button scales up with spring physics. On click, it compresses then bounces back — like pressing a physical button.',
    prompt: `Add spring-physics animation to this button. Use framer-motion's whileHover={{ scale: 1.06 }} with spring transition (stiffness: 400, damping: 17). On whileTap, compress to scale 0.94. Add a subtle box-shadow that deepens on hover using transition. The interaction should feel physical — like pushing a button on a device.`,
    tags: ['button', 'spring', 'click', 'tactile'],
    component: 'ElasticButton',
    accentColor: '#6366f1',
  },
  {
    id: 'elastic-card',
    name: 'Elastic Card',
    category: 'elastic',
    description: 'Card that bounces and lifts on hover with spring physics.',
    longDescription: 'Hovering lifts the card with a spring bounce and casts a deeper shadow. Creates a physical depth illusion — like picking something up off a table.',
    prompt: `Add an elastic lift animation to this card. On hover, animate: translateY(-8px) with scale(1.02) using spring physics (stiffness: 300, damping: 20). Simultaneously transition the box-shadow to a deeper, larger shadow. On tap/click, flatten briefly (scale: 0.99, translateY(0)) then spring back. Use framer-motion motion.div with whileHover and whileTap.`,
    tags: ['card', 'spring', 'hover', 'lift'],
    component: 'ElasticCard',
    accentColor: '#6366f1',
  },
  {
    id: 'elastic-toggle',
    name: 'Elastic Toggle',
    category: 'elastic',
    description: 'Toggle switch with satisfying spring overshoot.',
    longDescription: 'A toggle that snaps with a spring overshoot — overshooting its endpoint then settling. Makes state changes feel physical and satisfying.',
    prompt: `Build a toggle switch where the thumb animates with spring physics (stiffness: 500, damping: 25) causing a visible overshoot past the end position before settling. Add a subtle scale pulse on the thumb when toggled. The track background color should crossfade. On toggle, briefly scale the whole component to 0.95 then back. Use framer-motion AnimatePresence for state transitions.`,
    tags: ['toggle', 'switch', 'spring', 'overshoot'],
    component: 'ElasticToggle',
    accentColor: '#6366f1',
  },

  // PARTICLE
  {
    id: 'particle-button',
    name: 'Particle Button',
    category: 'particle',
    description: 'Button that explodes with particles on every click.',
    longDescription: 'On click, 12 particles burst from the click point in random directions, fade out, and disappear — like a tiny firework celebrating each interaction.',
    prompt: `Add a particle burst on click to this button. On each click, capture click coordinates within the button. Create 12 div elements positioned at the click point, each animated with framer-motion to travel in a random direction (0–360deg, distance 40–80px), fade from opacity 1 to 0, and complete in 600ms. Particle size: 5px circles. Color: accent purple (#a855f7). Clean up DOM elements after animation. Multiple burst instances should coexist.`,
    tags: ['button', 'particles', 'click', 'celebration'],
    component: 'ParticleBurst',
    accentColor: '#f59e0b',
  },
  {
    id: 'particle-confetti',
    name: 'Confetti Burst',
    category: 'particle',
    description: 'Multi-color confetti explosion for success moments.',
    longDescription: 'On trigger, a colorful confetti burst radiates from the element. Perfect for success states, completion, and celebration moments in apps.',
    prompt: `Create a confetti burst component triggered on click or a "success" prop. Emit 20 particles with random shapes (circles, squares, lines at random rotation). Use a palette of 5 colors: #a855f7, #6366f1, #f59e0b, #10b981, #ef4444. Each particle travels 60–120px in a random direction, rotates randomly, and fades out over 800ms with a slight gravity effect (add increasing translateY to simulate falling). Use canvas or absolutely-positioned elements.`,
    tags: ['success', 'particles', 'celebration', 'color'],
    component: 'ConfettiBurst',
    accentColor: '#f59e0b',
  },
  {
    id: 'particle-trail',
    name: 'Cursor Trail',
    category: 'particle',
    description: 'Sparkle particles trail behind the cursor on move.',
    longDescription: 'Small particles spawn at the cursor position as it moves, creating a magical trailing effect. Each particle fades and disperses naturally.',
    prompt: `Add a cursor particle trail to this container element. On mousemove, create a small particle (4px, rounded) at the cursor position every 30ms. Each particle: spawns at cursor position, randomly drifts 5–15px in a random direction, fades from opacity 0.8 to 0, shrinks from 4px to 0, completes in 500ms. Particle color cycles through: #a855f7, #6366f1, #06b6d4. Limit to 20 active particles at once. Use absolute positioning within a relative container.`,
    tags: ['cursor', 'trail', 'particles', 'ambient'],
    component: 'CursorTrail',
    accentColor: '#f59e0b',
  },

  // SPOTLIGHT
  {
    id: 'spotlight-card',
    name: 'Spotlight Card',
    category: 'spotlight',
    description: 'Dark card illuminated by a cursor-tracked light source.',
    longDescription: 'As the cursor moves across the card, a radial light gradient follows it — like a flashlight revealing content in the dark. Intensely dramatic.',
    prompt: `Add a spotlight cursor effect to this card. On mousemove within the card, update a CSS custom property --mouse-x and --mouse-y (as percentages). Apply a radial-gradient background overlay centered at those coordinates: radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.08), transparent 70%). Layer this over the dark card background. The card should appear almost completely dark until the cursor illuminates it. On mouse leave, fade the spotlight out over 300ms.`,
    tags: ['card', 'cursor', 'light', 'dramatic'],
    component: 'SpotlightCard',
    accentColor: '#06b6d4',
  },
  {
    id: 'spotlight-grid',
    name: 'Spotlight Grid',
    category: 'spotlight',
    description: 'Grid of dark cards where only the hovered card lights up.',
    longDescription: 'A grid layout where each card has its own spotlight that activates on hover. Moving between cards creates a flowing light effect across the grid.',
    prompt: `Create a grid of cards where each card has a spotlight effect. On mouseenter each card, trigger a spotlight radial gradient that follows cursor movement within that card only. On mouseleave, smoothly fade the spotlight to zero over 400ms. The spotlight color should be a soft version of the card's accent color. Cards should have a subtle border that glows matching the spotlight when active.`,
    tags: ['grid', 'hover', 'ambient', 'cursor'],
    component: 'SpotlightGrid',
    accentColor: '#06b6d4',
  },
  {
    id: 'spotlight-text',
    name: 'Spotlight Text',
    category: 'spotlight',
    description: 'Text revealed by cursor movement over a dark surface.',
    longDescription: 'Text starts nearly invisible. As the cursor passes over, a spotlight reveals the content — creating an interactive reading experience.',
    prompt: `Create a spotlight text reveal effect. Render the text twice: once as a base layer (very dark, ~10% opacity) and once as a bright layer clipped to a circle that follows the cursor. The circle clip-path is centered at cursor position with a 150px radius, and reveals the bright text underneath. Moving the cursor reveals different parts of the text. Animate the clip-path smoothly with CSS transition: 50ms. The metaphor: a flashlight revealing words in the dark.`,
    tags: ['text', 'reveal', 'cursor', 'interactive'],
    component: 'SpotlightText',
    accentColor: '#06b6d4',
  },

  // TILT
  {
    id: 'tilt-card',
    name: '3D Tilt Card',
    category: 'tilt',
    description: 'Card with mouse-tracked 3D tilt and inner parallax layers.',
    longDescription: 'The card rotates on X/Y axes tracking the cursor. A glare highlight moves opposite to the tilt, creating a convincing 3D card illusion.',
    prompt: `Add a 3D tilt effect to this card. Wrap in a container with perspective: 1000px. On mousemove, map cursor X position within the card to rotateY (-15deg to 15deg) and cursor Y to rotateX (15deg to -15deg). Use framer-motion's useSpring (stiffness: 200, damping: 30) for smooth tracking. Add a white glare element (radial gradient, 30% opacity) that moves in the opposite direction to amplify the 3D illusion. Add inner content layers at different translateZ depths for parallax. Reset all transforms on mouse leave.`,
    tags: ['card', '3d', 'perspective', 'parallax'],
    component: 'TiltCard',
    accentColor: '#10b981',
  },
  {
    id: 'tilt-image',
    name: 'Tilt Image',
    category: 'tilt',
    description: 'Image with 3D hover tilt and depth layers.',
    longDescription: 'An image container that tilts in 3D on hover, with the image appearing to float above the background due to parallax offset.',
    prompt: `Add a 3D tilt hover effect to this image. Apply perspective: 800px to the container. On hover, track mouse position and apply rotateX (-12 to 12deg) and rotateY (-12 to 12deg). The image inside should have a slight counter-transform (translate opposite direction by 10px) creating parallax depth. Add a soft drop-shadow that shifts direction with the tilt. Use framer-motion with spring physics. The image should feel like it's floating above the card on hover.`,
    tags: ['image', '3d', 'hover', 'parallax'],
    component: 'TiltImage',
    accentColor: '#10b981',
  },
  {
    id: 'tilt-button',
    name: '3D Tilt Button',
    category: 'tilt',
    description: 'Button that tilts in 3D revealing a bottom face on press.',
    longDescription: 'A button with a 3D extruded look. On press, it tilts forward revealing the bottom face — like physically pressing a 3D button.',
    prompt: `Create a 3D extruded button. The button has a visible bottom face (6px height, darker shade of button color) simulated with box-shadow or a pseudo-element. On hover, add slight rotateX(-5deg) with perspective. On click/press, animate rotateX(10deg) and reduce box-shadow to zero (simulating the button pressing down), then spring back. Use framer-motion with perspective on parent. The button should feel physically pressable.`,
    tags: ['button', '3d', 'press', 'physical'],
    component: 'TiltButton',
    accentColor: '#10b981',
  },

  // SCRAMBLE
  {
    id: 'scramble-heading',
    name: 'Scramble Heading',
    category: 'scramble',
    description: 'Heading that scrambles then resolves to the real text on mount.',
    longDescription: 'Characters cycle through random glyphs at high speed, then progressively reveal the correct characters left to right — like a decryption sequence.',
    prompt: `Add a text scramble effect to this heading. On component mount, scramble all characters by rapidly cycling them through a random character set: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*". Every 40ms, pick a random character for each unresolved position. Resolve characters left to right: position 0 reveals at 0ms, position 1 at 80ms, position 2 at 160ms, etc. Total duration proportional to text length. Use useEffect and setInterval. Maintain original text in a ref so it's always available.`,
    tags: ['text', 'heading', 'reveal', 'matrix'],
    component: 'ScrambleHeading',
    accentColor: '#84cc16',
  },
  {
    id: 'scramble-hover',
    name: 'Scramble on Hover',
    category: 'scramble',
    description: 'Text that scrambles and re-resolves whenever hovered.',
    longDescription: 'On each hover, text scrambles then re-resolves. Repeated hover creates satisfying re-scrambles. Great for navigation links and labels.',
    prompt: `Create a text element that scrambles on every hover. On mouseenter, begin the scramble: cycle characters through a random set every 40ms, then resolve each character left-to-right over 600ms total. Use only uppercase and digits for scramble characters to keep it legible. After resolution, stop and idle. On the next mouseenter, repeat from scratch. Preserve the original text in a data attribute. Keep character count fixed — scrambled characters should have the same length as the real text.`,
    tags: ['text', 'hover', 'repeat', 'label'],
    component: 'ScrambleHover',
    accentColor: '#84cc16',
  },
  {
    id: 'scramble-counter',
    name: 'Number Scramble',
    category: 'scramble',
    description: 'Numbers that scramble then animate to their real value.',
    longDescription: 'A number that starts scrambled (random digits cycling) then resolves to its real value when in view. Great for stats and metrics.',
    prompt: `Create a number scramble component. When the element enters the viewport (use IntersectionObserver), begin animating: first 500ms — display random digits at the same length as the final number, changing every 60ms. Then, 500ms to 1500ms — use a counter animation that counts from 0 to the target number (eased). Combine both: early phase is pure scramble, late phase is accurate counting with decreasing scramble noise. Perfect for stat counters, dashboards, metrics.`,
    tags: ['number', 'counter', 'reveal', 'stats'],
    component: 'ScrambleCounter',
    accentColor: '#84cc16',
  },

  // GLITCH
  {
    id: 'glitch-text',
    name: 'Glitch Text',
    category: 'glitch',
    description: 'Text with digital corruption effect on hover.',
    longDescription: 'On hover, the text appears to glitch — with chromatic aberration, random position jitter, and signal noise artifacts creating a digital corruption aesthetic.',
    prompt: `Add a glitch effect to this text on hover. Layer 3 copies of the text with position:absolute. On hover, animate the copies with keyframes: random X offsets (±4px), alternating rgb color channels (copy 1: red tint #ff003c, copy 2: cyan tint #00fff9), rapid irregular timing (CSS animation with steps()). Add a clip-rect animation that cuts horizontal slices across the text. Duration: 500ms, then settle. Use CSS custom properties for offsets, update via JS randomly every 50ms during hover.`,
    tags: ['text', 'hover', 'glitch', 'distortion'],
    component: 'GlitchText',
    accentColor: '#ef4444',
  },
  {
    id: 'glitch-card',
    name: 'Glitch Card',
    category: 'glitch',
    description: 'Card with RGB-split and scan-line glitch on hover.',
    longDescription: 'A card that briefly glitches on hover — RGB channels separate, scan lines appear, content shifts. Creates an intense, cyberpunk aesthetic.',
    prompt: `Add a glitch effect to this card on hover. Apply a filter: hue-rotate animation cycling rapidly (0deg to 360deg in steps) at 100ms interval. Overlay a scan-line effect (repeating-linear-gradient of dark stripes, 2px repeating every 4px, 10% opacity). Add a brief translate-X jitter (±3px) using keyframes with irregular timing. The card content should also apply a text-shadow chromatic split on hover: -3px 0 red, 3px 0 cyan. Total effect duration: 400ms then return to normal. Triggered on mouseenter.`,
    tags: ['card', 'hover', 'cyberpunk', 'rgb'],
    component: 'GlitchCard',
    accentColor: '#ef4444',
  },
  {
    id: 'glitch-image',
    name: 'Glitch Image',
    category: 'glitch',
    description: 'Image with horizontal slice displacement glitch.',
    longDescription: 'The image slices into horizontal bands that independently jitter on hover. Simulates a corrupted video signal or broken display.',
    prompt: `Create an image glitch effect on hover. Divide the image into 8 horizontal slices using clip-path. On hover, animate each slice with independent random translateX values (±15px) using keyframes. Timing should be offset and irregular across slices — use CSS animation-delay per slice. Add a brief opacity flicker and a hue-rotate filter. Duration: 600ms then resettle. Use either multiple positioned background-image clips or canvas to achieve the slice effect. Include a subtle scanline overlay.`,
    tags: ['image', 'hover', 'slice', 'video'],
    component: 'GlitchImage',
    accentColor: '#ef4444',
  },

  // BREATHING
  {
    id: 'breathing-button',
    name: 'Breathing Button',
    category: 'breathing',
    description: 'Button with an organic ambient pulse that makes it feel alive.',
    longDescription: 'When idle, the button gently scales and glows in a slow sine-wave rhythm — like it\'s breathing. Pauses naturally on hover and click.',
    prompt: `Add a breathing idle animation to this button. Use framer-motion's animate prop with: scale oscillating between 1.0 and 1.04 (period: 2.5s, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut'). Sync a box-shadow pulse: from '0 0 0px rgba(168,85,247,0)' to '0 0 20px rgba(168,85,247,0.4)'. Pause the animation on whileHover (scale: 1.06, static glow) and whileTap (scale: 0.96). The button should feel like it's quietly breathing, waiting for interaction.`,
    tags: ['button', 'ambient', 'idle', 'pulse'],
    component: 'BreathingButton',
    accentColor: '#ec4899',
  },
  {
    id: 'breathing-card',
    name: 'Breathing Card',
    category: 'breathing',
    description: 'Card with a slow ambient border glow that pulses.',
    longDescription: 'The card\'s border glow softly pulses — like a slow heartbeat. Creates a calming, alive quality for dashboard widgets and highlight cards.',
    prompt: `Add a slow breathing border glow to this card. Animate the box-shadow between two states using framer-motion: dim state: '0 0 0px rgba(168,85,247,0)', bright state: '0 0 30px rgba(168,85,247,0.3), 0 0 60px rgba(168,85,247,0.1)'. Cycle with period 3s, repeat Infinity, repeatType 'reverse', ease 'easeInOut'. Also subtly pulse the border-color opacity. On hover, pause the animation and show the bright glow state statically. The card should feel like it has a heartbeat.`,
    tags: ['card', 'ambient', 'glow', 'heartbeat'],
    component: 'BreathingCard',
    accentColor: '#ec4899',
  },
  {
    id: 'breathing-avatar',
    name: 'Breathing Avatar',
    category: 'breathing',
    description: 'Avatar with a soft pulsing presence indicator ring.',
    longDescription: 'An avatar with a ring that breathes — indicating active/online presence with an organic feel instead of a static dot.',
    prompt: `Add a breathing presence ring to this avatar. Render a ring element around the avatar that: scales between 1.0 and 1.15, fades between opacity 0.6 and 0.2, all on a 2s cycle (repeat Infinity, repeatType 'reverse'). Also add a second, slightly larger ring on a 2.5s delay for a layered pulse effect. Ring color: #10b981 (online/active). The outer ring should dissipate further than the inner. This creates the effect of active presence radiating outward.`,
    tags: ['avatar', 'presence', 'ring', 'online'],
    component: 'BreathingAvatar',
    accentColor: '#ec4899',
  },

  // RIPPLE
  {
    id: 'ripple-button',
    name: 'Ripple Button',
    category: 'ripple',
    description: 'Click creates an expanding wave from the exact click point.',
    longDescription: 'Each click spawns a circular wave that expands and fades from the precise click coordinates — the classic Material Design ripple, elevated.',
    prompt: `Add a click ripple effect to this button. On click, capture the click event coordinates relative to the button. Create a div element centered at those coordinates with: width/height 10px, border-radius 50%, background rgba(255,255,255,0.35). Animate with framer-motion: scale 0 to 6, opacity 0.4 to 0, over 600ms with ease 'easeOut'. Multiple ripples can coexist from rapid clicks. Use overflow:hidden on the button container to clip ripples. Remove elements from DOM after animation completes using onAnimationComplete.`,
    tags: ['button', 'click', 'wave', 'material'],
    component: 'RippleButton',
    accentColor: '#0ea5e9',
  },
  {
    id: 'ripple-card',
    name: 'Ripple Surface',
    category: 'ripple',
    description: 'Click on any point of the card creates a ripple from there.',
    longDescription: 'An interactive surface where every click creates a visible wave from that exact point. Like touching water — each touch creates rings.',
    prompt: `Create a ripple surface effect on this card or large element. On each click anywhere on the element, spawn a ripple centered at the click coordinates (relative to element). Each ripple: circle expanding from 0 to full element width over 1000ms, border: 1px solid rgba(168,85,247,0.5), background transparent, opacity 1 to 0. Multiple concurrent ripples supported. Use position:absolute within overflow:hidden container. Ripples should be subtle and elegant, not distracting — thin rings, not filled circles.`,
    tags: ['card', 'surface', 'click', 'wave'],
    component: 'RippleSurface',
    accentColor: '#0ea5e9',
  },
  {
    id: 'ripple-input',
    name: 'Focus Ripple Input',
    category: 'ripple',
    description: 'Input field that ripples outward when focused.',
    longDescription: 'On focus, a ripple emanates from the bottom border of the input — drawing attention to the active field in a visually elegant way.',
    prompt: `Add a focus ripple to this input. On focus, animate a ring element (positioned at the bottom edge of the input) that expands from 0 to 100% width and fades out over 400ms — like a ripple along the bottom border. Also animate the bottom-border color from gray to accent (#a855f7). Use framer-motion AnimatePresence to mount/unmount the ripple element on focus/blur. The effect should draw the eye to the focused field without being distracting.`,
    tags: ['input', 'focus', 'form', 'border'],
    component: 'RippleInput',
    accentColor: '#0ea5e9',
  },

  // LIQUID
  {
    id: 'liquid-button',
    name: 'Liquid Fill Button',
    category: 'liquid',
    description: 'Hover causes liquid to rise and fill the button from below.',
    longDescription: 'A blob of liquid rises from the bottom of the button on hover, filling it with an organic, wavy edge — far more interesting than a simple background transition.',
    prompt: `Create a liquid fill hover effect for this button. Use an SVG positioned absolutely inside the button (overflow:hidden). On hover, animate an SVG path from below the button (outside viewport) rising to fill it completely. The top edge of the rising liquid should be a gentle wave: use a cubic bezier path that oscillates slightly. Animate the wave path continuously while filling. Fill color: accent purple. Text should remain visible above the fill using mix-blend-mode or z-index. Total fill duration: 400ms. Drain on mouse leave (reverse).`,
    tags: ['button', 'hover', 'liquid', 'fill'],
    component: 'LiquidButton',
    accentColor: '#f97316',
  },
  {
    id: 'liquid-progress',
    name: 'Liquid Progress',
    category: 'liquid',
    description: 'Progress bar with a sloshing liquid fill effect.',
    longDescription: 'A progress bar where the fill has a sloshing, liquid quality — the surface waves slightly as it fills, and ripples when it reaches the end.',
    prompt: `Create a liquid progress bar. The fill uses an SVG with a wavy top edge that sloshed side to side continuously. The wave is a sine curve: amplitude 3px, frequency dependent on bar width. Animate the wave phase continuously using requestAnimationFrame. The fill percentage animates the progress normally. At 100%, trigger a completion ripple: the wave amplitude spikes then settles. Use a semi-transparent version of the wave for depth. Container has rounded corners and overflow:hidden to clip the SVG.`,
    tags: ['progress', 'loading', 'liquid', 'wave'],
    component: 'LiquidProgress',
    accentColor: '#f97316',
  },
  {
    id: 'liquid-blob',
    name: 'Blob Cursor',
    category: 'liquid',
    description: 'Cursor-following liquid blob that reacts to interactive elements.',
    longDescription: 'A soft blob follows the cursor around the page. When hovering interactive elements, the blob morphs — growing, squishing, and changing color.',
    prompt: `Create a cursor-following liquid blob. Render a 24px circle that follows the cursor with a spring lag (framer-motion useSpring, stiffness: 400, damping: 40) — giving it a liquid inertia feel. The blob uses border-radius: 50% normally. On hovering a button or link, animate: scale to 2.5, opacity to 0.2, border-radius: 40% (slightly non-circular). On hovering text, scale to 1.5 and apply mix-blend-mode: difference. On click, briefly squish: scale(1.5, 0.7) then spring back. Use pointer-events:none so it doesn't block interaction.`,
    tags: ['cursor', 'blob', 'liquid', 'ambient'],
    component: 'LiquidBlob',
    accentColor: '#f97316',
  },
]

export function getInteractionsByCategory(category: Category): MicroInteraction[] {
  return interactions.filter((i) => i.category === category)
}

export function getInteractionById(id: string): MicroInteraction | undefined {
  return interactions.find((i) => i.id === id)
}

export function getCategoryMeta(id: Category): CategoryMeta | undefined {
  return categories.find((c) => c.id === id)
}
