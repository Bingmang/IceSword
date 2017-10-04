module.exports = {
  items: [
    {
      name: process.env.ADMIN || 'admin',
      password: process.env.PASSWORD || '123456',
    },
  ],
}
