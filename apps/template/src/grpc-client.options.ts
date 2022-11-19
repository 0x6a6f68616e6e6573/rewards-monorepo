import { ClientOptions, Transport } from '@nestjs/microservices';

const HeroProtoPath = require.resolve('proto/src/hero/hero.proto');

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'hero', // ['hero', 'hero2']
    protoPath: [HeroProtoPath], // ['./hero/hero.proto', './hero/hero2.proto']
    url: 'localhost:3003',
  },
};
