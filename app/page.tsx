import Link from 'next/link'
import { ArrowRight, Code, Zap, Shield, Sparkles } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Code className="w-8 h-8 text-purple-600" />
            <span className="text-xl font-bold">Screenshot to Code</span>
          </div>
          <div className="flex gap-4">
            <Link
              href="/sign-in"
              className="px-4 py-2 text-gray-700 hover:text-purple-600 transition"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full mb-6 text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            AI-Powered Code Generation
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Turn Screenshots into
            <br />
            Production-Ready Code
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Upload any UI screenshot and get clean, professional React, HTML, or Vue code in seconds.
            Perfect for developers who want to move fast.
          </p>
          <Link
            href="/sign-up"
            className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-lg font-semibold"
          >
            Start Building Now
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-sm text-gray-500 mt-4">5 free conversions • No credit card required</p>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
            <p className="text-gray-600">
              Get your code in under 30 seconds. No more spending hours recreating designs manually.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Code className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Clean Code</h3>
            <p className="text-gray-600">
              Production-ready code with TypeScript, best practices, and modern frameworks.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Multiple Frameworks</h3>
            <p className="text-gray-600">
              Export to React, HTML, or Vue. Choose the framework that fits your stack.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">Simple Pricing</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-8 bg-white rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-2xl font-bold mb-2">Free</h3>
            <div className="text-4xl font-bold mb-4">
              $0<span className="text-lg text-gray-600">/month</span>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>5 conversions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>All frameworks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Basic support</span>
              </li>
            </ul>
            <Link
              href="/sign-up"
              className="block text-center px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition"
            >
              Get Started
            </Link>
          </div>

          <div className="p-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl shadow-lg text-white relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-yellow-400 text-purple-900 rounded-full text-sm font-bold">
              POPULAR
            </div>
            <h3 className="text-2xl font-bold mb-2">Pro</h3>
            <div className="text-4xl font-bold mb-4">
              $29<span className="text-lg opacity-80">/month</span>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <span>✓</span>
                <span>100 conversions/month</span>
              </li>
              <li className="flex items-start gap-2">
                <span>✓</span>
                <span>All frameworks</span>
              </li>
              <li className="flex items-start gap-2">
                <span>✓</span>
                <span>Priority support</span>
              </li>
              <li className="flex items-start gap-2">
                <span>✓</span>
                <span>Project history</span>
              </li>
            </ul>
            <Link
              href="/sign-up"
              className="block text-center px-6 py-3 bg-white text-purple-600 rounded-lg hover:bg-gray-50 transition font-semibold"
            >
              Upgrade to Pro
            </Link>
          </div>

          <div className="p-8 bg-white rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
            <div className="text-4xl font-bold mb-4">Custom</div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Unlimited conversions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>API access</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Custom integrations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Dedicated support</span>
              </li>
            </ul>
            <a
              href="mailto:sales@screenshot2code.com"
              className="block text-center px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/50 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-gray-600">
          <p>&copy; 2024 Screenshot to Code. Built with AI magic ✨</p>
        </div>
      </footer>
    </div>
  )
}
