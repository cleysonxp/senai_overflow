//timestamp coloca created_at e update_at nas tabelas
//underscored

module.exports = {
    dialect : "mysql",
    host: "localhost",
    username: "root",
    password: "bcd127",
    database: "senai_overflow",
    define:{
        timestamp: true,
        underscored: true,
    }
};
