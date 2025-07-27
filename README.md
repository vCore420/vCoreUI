# vCoreUI

**vCoreUI** is a modern, professional, and flexible CSS & JS design Libary for web interfaces.  
It includes design tokens, base styles & themes, reusable modular components, and advanced features for rapid, consistent web development.

**Designed for my own portfolio abd projects for efficiency and consistency,  but can be used however you would like.  
Ideas and improvements are welcome — this is a work in progress!**

---

## Features

- **Design Tokens** For theme colours, typography, and shadows
- **Theme-ready Buttons and Switches** (Dark & Light)
- **Cursor Particle Effect**: Smooth, wispy, multi-color Particle cursor trail
- **Liquid Glass Effect**: Reusable glassmorphism card/component
- **Scroll Sequence Animation**: Scroll-driven image sequence (supports ZIP-packed frames)
- **Page Banner**: Main Page Banner to Act as a Header
- **Slideout Menu**: Accessible, animated menu panel
- **Demo Page**: Showcases all features and modularity
- **Frame Packager**: Python script to convert MP4 to optimized WebP frames and ZIP them for use in scroll sequences

---

## Getting Started

1. **Clone the repository**

    ```sh
    git clone https://github.com/vCore420/vCoreUI.git
    ```

2. **Include the CSS in your project**

    ```html
    <link rel="stylesheet" href="css/tokens.css">
    <link rel="stylesheet" href="css/components.css">
    ```

3. **Include the JS in your project**

    ```html
    <script src="js/themes.js"></script>
    <script src="js/cursorEffect.js"></script>
    <script src="js/slideoutMenu.js"></script>
    <script src="https://unpkg.com/fflate/umd/index.js"></script>
    <script src="js/scrollVideo.js"></script>
    ```


## Try the demo:  
    Open `demo.html` in your browser to see the system in action.

---

## Folder Structure

```
vCoreUI/
├── css/
│ ├── tokens.css
│ ├── components.css
│ ├── demo.css
├── js/
│ ├── themes.js
│ ├── cursorEffect.js
│ ├── slidoutMenu.js
│ ├── scrollSequence.js
│ ├── demo.js
├── assets/
│ ├── branding/
│ ├── img/
│ ├── video/
│ ├── framePackager/
│    ├── Frame_Packager.py
│    ├── README.md
├── demo.html
├── README.md
```

---

## Usage

### **Switches and Themes**

Add class `.main-switch` to your HTML elements.

```html
<div class="main-switch">
  <label class="switch">
    <input type="checkbox" id="themeToggle" />
    <span class="slider"></span>
  </label>
  <span id="themeLabel">Theme Toggle - Dark</span>
</div>
```

### **Buttons**

Add Modular, Theme Ready Buttons to nyour project with `.button`. style sizes and postions in your own css

```html
<button class="button">Test Button</button>
```

### **Page Banner**

Add a Main Page Banner to Sit on top of your page to act a heading for the project, apple with class `.banner` and style sizes and reactions in your own css/js.

```html
<div class="banner">
```

### **Slideout Menu**

Add a slideout menu to one side of your project with `.slideout-menu`. Cleanly animated menu panel, pairs well with the Page Banner. 

```html
<nav class="slideout-menu" id="slideoutMenu" aria-hidden="true">
  <ul>
    <li><a href="#">Menu 1</a></li>
    <li><a href="#">Menu 2</a></li>
    <li><a href="#">Menu 3</a></li>
  </ul>
</nav>
```

### **Cursor Particle Effect**

Apply Cursor effect for all pages with `window.vcoreCursorFlow = new vCoreCursorFlow();` or add in a toggle `const toggle = document.getElementById('cursorEffectToggle');`.

```js
toggle.addEventListener('change', function() {
  if (this.checked) {
    window.vcoreCursorFlow = new vCoreCursorFlow();
    status.textContent = "On";
  }
});
```  

### **Scroll Sequence Animation**

Add Videos with Playback Linked to the Page Movement, add ZIP-packed frames (make with the Frame_Packager.py) to your assests to be loaded, add class `.scroll-sequence` to your project adn style its size, postion and other attributes in your own css by giving it an id:

```html
<div class="scroll-sequence" id="video-1"
     data-zip="assets/video/frames.zip"
     data-frames="50">
  <canvas></canvas>
</div>
```
- **Modular:** Works with any image size or aspect ratio.
- **ZIP support:** Use the Frame Packager to generate a ZIP for easy asset management.


### **Liquid Glass Card** 

The glass style is highly customizable using design tokens. It an be Used as a filter or a standalone element. Add class `.liquid-glass` either on its own or within a div to add the filter to it. All text within the class will display of top of the effect while everytthing else on the page will sit under it and will have the svg effect applied to it. 

```html
<div class="liquid-glass">
    <!-- Content here -->
</div>
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

## Frame Packager (Python Utility)

**Convert MP4 videos to optimized WebP frames and ZIP them for use in scroll sequences.**

**Usage:**
1. Place your `.mp4` files in `assets/FramePackager/`.
2. Run:
   ```
   python Frame_Packager.py
   ```
3. The script will extract frames and package them into a ZIP located in the same directory.

**Requirements:**  
- Python 3  
- `opencv-python` (`pip install opencv-python`)

---

## License

MIT

Designed by vCore420