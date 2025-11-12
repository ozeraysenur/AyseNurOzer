# Seesaw Simulation

## Overview

This project is an interactive seesaw simulation built with HTML, CSS, and vanilla JavaScript.  
It visually demonstrates how torque and mass distribution affect balance in a simple physical system.

Users can drop colorful balls with different weights, and the seesaw reacts in real time by tilting smoothly while updating all torque, mass, and angle values on screen.

---

## Thought Process

From the beginning, my goal was not just to make something that works, but to make it feel real.  
I wanted every drop and every motion to reflect the logic behind physics and to achieve that without any external library.

My process was iterative:

1. Mathematical foundation first — I started with torque formulas and balance logic.  
2. DOM manipulation second — I focused on dynamically creating and positioning balls using JavaScript.  
3. User feedback last — I added animations, sound, and a live data panel to make it more engaging.

Each layer depended on the previous one. The biggest challenge was keeping them all in sync.

---

## Design Decisions

| Area | Decision | Reason |
|------|-----------|--------|
| Event-driven architecture | Managed all actions via DOM events | Keeps the UI reactive and easy to debug |
| Preview system | Shows where and how big the next ball will be | Provides visual feedback before committing a drop |
| Helper functions | Extracted repetitive logic into small functions (getOffsetFromCenter, clamp, etc.) | Simplified event handlers and made debugging faster |
| LocalStorage | Saves every drop and torque update | Ensures persistence between sessions |
| CSS transitions | Used for tilt and drop-in effects | Easier to tune visually than a physics-based engine |

---

## Technical Breakdown

**Torque Calculation:**  
Each ball’s torque = weight × distance from center.  
The seesaw’s tilt is proportional to the difference between left and right torque.

**Angle Clamping:**  
Rotation is limited to ±30° to maintain a natural motion.

**State Persistence:**  
Every update saves data like weights, torque, and tilt into localStorage, restoring it automatically on reload.

**Sound Feedback:**  
A short drop sound plays when the ball animation finishes.

---

## Challenges and Lessons Learned

### 1. DOM Manipulation Fatigue
Managing every element dynamically was more difficult than expected.  
I had to frequently select and update DOM elements while keeping event listeners concise.  
I solved this by writing helper functions that handled recurring logic, which made the main flow cleaner and more modular.

### 2. Torque Physics vs Animation Reality
The math made sense on paper, but turning it into a real animation revealed new issues.  
The balls and the plank had to stay visually in sync.  
At first, the balls were floating above or below the plank because of how CSS transforms stacked.  
I fixed this through repeated adjustments to transform origins and translate offsets.

### 3. Clickable Area Alignment
Initially, the preview and actual click position did not match.  
Even though the torque math was correct, the visual coordinate space was offset.  
Using the plank’s bounding box with `getBoundingClientRect()` fixed the issue by making all positions relative to the center.

### 4. Balancing Logic with Aesthetics
A perfect physics formula sometimes looks unnatural on screen.  
I learned to balance logic and aesthetics, softening transitions and clamping small angles for smoother visuals.

---

## Trade-offs

- No inertia or damping physics (kept simple for readability)  
- Fixed ball drop animation duration  
- No drag-and-drop repositioning  
- Simplified physics for consistent visual experience  

These were conscious decisions to keep the project clean, interactive, and easy to explain in a review.

---

## AI Usage Disclosure

I used ChatGPT as a helper for syntax and debugging only.  
It assisted with clarifying DOM behaviors, improving readability, and optimizing structure.  

All logic, design, and reasoning were created and understood by me.  
Every part of the code reflects my own implementation and learning process.

---

## Reflection

This project helped me think like both a developer and a designer.  
I had to translate physics into motion, and I realized how even a small movement can tell a story of logic, balance, and cause-and-effect.  

I did not just build a seesaw; I learned how to balance precision, creativity, and patience.

---

## How to Run

1. Download or clone the project  
2. Open `index.html` in a browser  
3. Click anywhere on the plank to drop weights  
4. Observe the balance and torque updates  
5. Refresh — the state will remain thanks to localStorage
