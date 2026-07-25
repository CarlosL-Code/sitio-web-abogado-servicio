const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // Create test settings
  const settings = await prisma.settings.create({
    data: {
      dailyLimit: 4
    }
  })

  console.log('Settings created:', settings)

  // Create some default services
  const services = await Promise.all([
    prisma.service.create({
      data: {
        name: 'Asesoría Familiar Inicial',
        description: 'Evaluación de tu caso en materia de familia (divorcio, alimentos, cuidado personal). Incluye revisión de antecedentes.',
        price: 'Desde $30.000',
      }
    }),
    prisma.service.create({
      data: {
        name: 'Representación en Juicio',
        description: 'Defensa integral en tribunales de familia con estrategia personalizada y acompañamiento constante.',
        price: 'Previo presupuesto',
      }
    }),
    prisma.service.create({
      data: {
        name: 'Mediación Familiar',
        description: 'Servicio de asistencia legal en procesos de mediación obligatoria y voluntaria.',
        price: '$50.000 por sesión',
      }
    })
  ])

  console.log('Services created:', services.length)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
