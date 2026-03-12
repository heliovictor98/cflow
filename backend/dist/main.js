"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
function getCorsOrigin() {
    const cors = process.env.CORS_ORIGINS;
    if (cors === '*' || cors === 'true')
        return true;
    if (cors)
        return cors.split(',').map((o) => o.trim());
    return process.env.FRONTEND_URL ?? 'http://localhost:4200';
}
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.enableCors({ origin: getCorsOrigin() });
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map