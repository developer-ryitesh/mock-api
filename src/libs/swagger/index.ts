import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import type { Express } from "express";
import path from "path";
import CONFIG from "../../config";

const swaggerDocument = YAML.load(path.resolve(__dirname, "../../../docs/swagger.yaml"));
swaggerDocument.servers = [
    { url: CONFIG.HAS_PROD ? CONFIG.SERVER_URL + "/api/v1" : CONFIG.DEV_URL + "/api/v1" },//
]
function swaggerSetup(app: Express) {
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

export { swaggerSetup }