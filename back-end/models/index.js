const config = require("../config/db.config");
const fs = require("fs");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,
    logging: false,
    pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle,
    },
    define: {
        freezeTableName: true,
    },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

fs.readdirSync(__dirname)
    .filter((file) => {
        return (
            file.indexOf(".") !== 0 &&
            file !== "index.js" &&
            file.slice(-3) === ".js"
        );
    })
    .forEach((file) => {
        const model = require(`${__dirname}/${file}`)(sequelize, Sequelize);
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

async function sync() {
    try {
        await sequelize.authenticate();
        console.warn(`✅ Conectado ao ${config.dialect.toUpperCase()}`);

        await sequelize.sync();
        console.warn(`✅ Banco sincronizado`);

        const seeders = fs.readdirSync("./seeders");
        seeders.forEach((file) => {
            require(`../seeders/${file}`).up(sequelize.getQueryInterface());
        });
    } catch (err) {
        console.error("❌ Erro " + config?.dialect + "\n", err);
    }
}

sync();

module.exports = db;
