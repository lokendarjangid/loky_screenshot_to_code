# Screenshot to Code - AI-Powered UI Generator

Convert any screenshot or design mockup into clean, production-ready code instantly using AI.

![Screenshot to Code](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🚀 Features

- **AI-Powered Code Generation**: Upload screenshots and get React, HTML, or Vue code instantly
- **Multiple Frameworks**: Support for React (TypeScript + Tailwind), HTML/CSS, and Vue 3
- **Authentication**: Secure auth with Clerk
- **Credit System**: Free tier with 5 credits, easy to monetize with paid plans
- **Project Management**: Save and manage all your generated projects
- **Beautiful UI**: Modern, responsive design with Tailwind CSS
- **Production-Ready**: Clean, well-commented code following best practices

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Clerk
- **Database**: PostgreSQL + Prisma ORM
- **AI**: OpenAI GPT-4 Vision API
- **Deployment**: Vercel-ready

## 📦 Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/loky_screenshot_to_code.git
cd loky_screenshot_to_code
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

Required environment variables:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Get from [Clerk Dashboard](https://dashboard.clerk.com)
- `CLERK_SECRET_KEY` - Get from Clerk Dashboard
- `CLERK_WEBHOOK_SECRET` - Set up webhooks in Clerk Dashboard
- `DATABASE_URL` - Your PostgreSQL connection string
- `OPENAI_API_KEY` - Get from [OpenAI Platform](https://platform.openai.com)

4. **Set up the database**

```bash
npx prisma generate
npx prisma db push
```

5. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app.

## 🔧 Configuration

### Clerk Webhooks

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Navigate to Webhooks
3. Add endpoint: `https://yourdomain.com/api/webhook/clerk`
4. Subscribe to events: `user.created`, `user.deleted`
5. Copy the signing secret to `CLERK_WEBHOOK_SECRET`

### Database

This project uses PostgreSQL. You can use:
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Supabase](https://supabase.com)
- [Railway](https://railway.app)
- Local PostgreSQL

## 💰 Monetization

The app includes a credit system:
- **Free Tier**: 5 credits for new users
- **Pro Tier**: 100 conversions/month for $29
- **Enterprise**: Custom pricing for unlimited use

To implement payments, integrate:
- [Stripe](https://stripe.com) for subscription billing
- [LemonSqueezy](https://lemonsqueezy.com) for simplified payments
- [Paddle](https://paddle.com) for global payments

## 📝 Usage

1. **Sign up** for a free account
2. **Upload** a screenshot or design mockup
3. **Choose** your target framework (React, HTML, or Vue)
4. **Generate** and get production-ready code
5. **Copy** or download your code

## 🚀 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/loky_screenshot_to_code)

1. Push your code to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production

Make sure to set all environment variables in your deployment platform:
- Clerk credentials
- Database URL (production)
- OpenAI API key
- Set `NEXT_PUBLIC_APP_URL` to your production domain

## 🎯 Roadmap

- [ ] Add more frameworks (Angular, Svelte)
- [ ] Implement Stripe payments
- [ ] Add code preview/rendering
- [ ] Support for component libraries (shadcn/ui, MUI)
- [ ] Batch processing for multiple screenshots
- [ ] API access for developers
- [ ] Figma plugin integration
- [ ] Version history for projects
- [ ] Team collaboration features
- [ ] Mobile app

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this for your own projects!

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org)
- [Clerk](https://clerk.com)
- [OpenAI](https://openai.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Prisma](https://prisma.io)

## 💬 Support

For support, email support@screenshot2code.com or open an issue on GitHub.

---

Built with ❤️ using AI and modern web technologies
