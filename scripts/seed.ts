const { PrismaClient } = require('@prisma/client')

async function cat() {
  const db = new PrismaClient()

  try {
    await db.$connect()

    // check if categories exists before creating any
    const existingCat = await db.category.findMany()

    if (existingCat.length === 0) {
      await db.category.createMany({
        data: [
          { name: 'Men' },
          { name: 'Women' },
          { name: 'Footwear' },
          { name: 'Accessories' },
          { name: 'Sportwear' },
          { name: 'Kids' },
        ],
      })
      console.log('Category seeding success')
    } else {
      console.log('Categories already exist, skipping seeding')
    }
  } catch (error) {
    console.error('Error seeding the categories', error)
  } finally {
    await db.$disconnect()
  }
}

async function main() {
  await cat()
}

main()
