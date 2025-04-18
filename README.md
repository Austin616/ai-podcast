# 🎙️ Podcastr – AI-Powered Podcast Generator

Generate entire podcasts from a prompt using the power of AI. Podcastr lets users write a prompt, generate audio using OpenAI + ElevenLabs (or similar), and store/share episodes securely with built-in authentication and storage.

![Podcastr Screenshot](/ai-podcast/public/images/cover.png)

## ✨ Features

- 🧠 Generate podcasts from a single prompt using AI
- 🔐 Secure user login with [Clerk](https://clerk.dev/)
- 🎧 AI-generated audio output (using OpenAI / ElevenLabs)
- 💾 Upload + store podcast audio with file storage
- 📚 View and manage your generated podcasts
- ⚡ Realtime backend using [Convex](https://convex.dev/)
- 📦 Deployed with production-ready infrastructure

## 🚀 Tech Stack

| Tech         | Purpose                                 |
|--------------|-----------------------------------------|
| Next.js      | React framework + App Router            |
| Convex       | Realtime backend & database             |
| Clerk        | Authentication & user management        |
| OpenAI API   | Content generation                      |
| UploadStuff  | File uploads + audio storage            |
| Tailwind CSS | Styling                                 |

## 🛠️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/austintran/podcastr.git
cd podcastr
```

### 2. Install dependencies

```bash
npm install
# or
yarn
```

### 3. Setup environment variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_CONVEX_URL=https://compassionate-ostrich-171.convex.cloud
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-pk
CLERK_SECRET_KEY=your-clerk-secret
OPENAI_API_KEY=your-openai-key
```

### 4. Start the dev server

```bash
npx convex dev  # start Convex local server
npm run dev     # start Next.js
```

## 🧪 Scripts

```bash
npm run dev       # Run dev environment
npm run build     # Build for production
npm run start     # Start production server
npx convex dev    # Start local Convex dev deployment
npx convex deploy # Deploy schema/functions to cloud
```

## 📂 Folder Structure (high-level)

```
/app                - Next.js app router pages
/components         - UI + functional components
/convex             - Convex schema/functions
/public             - Static assets
/lib                - Utility functions
/hooks              - Custom React hooks
```

## 🧠 How It Works

1. Users log in with Clerk.
2. They write a podcast prompt.
3. The frontend calls OpenAI to generate content and voice.
4. The resulting audio is stored via UploadStuff.
5. Convex stores metadata and links audio to the user.
6. Users can replay or regenerate episodes later.

## 📸 Demo

Coming soon: [your demo link here]

## 🧑‍💻 Author

**Austin Tran**  
[Portfolio](https://austintran.me)


