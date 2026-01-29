# 🎨 Screenshot to Code - Setup & Deployment Guide

## 🚀 Quick Start

This is a **production-ready AI-powered SaaS** that converts screenshots into clean code. Built with Next.js 15, TypeScript, OpenAI GPT-4 Vision, and Clerk Auth.

---

## 📋 Prerequisites

1. **Node.js 18+** (verify: `node --version`)
2. **npm or pnpm** (verify: `npm --version`)
3. **Git** (verify: `git --version`)
4. **PostgreSQL database** (Vercel Postgres recommended)

---

## 🛠️ Local Development Setup

### 1. Clone the Repository

```bash
cd /home/lokendarjangid1234/clawd
cd loky_screenshot_to_code
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Copy the example file:

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in these values:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_... # From https://dashboard.clerk.com
CLERK_SECRET_KEY=sk_test_...                  # From https://dashboard.clerk.com
CLERK_WEBHOOK_SECRET=whsec_...                # Created after setting up webhooks (step 5)

# Database (Vercel Postgres recommended)
DATABASE_URL="postgresql://user:password@host:5432/screenshot_to_code?schema=public"

# OpenAI API
OPENAI_API_KEY=sk-...                         # From https://platform.openai.com

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000     # Change for production
```

### 4. Set Up Database

Generate Prisma client and push schema:

```bash
npx prisma generate
npx prisma db push
```

Optional - Open Prisma Studio to view data:

```bash
npx prisma studio
```

### 5. Set Up Clerk Webhooks (Important!)

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Select your application
3. Navigate to **Webhooks** in the sidebar
4. Click **Add Endpoint**
5. Enter URL: `http://localhost:3000/api/webhook/clerk` (for local) or `https://yourdomain.com/api/webhook/clerk` (for production)
6. Subscribe to these events:
   - ✅ `user.created`
   - ✅ `user.deleted`
7. Copy the **Signing Secret** and add it to `.env.local` as `CLERK_WEBHOOK_SECRET`

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 🚀 Deployment to Vercel

### 1. Push to GitHub (Already Done!)

```bash
# Already pushed to: https://github.com/lokendarjangid/loky_screenshot_to_code
```

### 2. Deploy to Vercel

Click this button or follow manual steps:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/lokendarjangid/loky_screenshot_to_code)

**Manual Steps:**

1. Go to [Vercel Dashboard](https://vercel.com)
2. Click **Add New** → **Project**
3. Import `loky_screenshot_to_code` from GitHub
4. Configure Environment Variables (see step 3 below)
5. Click **Deploy**

### 3. Add Environment Variables in Vercel

In Vercel project settings → **Environment Variables**, add:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
CLERK_WEBHOOK_SECRET
DATABASE_URL
OPENAI_API_KEY
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

### 4. Set Up Production Database

**Option A: Vercel Postgres (Recommended)**

1. In Vercel Dashboard → **Storage** → **Create Database**
2. Choose **Postgres**
3. Copy the `DATABASE_URL` to Environment Variables
4. Run migrations:
   ```bash
   npx prisma db push
   ```

**Option B: Supabase**

1. Create project at [Supabase](https://supabase.com)
2. Get connection string from Settings → Database
3. Add to Vercel Environment Variables

### 5. Update Clerk Webhook URL

1. Go to Clerk Dashboard → Webhooks
2. Update endpoint URL to: `https://your-domain.vercel.app/api/webhook/clerk`
3. Verify webhook is receiving events

### 6. Test Production App

1. Visit your Vercel URL
2. Sign up for an account
3. Upload a screenshot
4. Verify code generation works
5. Check database in Prisma Studio or Supabase

---

## 🔑 API Keys Setup

### 1. Clerk (Authentication)

1. Go to [clerk.com](https://clerk.com)
2. Create a new application
3. Choose authentication methods (Email, Google, etc.)
4. Copy API keys from Dashboard → API Keys
5. Set up webhooks (see above)

**Cost:** Free tier includes 5,000 MAU (Monthly Active Users)

### 2. OpenAI (GPT-4 Vision)

1. Go to [platform.openai.com](https://platform.openai.com)
2. Create account and add payment method
3. Navigate to API Keys
4. Create new secret key
5. **Important:** You need GPT-4 Vision access
   - Available on pay-as-you-go plans
   - Check [OpenAI pricing](https://openai.com/pricing)

**Cost:** 
- GPT-4 Vision: ~$0.01-0.03 per request
- Budget: $10 = ~300-1000 conversions

### 3. Database

Choose one:

**Vercel Postgres:** 
- Free tier: 256 MB storage
- Perfect for MVP
- [vercel.com/storage/postgres](https://vercel.com/storage/postgres)

**Supabase:**
- Free tier: 500 MB database
- Includes auth, storage, realtime
- [supabase.com](https://supabase.com)

---

## 💰 Monetization Setup

### Add Stripe Payments (Optional but Recommended)

1. Install Stripe:
   ```bash
   npm install stripe @stripe/stripe-js
   ```

2. Add to `.env.local`:
   ```
   STRIPE_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

3. Create products in Stripe Dashboard:
   - Pro Plan: $29/month → 100 credits
   - Credit Pack: $5 → 10 credits

4. Implement checkout (reference: `loky_stripe_payments` project)

---

## 📊 Pricing Tiers (Implemented in UI)

| Tier | Price | Credits | Features |
|------|-------|---------|----------|
| **Free** | $0 | 5 | All frameworks, basic support |
| **Pro** | $29/mo | 100 | Priority support, project history |
| **Enterprise** | Custom | Unlimited | API access, white-label, SLA |

---

## 🔒 Security Checklist

- ✅ API keys stored in environment variables
- ✅ Clerk authentication on all protected routes
- ✅ Database queries filtered by user ID
- ✅ Rate limiting (implement with Upstash Redis)
- ✅ Input validation on file uploads
- ✅ Webhook signature verification
- ✅ HTTPS only in production
- ⚠️ Add CORS headers for API endpoints
- ⚠️ Implement rate limiting per user
- ⚠️ Add file size limits (currently handled by OpenAI)

---

## 🎯 Post-Launch Checklist

### Before Public Launch:

- [ ] Test all user flows (signup → upload → download)
- [ ] Verify Clerk webhooks are working
- [ ] Test credit deduction system
- [ ] Set up error monitoring (Sentry)
- [ ] Add analytics (Vercel Analytics, Posthog)
- [ ] Create privacy policy and terms of service
- [ ] Set up customer support (Intercom, plain.com)
- [ ] Test payment flow (if implemented)
- [ ] Optimize OpenAI prompts for better code quality
- [ ] Add loading states and error messages
- [ ] Mobile responsive testing
- [ ] Cross-browser testing

### Marketing Launch:

- [ ] Product Hunt launch
- [ ] Twitter/X announcement thread
- [ ] Reddit posts (r/webdev, r/SideProject)
- [ ] Dev.to article
- [ ] Show HN (Hacker News)
- [ ] Designer communities (Dribbble, Behance)
- [ ] LinkedIn post
- [ ] YouTube demo video

---

## 🐛 Troubleshooting

### "Unauthorized" errors
- Check Clerk environment variables
- Verify middleware.ts is configured correctly
- Check browser console for Clerk errors

### Database connection errors
- Verify DATABASE_URL is correct
- Run `npx prisma db push` again
- Check database is accessible from Vercel IP

### OpenAI API errors
- Verify API key is valid
- Check you have GPT-4 Vision access
- Ensure billing is set up in OpenAI account
- Check API usage limits

### Webhooks not working
- Verify webhook URL is correct (no trailing slash)
- Check webhook secret matches
- Use ngrok for local webhook testing: `ngrok http 3000`
- Check Clerk Dashboard → Webhooks → Recent Events

### Image upload fails
- Check file size (OpenAI has 20MB limit)
- Verify Sharp is installed (`npm install sharp`)
- Check browser console for errors

---

## 📈 Scaling Considerations

When you get traction:

1. **Database:** Migrate to larger Postgres plan or use connection pooling (PgBouncer)
2. **OpenAI:** Apply for higher rate limits
3. **Caching:** Add Redis for rate limiting and caching
4. **CDN:** Use Vercel Edge Network or Cloudflare
5. **Error Tracking:** Set up Sentry
6. **Monitoring:** Use Vercel Analytics + custom metrics
7. **Queue System:** Add Bull/BullMQ for async processing
8. **Cost Optimization:** Cache common conversions, implement tiers

---

## 🆘 Support

- **GitHub Issues:** [github.com/lokendarjangid/loky_screenshot_to_code/issues](https://github.com/lokendarjangid/loky_screenshot_to_code/issues)
- **Email:** your-email@example.com
- **Documentation:** This README

---

## 📝 License

MIT License - Free to use for personal and commercial projects

---

## 🎉 You're Ready!

Your Screenshot to Code SaaS is ready to launch. This is a **high-value product** with massive market potential. Focus on:

1. **Quality:** Make sure generated code is clean and accurate
2. **Speed:** Optimize for fast generation (15-30 seconds)
3. **UX:** Make the upload → preview → download flow seamless
4. **Marketing:** Show before/after examples, demo videos

**Good luck! 🚀**
