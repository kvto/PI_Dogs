const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', { //raza
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: { //peso
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight: { //altura
      type: DataTypes.STRING,
      allowNull: false
    },
    life_span: {
      type: DataTypes.STRING,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // created :{
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: true,
    //   allowNull: true,
    // },
  },
  {
    timestamps: false,
    createdAt: false,    
  })
};
