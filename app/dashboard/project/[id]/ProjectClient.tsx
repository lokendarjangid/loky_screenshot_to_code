'use client'

import { useState } from 'react'
import { UserButton } from '@clerk/nextjs'
import { Code, Copy, Download, ArrowLeft, FileCode } from 'lucide-react'
import Link from 'next/link'

type Project = {
  id: string
  name: string
  imageUrl: string
  generatedCode: string
  framework: string
  createdAt: Date
}

export default function ProjectClient({ project }: { project: Project }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(project.generatedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadCode = () => {
    const extension = project.framework === 'react' ? 'tsx' : project.framework === 'vue' ? 'vue' : 'html'
    const blob = new Blob([project.generatedCode], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${project.name}.${extension}`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Code className="w-8 h-8 text-purple-600" />
            <span className="text-xl font-bold">Screenshot to Code</span>
          </Link>
          <UserButton />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-purple-600 mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="capitalize">{project.framework}</span>
                  <span>•</span>
                  <span>{new Date(project.createdAt).toLocaleString()}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center gap-2 transition"
                >
                  <Copy className="w-4 h-4" />
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <button
                  onClick={downloadCode}
                  className="px-4 py-2 bg-purple-600 text-white hover:bg-purple-700 rounded-lg flex items-center gap-2 transition"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <FileCode className="w-5 h-5 text-purple-600" />
                  Original Screenshot
                </h2>
                <div className="rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={project.imageUrl}
                    alt={project.name}
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Code className="w-5 h-5 text-purple-600" />
                  Generated Code
                </h2>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs h-[600px] overflow-y-auto">
                  <code>{project.generatedCode}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
