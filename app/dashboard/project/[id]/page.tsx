import { currentUser } from '@clerk/nextjs/server'
import { notFound, redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import ProjectClient from './ProjectClient'

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const user = await currentUser()
  
  if (!user) {
    redirect('/sign-in')
  }

  const dbUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
  })

  if (!dbUser) {
    redirect('/sign-in')
  }

  const project = await prisma.project.findFirst({
    where: {
      id: params.id,
      userId: dbUser.id,
    },
  })

  if (!project) {
    notFound()
  }

  return <ProjectClient project={project} />
}
