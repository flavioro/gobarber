module.exports = {
  up: (queryInterface, Sequelize) => {
    // table that will be added, followed by the column name
    return queryInterface.addColumn('users', 'avatar_id', {
      type: Sequelize.INTEGER,
      // table referenced with the respective field
      references: { model: 'files', key: 'id' },
      onUpdate: 'CASCADE',
      OnDelete: 'SET NULL',
      allowNull: true
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'avatar_id');
  }
};
