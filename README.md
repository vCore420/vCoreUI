# vCoreUI

**vCoreUI** is a Working Project aiming for a Modern, Professional and Flexible CSS design system for web interfaces.  
It includes design tokens, base styles, and reusable components all designed to make web development easy to maintain and keep consistent between projects, pages and elements.

**Designed to Be Used in My own projects for efficientcy and constancy, but can be used how ever you would like**
**any Ideas/Improvements are welcomed, this is a work in progress**

## Features

- **Design tokens** for colors, typography, and shadows
- **Glass effect** reusable component
- **Theme-ready buttons** (dark & light)
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

```html
vCoreUI/
├── css/
│ ├── tokens.css
│ ├── base.css
│ ├── components.css
├── assets/
│ └── branding/
├── demo.html
├── README.md
├── LICENSE
```

## Usage

Apply classes like `.liquid-glass`, `.button-dark`, and `.button-light` to your HTML elements.

```html
<div class="liquid-glass">
    <!-- Content here -->
</div>
<button class="button-dark">Dark Button</button>
<button class="button-light">Light Button</button>
```

## Glass Effect Filter - Thanks to archisvaze for the Liquid Glass Effect

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
## License

MIT Licence

Copyright (c) 2025 VCore

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Designed by vCore420
