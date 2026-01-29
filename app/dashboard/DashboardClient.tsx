'use client'

import { useState } from 'react'
import { UserButton } from '@clerk/nextjs'
import { Upload, Code, FileCode, AlertCircle, Loader2, Copy, Download, Sparkles } from 'lucide-react'
import Link from 'next/link'

type User = {
  id: string
  email: string
  credits: number
}

type Project = {
  id: string
  name: string
  imageUrl: string
  generatedCode: string
  framework: string
  createdAt: Date
}

export default function DashboardClient({ user, projects }: { user: User; projects: Project[] }) {
  const [uploading, setUploading] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState('')
  const [selectedFramework, setSelectedFramework] = useState<'react' | 'html' | 'vue'>('react')
  const [generatedCode, setGeneratedCode] = useState('')
  const [projectName, setProjectName] = useState('')
  const [copied, setCopied] = useState(false)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (user.credits <= 0) {
      setError('No credits remaining. Please upgrade your plan.')
      return
    }

    setError('')
    setUploading(true)
    setGenerating(true)
    setGeneratedCode('')

    try {
      // Convert to base64
      const reader = new FileReader()
      reader.readAsDataURL(file)
      
      reader.onload = async () => {
        const base64Image = reader.result as string

        // Generate code
        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            image: base64Image,
            framework: selectedFramework,
            projectName: projectName || `project-${Date.now()}`,
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to generate code')
        }

        setGeneratedCode(data.code)
        setUploading(false)
        setGenerating(false)
        
        // Refresh page to show new project
        window.location.reload()
      }

      reader.onerror = () => {
        throw new Error('Failed to read file')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setUploading(false)
      setGenerating(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadCode = () => {
    const extension = selectedFramework === 'react' ? 'tsx' : selectedFramework === 'vue' ? 'vue' : 'html'
    const blob = new Blob([generatedCode], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `component.${extension}`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Code className="w-8 h-8 text-purple-600" />
            <span className="text-xl font-bold">Screenshot to Code</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-medium">
              {user.credits} credits
            </div>
            <UserButton />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Upload Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-600" />
              Create New Project
            </h2>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-red-700">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Name (optional)
                </label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="My awesome UI"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  disabled={generating}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Framework
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['react', 'html', 'vue'] as const).map((fw) => (
                    <button
                      key={fw}
                      onClick={() => setSelectedFramework(fw)}
                      disabled={generating}
                      className={`px-4 py-3 rounded-lg border-2 font-medium transition ${
                        selectedFramework === fw
                          ? 'border-purple-600 bg-purple-50 text-purple-700'
                          : 'border-gray-200 hover:border-purple-300'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {fw.charAt(0).toUpperCase() + fw.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <label className={`
              block w-full p-12 border-2 border-dashed rounded-xl text-center cursor-pointer
              transition-colors
              ${generating ? 'border-gray-300 bg-gray-50 cursor-not-allowed' : 'border-purple-300 hover:border-purple-500 hover:bg-purple-50'}
            `}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={generating}
              />
              {generating ? (
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
                  <p className="text-lg font-medium text-gray-700">Generating your code...</p>
                  <p className="text-sm text-gray-500">This usually takes 15-30 seconds</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <Upload className="w-12 h-12 text-purple-600" />
                  <p className="text-lg font-medium text-gray-700">Upload screenshot or design</p>
                  <p className="text-sm text-gray-500">PNG, JPG, or WEBP up to 10MB</p>
                </div>
              )}
            </label>
          </div>

          {/* Generated Code Preview */}
          {generatedCode && (
            <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <FileCode className="w-5 h-5 text-purple-600" />
                  Generated Code
                </h3>
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
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{generatedCode}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Projects List */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Your Projects</h2>
          {projects.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <Code className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No projects yet. Upload your first screenshot above!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/dashboard/project/${project.id}`}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition group"
                >
                  <div className="aspect-video bg-gray-100 relative overflow-hidden">
                    <img
                      src={project.imageUrl}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1 truncate">{project.name}</h3>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="capitalize">{project.framework}</span>
                      <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
