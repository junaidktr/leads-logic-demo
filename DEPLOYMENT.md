# Leads Logic Estate CRM - cPanel Deployment Guide

## Quick Deployment Steps

### Step 1: Build the Project
```bash
npm run build
```
This creates a `dist/` folder with all static files.

### Step 2: Upload to cPanel

**Option A: File Manager (Easiest)**
1. Login to cPanel
2. Open **File Manager**
3. Navigate to `public_html/` (or your domain's root folder)
4. **Delete** any existing files (backup first if needed)
5. Click **Upload** button
6. Upload ALL files from the `dist/` folder:
   - `index.html`
   - `assets/` folder (contains CSS and JS)
7. Wait for upload to complete

**Option B: FTP/SFTP**
1. Use FileZilla or any FTP client
2. Connect to your cPanel FTP credentials
3. Navigate to `public_html/`
4. Upload contents of `dist/` folder (not the folder itself)

### Step 3: Verify
1. Visit your domain: `https://yourdomain.com`
2. The CRM should load immediately
3. All data is stored in browser localStorage (no server database needed)

---

## Important Notes

### Data Storage
- All CRM data (leads, properties, deals, etc.) is stored in **browser localStorage**
- Data is **per-browser** - each user's browser has its own data
- For production multi-user setup, you'll need a backend API + database

### .htaccess (Optional)
If you want clean URLs or future-proofing, upload the included `.htaccess` file to `public_html/`

### Browser Compatibility
- Works on all modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- Mobile responsive

### Performance
- Total size: ~300 KB (compressed)
- Loads instantly on any hosting
- No server-side processing

---

## Production Considerations

### Current Limitations (Demo Mode)
- Data stored locally in each browser
- No user authentication
- No shared database
- No real API integrations (simulated)

### For Production Deployment
To make this a real multi-user CRM, you need:

1. **Backend API** (Node.js/PHP/Python)
2. **Database** (MySQL/PostgreSQL)
3. **Authentication** (JWT/Session)
4. **Real Integrations** (Property Finder API, Meta API, WhatsApp Business API)

Contact the development team for production backend setup.

---

## Troubleshooting

### Blank page after upload?
- Check browser console (F12) for errors
- Ensure all files uploaded correctly
- Clear browser cache (Ctrl+Shift+R)

### 404 errors on refresh?
- Upload the `.htaccess` file to `public_html/`
- Or access via `yourdomain.com/index.html`

### Styles/scripts not loading?
- Ensure `assets/` folder uploaded with correct permissions (755)
- Check file paths in `index.html`

---

## Support

For questions about:
- **Deployment**: Contact your hosting provider
- **CRM Features**: Check the in-app help or documentation
- **Production Backend**: Contact development team

---

**Built with**: React 18 + Vite + Tailwind CSS
**Hosting**: Any static hosting (cPanel, Netlify, Vercel, GitHub Pages)
**Data**: Client-side localStorage (demo mode)
