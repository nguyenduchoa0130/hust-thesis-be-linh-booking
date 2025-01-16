module.exports = {
  async up(db, client) {
    const roles = await db.collection('roles').find().toArray();
    const userPayloads = roles.reduce((payloads, role) => {
      if (role.name !== 'customer') {
        payloads.push({
          email: `${role.name}@gmail.com`,
          password: '$2b$10$nZ/.mZ7JHwXT9J.R.xMh2eP3qPM7mD/684SyWuRh0zcMqNWnurRLe', // 1->6
          fullName: role.displayName,
          phone: role._id,
          role: role._id,
        });
      }
      return payloads;
    }, []);
    return db.collection('users').insertMany(userPayloads);
  },

  async down(db, client) {},
};
