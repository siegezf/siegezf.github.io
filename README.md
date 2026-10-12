# Success Glow Ventures website

Static site: HTML, CSS and vanilla JavaScript. No build step, no backend, no prices shown.

## Files
index.html, shop.html, product.html, contact.html, about.html - the five pages
styles.css - all styling (colours and spacing are variables at the top)
app.js - header, footer, search, filters, order list, WhatsApp message
products.json - the catalogue
logo-mark.png (SG monogram, transparent, used in the header), logo-full.png (full lockup, transparent, used in the footer), favicon.png and apple-touch-icon.png. Both logos are cut from the supplied brand image and are made for dark backgrounds. The old logo*.svg and favicon.svg files are no longer used and can be deleted.

All files sit in one folder so they are easy to upload from a phone. Paths are relative, so the site works under a GitHub project subpath.

## Deploy on GitHub Pages (phone only)
1. In the GitHub app or browser, create a new repository named success-glow-ventures (Public).
2. Open the repository, tap Add file, then Upload files, and upload every file in this folder. Tap Commit changes.
3. Go to Settings, then Pages. Under Source choose Deploy from a branch, branch main, folder /(root). Save.
4. After about a minute the site is live at https://YOUR-USERNAME.github.io/success-glow-ventures/

## Edit the catalogue
Open products.json in Acode. Each product has: id (never change it), name, category (care, clean, home or fashion), image, description, price, currency, variants, availability. Leave a value as null until it is confirmed by the owner.
- Price: set "price": 2500 and "currency": "NGN". Until then the site shows Request a quote.
- Description: set "description": "Text confirmed by the owner".

## Replace a placeholder with a real photo
1. Create a folder named images and upload the photo (JPG or WebP, square, under 200 KB).
2. In products.json set "image": "images/spray-perfumes.jpg" and add "alt": "Short description of the photo".
3. If the file name is wrong, the site falls back to the placeholder.

## Temporary placeholders
Cards without an image show a category icon on an ivory tile, with one note above the shop grid. They are drawn in code, not photographs.

## Known limits
- The logo PNGs come from a small image (about 450 px wide). Ask for a larger or vector file for printing.
- Pages load products.json with fetch, so open the site through GitHub Pages, not by opening the HTML file directly.
