
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: "Buddy",
        password: "I am light as a feathernp."},
        {username: "Paris",
        password: "I am a fashion icon."},
      ]);
    });
};
