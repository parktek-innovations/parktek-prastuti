# ParkTek Prastuti

## Repository Metadata

- Display name: ParkTek Prastuti
- Current repo slug: `parktek-prastuti`
- Former repo name: `parktek-lending`
- Purpose: Public ParkTek landing and marketing site for brand presentation, smart-parking solution pages, policy pages, contact flows, and web presence.
- Primary stack: HTML, CSS, JavaScript, Tailwind CSS, Font Awesome
- Source-of-truth repository: `../parktek-samhita`
- Search aliases: `prastuti`, `landing`, `website`, `marketing site`, `public site`, `smart parking solutions`
- GitHub topics: `parktek`, `parktek-prastuti`, `landing-page`, `marketing-site`, `website`, `nextjs`, `tailwindcss`, `brand`, `public-site`, `seo`, `contact-form`, `policy-pages`, `smart-parking`, `parking-management`
- Migration note: `parktek-prastuti` is the renamed canonical slug for former `parktek-lending`.

![ParkTek Logo](images/parkTekLogo.png)

It presents ParkTek’s smart-parking brand, solution pages, policy pages, contact flows, and web presence for societies, corporate campuses, and commercial parking use cases.

## Source Of Truth

Shared brand/design constraints, documentation standards, and AI-agent workflow live in `../parktek-samhita/`.
Use repo-local docs only for landing-site implementation and deployment details. Do not treat landing content as product/API/model truth.

Canonical landing documentation lives in `../parktek-samhita/docs/lending/`. Local implementation notes live in `docs/`.

Start here for AI-agent work: `AGENTS.md`.

## 🌟 Features

### Design & UI
- **Modern, Professional Design** - Clean and contemporary interface with smooth animations
- **Video Background Hero Section** - Eye-catching video background in the landing section
- **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- **Smooth Animations** - Fade-in effects, hover interactions, and scroll-triggered animations
- **Interactive Elements** - Tab switching, FAQ accordion, mobile hamburger menu

### Sections
1. **Navigation Bar** - Fixed header with prominent logo and smooth scroll navigation
2. **Hero Section** - Full-screen video background with call-to-action buttons
3. **Features Grid** - Showcase of key features (ANPR Access, List Tag, Valet Parking, Fleet Sharing)
4. **Technology Showcase** - Highlighting the smart parking ecosystem with visual demonstrations
5. **Statistics Section** - Impressive numbers showing scale and reliability
6. **Innovation Section** - Details about the Controller and system components
7. **Solutions Tabs** - Interactive tabs for Corporate, Society, and Mall solutions
8. **Client Testimonials** - Social proof with ratings and customer feedback
9. **FAQ Section** - Accordion-style frequently asked questions
10. **Contact Page** - Comprehensive contact form with company information
11. **Footer** - Complete site navigation, social links, and contact details

## 🚀 Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid, Flexbox, and custom properties
- **JavaScript (ES6+)** - Interactive functionality and animations
- **Font Awesome** - Icons throughout the website
- **Google Fonts** - Professional typography

## 📁 Project Structure

```
ParkTekWeb/
├── index.html              # Main homepage
├── contact.html            # Contact page
├── styles.css              # All styling and animations
├── script.js               # JavaScript functionality
├── images/                 # Images and media folder
│   ├── parkTekLogo.png    # Logo
│   ├── Gemini_Generated_Image_cjxy4rcjxy4rcjxy.png    # Corporate solution
│   ├── Gemini_Generated_Image_d4zfxad4zfxad4zf.png    # Society solution
│   ├── Gemini_Generated_Image_ecznk6ecznk6eczn.png    # Mall solution
│   ├── Gemini_Generated_Image_v0m1dhv0m1dhv0m1.png    # Technology showcase
│   ├── Video_Generation_and_Sharing.mp4               # Hero video
│   └── WhatsApp Image 2025-12-20 at 11.16.53 AM.jpeg  # Background image
├── README.md               # Project documentation
├── LICENSE                 # MIT License
└── .gitignore             # Git ignore file
```

## 🎨 Color Scheme

```css
Primary Blue: #0066cc
Secondary Blue: #00a8e8
Accent Orange: #f39c12
Dark Background: #1a1a2e
Light Background: #f5f5f5
```

## ⚙️ Features Implementation

### Interactive Components
- **Mobile Menu** - Responsive hamburger menu for mobile devices
- **Smooth Scrolling** - Seamless navigation between sections
- **Tab Switching** - Dynamic content switching for different solutions
- **FAQ Accordion** - Expandable/collapsible FAQ items
- **Form Validation** - Contact form with validation
- **Scroll Animations** - Elements animate as they enter viewport
- **Counter Animation** - Animated statistics counters
- **Navbar Scroll Effect** - Logo shrinks on scroll for better UX

### JavaScript Functionality
- Mobile menu toggle
- Smooth scroll navigation
- Solution tabs switching
- FAQ accordion interactions
- Intersection Observer for scroll animations
- Counter animations for statistics
- Form submission handling
- Lazy loading for images
- Parallax effects

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## 🚀 Getting Started

### Prerequisites
- A modern web browser
- No build tools required - pure HTML, CSS, and JavaScript

### Installation & Usage

1. **Clone the repository**
   ```bash
   git clone https://github.com/kushgupta18/parktek-prastuti.git
   cd parktek-prastuti
   ```

2. **Open the website**
   - Simply open `index.html` in your web browser
   - Or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   ```

3. **View the website**
   - Open `http://localhost:8000` in your browser

## 🎯 Key Sections Overview

### Homepage Sections
1. **Hero** - Video background with main value proposition
2. **Features** - 4 key features with icons
3. **Technology** - Showcase of smart parking solutions
4. **Stats** - 1,000+ locations, 10M+ vehicles, 24/7 support, 99.9% uptime
5. **Innovation** - The Controller and system components
6. **Solutions** - Tabs for Corporate, Society, and Mall solutions
7. **Testimonials** - Customer reviews and ratings
8. **FAQ** - Common questions and answers
9. **CTA** - Call-to-action for demo scheduling

### Contact Page
- Contact information (phone, email, address, hours)
- Contact form with validation
- Social media links
- Why Choose Us section
- Map placeholder

## 🎨 Customization

### Changing Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #0066cc;
    --secondary-color: #00a8e8;
    --accent-color: #f39c12;
    /* ... more variables */
}
```

### Updating Content
- **Text Content**: Edit directly in `index.html` and `contact.html`
- **Images**: Replace files in the `images/` folder
- **Styling**: Modify `styles.css`
- **Functionality**: Update `script.js`

## 📧 Contact Information

- **Email**: support@parktek.in
- **Phone**: +91 9876543210
- **Address**: Your City, India

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Author

**Kush Gupta**
- GitHub: [@kushgupta18](https://github.com/kushgupta18)

## 🙏 Acknowledgments

- Inspired by modern parking management solutions
- Icons from Font Awesome
- Images and media optimized for web performance

## 📈 Future Enhancements

- [ ] Add blog section
- [ ] Implement multi-language support
- [ ] Add backend integration for contact form
- [ ] Create admin dashboard
- [ ] Add customer portal
- [ ] Integrate payment gateway
- [ ] Add live chat support
- [ ] SEO optimization
- [ ] Performance optimization with lazy loading
- [ ] Add analytics integration

---

Made with ❤️ for ParkTek - Simplifying Your Parking

**Last Updated**: December 24, 2025
