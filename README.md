# 🏢 Leads Logic Estate CRM

**Dubai Real Estate Sales Operating System** - Complete CRM solution for real estate brokerages

![Version](https://img.shields.io/badge/version-2.4.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Build](https://img.shields.io/badge/build-passing-brightgreen)

---

## 🚀 Overview

Leads Logic Estate CRM ek complete real estate sales operating system hai jo Dubai market ke liye specially design kiya gaya hai. Yeh CRM leads capture karne se lekar deal close karne tak poora journey manage karta hai.

### ✨ Key Features

- **Lead Management** - Multi-channel lead capture (Property Finder, Bayut, Meta, WhatsApp, etc.)
- **Duplicate Detection** - Automatic lead deduplication based on phone/email
- **Lead Scoring** - Intelligent HOT/WARM/COLD scoring system
- **Pipeline Management** - Drag-and-drop Kanban board
- **Property Matching** - AI-powered property recommendations
- **Communication Hub** - WhatsApp, Calls, Email integration
- **Marketing ROI** - Track campaign performance and source ROI
- **Team Management** - Role-based access control
- **RERA Compliance** - Dubai regulatory compliance ready
- **AI Assistant** - Built-in AI chat widget

---

## 📦 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS 4
- **Build Tool**: Vite 6
- **Icons**: Custom SVG icon set
- **Charts**: Hand-crafted SVG charts
- **State Management**: React Context + useReducer
- **Storage**: Browser localStorage (demo mode)

---

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/leads-logic-crm.git
cd leads-logic-crm

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 📁 Project Structure

```
leads-logic-crm/
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── icons.tsx    # Custom SVG icons
│   │   └── ui.tsx       # UI components (Avatar, Badge, Modal, etc.)
│   ├── data/
│   │   └── seed.ts      # Demo data (leads, properties, etc.)
│   ├── lib/
│   │   └── types.ts     # TypeScript types & utility functions
│   ├── pages/
│   │   └── all.tsx      # All page components
│   ├── state/
│   │   └── store.tsx    # State management (Context + Reducer)
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── public/
│   └── .htaccess        # Apache config for SPA routing
├── dist/                # Build output (generated)
├── index.html           # HTML template
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
└── vite.config.js       # Vite config
```

---

## 🚢 Deployment

### cPanel Hosting

1. Build the project:
   ```bash
   npm run build
   ```

2. Upload `dist/` folder contents to `public_html/`:
   - `index.html`
   - `assets/` folder
   - `.htaccess` file

3. Visit your domain - CRM is live!

### Other Platforms

- **Netlify**: Drag & drop `dist/` folder
- **Vercel**: Import repository, auto-deploys
- **GitHub Pages**: Use `gh-pages` branch with `dist/` contents

---

## 📊 Features Breakdown

### Lead Management
- Multi-source lead capture (15+ sources)
- Automatic duplicate detection
- Lead scoring (0-100)
- SLA tracking & escalation
- Assignment rules (area-based, source-based, round-robin)

### Property Portfolio
- Property listings with syndication status
- Off-plan projects with unit inventory
- Developer database
- Community management (31 Dubai communities)
- Property matching engine

### Communication
- WhatsApp Business integration
- Call logging & click-to-call
- Email inbox with auto-parsing
- Conversation history per lead

### Marketing & Analytics
- Campaign management
- Landing page tracker
- Source ROI matrix
- Conversion funnel
- Agent performance metrics

### Team & Collaboration
- Role-based access (9 roles)
- Availability tracking
- Lead assignment automation
- Performance leaderboard

### Compliance (Dubai)
- RERA permit tracking
- DLD title deed verification
- Ejari registration
- Trakheesi advertising permits
- UAE PDPL consent tracking

---

## 🎨 Customization

### Change Company Branding
Edit `src/components/ui.tsx` - Sidebar component:
```tsx
<p className="font-display text-[15.5px] font-bold">Your Company</p>
```

### Modify Lead Scoring
Edit `src/pages/all.tsx` - Settings component:
```tsx
// Adjust weights (must total 100)
{ budget: 30, timeline: 20, cash: 15, source: 15, engagement: 20 }
```

### Add New Lead Source
Edit `src/lib/types.ts`:
```tsx
export const SOURCES = {
  // ... existing sources
  "New Portal": { channel: "portal", color: "#yourcolor" }
};
```

---

## 🔐 Security Notes

**Current Implementation (Demo Mode):**
- Data stored in browser localStorage
- No backend authentication
- Per-browser data isolation

**For Production:**
- Implement backend API with authentication
- Use database (MySQL/PostgreSQL)
- Add JWT/session-based auth
- Implement rate limiting
- Enable HTTPS/SSL

---

## 📱 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS/Android)

**Requirements:**
- JavaScript enabled
- Modern browser (ES6+ support)

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🆘 Support

For issues, feature requests, or questions:
- Open an issue on GitHub
- Contact: support@leadslogic.ae

---

## 🎯 Roadmap

- [ ] Backend API integration
- [ ] Real Property Finder/Bayut API connections
- [ ] WhatsApp Business Cloud API integration
- [ ] Mobile app (React Native)
- [ ] Advanced AI features
- [ ] Multi-language support (Arabic RTL)
- [ ] Advanced reporting & analytics
- [ ] Document generation (contracts, MOUs)

---

## 🙏 Acknowledgments

Built for Dubai real estate market with focus on:
- Speed-to-lead optimization
- Multi-channel lead capture
- Compliance with UAE regulations
- Professional user experience

---

**Made with ❤️ for Dubai Real Estate**

AED | Asia/Dubai | RERA Compliant
