
// generate by ./scripts/generateEnvTypes.ts
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_NAME: 'Web-Spider';
      APP_PORT: '7001';
      APP_BASE_URL: 'http://localhost:${APP_PORT}';
      APP_LOCALE: 'en-EN';
      PROJECT_DIR: '/web Spider';
      MULTI_DEVICE_LOGIN: 'true';
      LOGGER_LEVEL: 'debug';
      LOGGER_MAX_FILES: '31';
      TZ: 'Europe/Zurich';
      JWT_SECRET: 'admin!@';
      JWT_EXPIRE: '86400';
      REFRESH_TOKEN_SECRET: 'admin!@';
      REFRESH_TOKEN_EXPIRE: '2592000';
      SWAGGER_ENABLE: 'true';
      SWAGGER_PATH: 'api-docs';
      SWAGGER_VERSION: '1.0';
      REDIS_PORT: '19472';
      REDIS_HOST: 'redis-19472.c328.europe-west3-1.gce.cloud.redislabs.com';
      REDIS_PASSWORD: 'KL2Gg9oJ0vmdhD548lngwSOs4N9UnWoZ';
      REDIS_DB: '0';
      IS_DEMO: 'true';
    }
  }
}
export {};
  