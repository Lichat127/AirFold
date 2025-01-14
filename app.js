const { initializeDatabase } = require("./src/config/db");
    
(async () => {
    await initializeDatabase();
})();