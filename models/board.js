module.exports = function (sequelize, DataTypes) {
  const board = sequelize.define('Board', {
	  subject: {
		  field: 'subject', 
		  type: DataTypes.STRING(30), 
		  allowNull: false 
	  },
	  content: {
		  field: 'content', 
		  type: DataTypes.STRING(100), 
		  allowNull: false 
	  },
	  count:{
		  field:'count',
		  type:DataTypes.INTEGER,
		  allowNull:false,
		  defaultValue:0
	  }
  }, {
    // don't use camelcase for automatically added attributes but underscore style
    // so updatedAt will be updated_a
	charset: 'utf8',
	collate: 'utf8_unicode_ci',
    underscored: true,

    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,

    // define the table's name
    tableName: 'board'
  });
	return board;
};
