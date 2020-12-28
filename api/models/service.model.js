module.exports = function(sequelize, DataTypes) {
  const ServiceSchema = sequelize.define(
    'Service',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Service name is required.' },
          notEmpty: { msg: 'Service name is required.' }
        }
      },
      owner: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Service owner is required.' },
          notEmpty: { msg: 'Service owner is required.' }
        }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: 'Service description is required.' },
          notEmpty: { msg: 'Service description is required.' }
        }
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    },
    {
      timestamps: true
    }
  )
  return ServiceSchema
}
