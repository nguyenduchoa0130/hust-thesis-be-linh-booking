module.exports = {
  async up(db, client) {
    const roles = await db.collection('roles').find().toArray();
    const userPayloads = roles.reduce((payloads, role) => {
      if (role.name !== 'customer') {
        payloads.push({
          email: `${role.name}@gmail.com`,
          password: '$2a$10$your..................Hwj8I/FsNWM3gwxiVJ405/HISQLXWN6', // 1->6
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
