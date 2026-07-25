import BookingForm from "@/components/BookingForm";

export default function AgendarPage() {
  const services = [
    { id: "1", name: "Evaluación Completa", description: "Estudio detallado de los antecedentes y viabilidad del caso.", price: "$50.000", createdAt: new Date(), updatedAt: new Date() },
    { id: "3", name: "Asesoría en Mediación", description: "Acompañamiento legal durante procesos de mediación.", price: "$80.000", createdAt: new Date(), updatedAt: new Date() },
    { id: "2", name: "Representación en Juicio", description: "Defensa activa y especializada en tribunales de familia.", price: "Desde $300.000", createdAt: new Date(), updatedAt: new Date() }
  ];

  return (
    <main>
      <BookingForm services={services} />
    </main>
  );
}
