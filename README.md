ImageSmith 💎

Privacy-first image compression for modern creators.
Studio quality results, featherweight file sizes, running 100% in your browser.

ImageSmith is a high-performance, client-side image compressor built with React, Vite, and Tailwind CSS. Unlike other tools, it processes images entirely on the user's device using the HTML5 Canvas API—meaning photos never leave the browser, ensuring absolute privacy.

✨ Features

🔒 100% Local Processing: No server uploads. Your images (passports, contracts, family photos) stay on your device.

⚡ Instant Compression: Powered by your device's GPU for lightning-fast results.

💎 God Mode (Premium):

Batch compress 50+ images at once.

Priority processing queue.

Exclusive "Matrix" style UI effects.

🎨 Modern UI: Glassmorphism aesthetics with responsive layouts for mobile and desktop.

🌗 Dark Mode: Built-in dark/light mode toggle.

📦 Smart Output: Auto-converts PNGs to WebP for maximum file size savings.

🛠️ Tech Stack

Framework: React + Vite

Styling: Tailwind CSS (v3/v4 compatible) + Lucide React Icons

Backend (Auth/DB): Google Firebase (Authentication & Firestore)

Animation: CSS Keyframes (No heavy animation libraries)

🚀 Getting Started

1. Prerequisites

Node.js (LTS version recommended)

A Firebase Project (Free Tier)

2. Installation

# Clone the repository (if using git) or download the source
# Navigate to the project folder
cd imagesmith

# Install dependencies
npm install


3. Configuration (Crucial Step)

This project requires Firebase for the "God Mode" authentication system.

Go to Firebase Console.

Create a new project named ImageSmith.

Enable Authentication (Google Sign-In Provider).

Enable Firestore Database (Start in production mode).

Go to Project Settings -> General -> Your apps -> Web (</>).

Copy your firebaseConfig object.

Open src/config/firebase.js in your editor and paste your keys:

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "...",
  appId: "..."
};


4. Running Locally

npm run dev


Open http://localhost:5173 to view it in the browser.

## 5. Deploying to Vercel

You can deploy ImageSmith to Vercel either using the Vercel Git integration (recommended) or the Vercel CLI.

Option A — Vercel Git Integration (recommended)

- Push this repository to GitHub (it looks like you've already pushed to `main`).
- Go to https://vercel.com and sign in (or create an account).
- Click "New Project" → import your GitHub repository `ImageSmith`.
- Vercel will auto-detect a static site built with Vite. Ensure the build command is `npm run build` and the output directory is `dist` (the included `vercel.json` already configures this).
- Deploy — Vercel will build and publish. Subsequent pushes to `main` will auto-deploy.

Option B — Vercel CLI (manual deploy)

Install the Vercel CLI and deploy from your local machine:

```bash
npm i -g vercel
vercel login
# from project root
npm install
npm run build
vercel --prod
```

Notes
- If you want automatic deploy previews on each PR, use the GitHub integration in the Vercel dashboard.
- If you prefer the app to be deployed behind a custom domain (e.g. `imagesmith.store`), add the domain in your Vercel project settings and follow the DNS instructions.

📂 Project Structure

imagesmith/
├── public/              # Static assets (logo.svg)
├── src/
│   ├── components/      # Reusable UI (Navbar, Footer, Loaders)
│   ├── config/          # Firebase configuration
│   ├── modals/          # Popups (Login, Payment, Preview)
│   ├── utils/           # Logic (Compression engine, Formatting)
│   ├── views/           # Main page layouts (Landing vs Dashboard)
│   ├── App.jsx          # Main application controller
│   ├── index.css        # Global styles & Animations
│   └── main.jsx         # Entry point
├── index.html           # HTML entry
├── tailwind.config.js   # Tailwind configuration
└── vite.config.js       # Vite bundler configuration


💳 Monetization ("God Mode")

Currently, the payment flow is simulated for demonstration. To monetize this:

Set up Stripe or Lemon Squeezy.

Create a "Lifetime Access" product ($5).

Update src/modals/PaymentModal.jsx to link to your payment page.

Use a Webhook (via Firebase Cloud Functions) to listen for successful payments.

When payment succeeds, update the user's Firestore document:

await db.collection('users').doc(userId).update({ isGodMode: true });


🚢 Deployment

This project is optimized for Vercel.

Install Vercel CLI: npm i -g vercel

Run deployment:

vercel deploy --prod


Add your custom domain (e.g., imagesmith.store) in the Vercel Dashboard.

📄 License

This project is proprietary software developed by ShitLabs.