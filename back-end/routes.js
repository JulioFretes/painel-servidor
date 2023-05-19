/**
 * @param {import('express').Express} app
 */
module.exports = (app, db) => {
    require("./app/routes/auth.routes")(app);
    require("./app/routes/user.routes")(app);
    require("./app/routes/servidor.routes")(app);
    require("./app/routes/admin.routes")(app);
    app.get("/", (_req, res) => {
        res.json({ message: "Hello world!" });
    });
};
