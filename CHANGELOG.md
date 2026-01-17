# Changelog

All notable changes to Flatcolor PDF will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-01-18

### Added
- 🔄 Image rotation feature - rotate images 90° clockwise before PDF generation
- 🎨 Quick color mode toggle - switch between custom colors and black & white
- 🖼️ Border toggle - option to disable image borders/outlines for cleaner PDFs
- 📱 Collapsible toolbar on mobile - saves vertical space with expandable settings
- 👁️ Real-time rotation preview - see rotated images in preview before generating PDF

### Improved
- 📱 Enhanced mobile responsiveness across all components
- 🎯 Optimized TopBar layout with collapsible design on mobile devices
- 🎨 Compact color picker interface with better mobile touch targets
- 📐 Streamlined layout selector with reduced spacing on mobile
- 🔧 Moved "Generate PDF" button to top of settings for better accessibility
- 📊 Relocated preview section below image upload area for better workflow
- 🎨 Fixed color picker icon visibility issues
- ⚡ Improved PDF generation performance with canvas-based image rotation

### Fixed
- 🐛 Resolved color wheel icon appearing on color picker squares
- 🐛 Fixed PDF generation issues with rotated images
- 🐛 Corrected rotation preview not updating in real-time
- 📱 Fixed toolbar alignment issues on mobile devices
- 🎨 Improved color picker component styling and functionality

### Technical Details
- Canvas-based image pre-rotation for reliable PDF generation
- Enhanced state management for rotation, colors, and borders
- Improved component modularity and reusability
- Better TypeScript type definitions across components

## [1.0.0] - 2026-01-17

### Added
- ✨ Initial release of Flatcolor PDF
- 🎨 Customizable two-color palette with 8 presets
- 📄 Multiple page layout options (Single, 1×2, 2×1, 2×2, 3×3)
- 🖼️ Drag & drop image upload (JPG, PNG, WEBP)
- 📋 PDF generation with flat colors (no gradients)
- 📝 Header and footer customization
- 🎯 Adjustable page margins (5-30mm)
- 📱 Fully responsive design for mobile, tablet, and desktop
- 🔄 Image reordering via drag & drop
- 👁️ Live preview of PDF layout
- 💾 Download generated PDFs
- ⚡ Fast performance with Vite
- 🎨 Modern UI with shadcn/ui components
- 📦 Production-ready build configuration
- 🚀 Deployment guides for Netlify, Vercel, GitHub Pages
- 📱 PWA manifest for mobile installation
- 🔧 Environment variable support

### Technical Details
- Built with React 18 and TypeScript
- Styled with Tailwind CSS
- PDF generation using jsPDF
- File upload handling with react-dropzone
- UI components from shadcn/ui
- Icons from Lucide React

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Future Roadmap

### Planned Features
- [ ] Batch PDF generation
- [ ] Image filters and adjustments
- [ ] More page size options (A3, A5, Custom)
- [ ] Export settings presets
- [ ] Dark mode support
- [ ] Multi-language support
- [ ] Cloud storage integration
- [ ] PDF password protection
- [ ] Watermark support
- [ ] Template library

### Under Consideration
- [ ] OCR text extraction
- [ ] PDF merging
- [ ] Image compression options
- [ ] Custom fonts
- [ ] QR code generation
- [ ] Barcode support

---

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)
