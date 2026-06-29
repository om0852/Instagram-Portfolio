# Instagram Portfolio

Instagram-style portfolio application for showcasing projects, posts, profile content, and resume materials.

## Product

- Specializes in: visual portfolio presentation, social feed layout, document delivery, and contact workflows
- Model: Next.js web app with API, feed, stories, posts, and profile pages

## What it does

- Displays portfolio content in an Instagram-like UI
- Supports posts, stories, projects, reels, and notifications
- Enables messaging and contact form flows
- Provides resume viewing and download
- Offers admin post creation workflows
- Includes search, saved items, and post interactions

## Tech stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Axios
- Emoji picker
- Nodemailer
- Mongoose
- Vercel Blob
- Sonner notifications

## Repo structure

```
app/
  page.jsx
  contact/page.jsx
  create/page.jsx
  profile/page.jsx
  projects/page.jsx and [id]/page.jsx
  reels/page.jsx
  resume/page.jsx
  search/page.jsx
  notifications/page.jsx
  admin/posts/page.jsx
  hooks/usePostInteraction.js
  _components/*.jsx
  api/
    messages/route.js
    posts/route.js
    profile/route.js
    projects/route.js
    search/route.js
    seed/route.js
    send-mail/route.js
    stories/route.js
    upload/route.js
models/
  messageSchema.js
  postSchema.js
  storySchema.js
  userSchema.js
utils/db.js
scripts/
public/
  images, posts assets, stories assets
README.md
```

## Requirements

- Node.js 18+
- npm or pnpm
- MongoDB connection string
- Email service credentials for contact form
- Blob storage credentials for uploads

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## License

MIT
