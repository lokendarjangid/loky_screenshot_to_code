import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { generateCodeFromImage } from '@/lib/openai'

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user from database
    const dbUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
    })

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    if (dbUser.credits <= 0) {
      return NextResponse.json(
        { error: 'No credits remaining. Please upgrade your plan.' },
        { status: 403 }
      )
    }

    const body = await req.json()
    const { image, framework, projectName } = body

    if (!image || !framework) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate code using OpenAI Vision
    const generatedCode = await generateCodeFromImage(image, framework)

    // Save project to database
    const project = await prisma.project.create({
      data: {
        name: projectName || `Project ${new Date().toLocaleDateString()}`,
        imageUrl: image,
        generatedCode,
        framework,
        userId: dbUser.id,
      },
    })

    // Deduct credit
    await prisma.user.update({
      where: { id: dbUser.id },
      data: { credits: dbUser.credits - 1 },
    })

    return NextResponse.json({
      success: true,
      code: generatedCode,
      projectId: project.id,
    })
  } catch (error) {
    console.error('Generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate code. Please try again.' },
      { status: 500 }
    )
  }
}
