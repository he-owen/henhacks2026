const { PrismaClient } = require('../generated/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clear existing data (order matters for FKs)
  await prisma.billHistory.deleteMany();
  await prisma.device.deleteMany();
  await prisma.location.deleteMany();
  await prisma.user.deleteMany();

  // Users (Auth0-style ids)
  const user1 = await prisma.user.create({
    data: {
      id: 'auth0|user001',
      email: 'alice@example.com',
      utilityProv: 'Pacific Gas & Electric',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      id: 'auth0|user002',
      email: 'bob@example.com',
      utilityProv: 'ConEdison',
    },
  });

  const user3 = await prisma.user.create({
    data: {
      id: 'auth0|user003',
      email: 'charlie@example.com',
      utilityProv: null,
    },
  });

  // Locations (multiple per user)
  await prisma.location.createMany({
    data: [
      { userId: user1.id, zip: '94102' },
      { userId: user1.id, zip: '90210' },
      { userId: user2.id, zip: '10001' },
      { userId: user2.id, zip: '10002' },
      { userId: user3.id, zip: '60601' },
    ],
  });

  // Devices
  await prisma.device.createMany({
    data: [
      { userId: user1.id, name: 'Living Room AC', type: 'AC', brand: 'LG', model: 'LP1419IVSM', hourlyEnergy: 1.2, isSmart: true, runDurationMinutes: 480 },
      { userId: user1.id, name: 'Dishwasher', type: 'Appliance', brand: 'Bosch', model: 'SHPM88Z75N', hourlyEnergy: 1.8, isSmart: false, runDurationMinutes: 120 },
      { userId: user2.id, name: 'Fridge', type: 'Appliance', brand: 'Samsung', hourlyEnergy: 0.15, isSmart: true },
      { userId: user2.id, name: 'EV Charger', type: 'EV', brand: 'Tesla', hourlyEnergy: 11.5, isSmart: true, runDurationMinutes: 240 },
      { userId: user3.id, name: 'Water Heater', type: 'Water Heater', brand: 'Rheem', hourlyEnergy: 4.5, isSmart: false },
    ],
  });

  // Bill history
  const now = new Date();
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 15);
  const twoMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 2, 15);

  await prisma.billHistory.createMany({
    data: [
      { userId: user1.id, billTotal: 142.50, createdDate: lastMonth },
      { userId: user1.id, billTotal: 158.20, createdDate: twoMonthsAgo },
      { userId: user2.id, billTotal: 89.00, createdDate: lastMonth },
      { userId: user2.id, billTotal: 95.30, createdDate: twoMonthsAgo },
      { userId: user3.id, billTotal: 67.45, createdDate: lastMonth },
    ],
  });

  console.log('Seed complete: users, locations, devices, bill history.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
