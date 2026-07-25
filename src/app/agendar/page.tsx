import { prisma } from "@/lib/prisma";
import BookingForm from "@/components/BookingForm";

export const revalidate = 0; // Ensures fresh data for services

export default async function AgendarPage() {
  const services = await prisma.service.findMany({
    orderBy: { price: 'asc' }
  });

  return (
    <main>
      <BookingForm services={services} />
    </main>
  );
}
