import { prisma } from "@/lib/prisma"
import PortfolioPage from "@/components/PortfolioPage"

export default async function Home() {
  const services = await prisma.service.findMany({
    orderBy: { createdAt: 'asc' }
  })

  return <PortfolioPage services={services} />
}
