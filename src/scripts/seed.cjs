const { db } = require('@vercel/postgres');

async function CreateTableUsers(client) {
  try {

    // Create the "users" table if it doesn't exist
    await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        acess_profile INTEGER REFERENCES type_acess_profile(id)
      );
    `;
    
    console.log(`Created "user" table`);
  
  } catch (error) {
    console.error('Error seeding user:', error);
    throw error;
  }
}

async function CreateTableTypeAcessProfile(client) {
  try {

    // Create the "users" table if it doesn't exist
    await client.sql`
      CREATE TABLE IF NOT EXISTS type_acess_profile (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "type_acess_profile" table`);
  
  } catch (error) {
    console.error('Error seeding type_acess_profile:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await CreateTableUsers(client);
  await CreateTableTypeAcessProfile(client);
 
  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
