# vCoreUI

**vCoreUI** is a Working Project aiming for a Modern, Professional and Flexible CSS design system for web interfaces.  
It includes design tokens, base styles, and reusable components all designed to make web development easy to maintain and keep consistent between projects, pages and elements.

**Designed to Be Used in My own projects for efficientcy and constancy, but can be used how ever you would like**
**any Ideas/Improvements are welcomed, this is a work in progress**

## Features

- **Design Tokens** for Colours, Typography, and Shadows
- **Theme-ready Buttons and Sliders** (dark & light)
- **Cursor Effects** Smooth Particle Cursor Effect
- **Liquid Glass Effect** Reusable Component
- Easy to extend and customize

## Getting Started

1. **Clone the repository**

    ```sh
    git clone https://github.com/vCore420/vCoreUI.git
    ```

2. **Include the CSS in your project**

    ```html
    <link rel="stylesheet" href="css/tokens.css">
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/components.css">
    ```

3. **Try the demo:**  
    Open `demo.html` in your browser to see the system in action.

## Folder Structure

vCoreUI/
├── css/
│ ├── tokens.css
│ ├── base.css
│ ├── components.css
│ ├── demo.css
├── js/
│ ├── themes.js
│ ├── cursorEffect.js
│ ├── demo.js
├── assets/
│ └── branding/
├── demo.html
├── README.md

## Usage

Apply classes like `.liquid-glass`, `.button-dark`, `.button-light`, and `.main-switch` to your HTML elements.

```html
<code>class="main-switch"</code></p>
<div class="main-switch">
<label class="switch">
 <input type="checkbox" id="themeToggle" />
 <span class="slider"></span>
</label>
<span id="themeLabel">Dark Mode</span>
</div>
```

Apply Cursor effect for all pages with `window.vcoreCursorFlow = new vCoreCursorFlow();` or add in a toggle `const toggle = document.getElementById('cursorEffectToggle');`.

```js
toggle.addEventListener('change', function() {
  if (this.checked) {
    window.vcoreCursorFlow = new vCoreCursorFlow();
    status.textContent = "On";
```  

## Glass Effect Filter - Thanks to archisvaze for the Liquid Glass Effect

```html
<div class="liquid-glass">
    <!-- Content here -->
</div>
<button class="button-dark">Dark Button</button>
<button class="button-light">Light Button</button>
```

To enable the full glass distortion effect, include the following SVG filter at the end of your HTML file:

```html
<svg width="0" height="0" style="position:absolute; overflow:hidden">
  <defs>
    <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%">
      <feTurbulence id="glass-turbulence" type="fractalNoise" baseFrequency="0.024 0.024" numOctaves="56" seed="95" result="noise" />
      <feGaussianBlur in="noise" stdDeviation="7" result="blurred" />
      <feDisplacementMap in="SourceGraphic" in2="blurred" scale="40" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </defs>
</svg>
```

License
MIT

Designed by vCore420