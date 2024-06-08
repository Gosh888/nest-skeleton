import { DocumentBuilder } from '@nestjs/swagger';
import { SWAGGER_CONSTANT } from '../constants/comon.constant';

export const getSwaggerConfig = () =>
  new DocumentBuilder()
    .setTitle(SWAGGER_CONSTANT.TITLE)
    .setDescription(SWAGGER_CONSTANT.DESCRIPTION)
    .setVersion(SWAGGER_CONSTANT.VERSION)
    .addBearerAuth() // Add JWT authentication if used
    .build();
