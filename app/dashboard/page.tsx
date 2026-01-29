import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import DashboardClient from './DashboardClient'

export default async function DashboardPage() {
  const user = await currentUser()
  
  if (!user) {
    redirect('/sign-in')
  }

  // Get or create user in database
  let dbUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
  })

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0]?.emailAddress || '',
        credits: 5,
      },
    })
  }

  // Get user's projects
  const projects = await prisma.project.findMany({
    where: { userId: dbUser.id },
    orderBy: { createdAt: 'desc' },
  })

  return <DashboardClient user={dbUser} projects={projects} />
}
