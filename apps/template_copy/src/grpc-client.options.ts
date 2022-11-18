import { ClientOptions, Transport } from '@nestjs/microservices';

const HeroProtoPath = require.resolve('proto/hero/hero.proto');

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'hero', // ['hero', 'hero2']
    protoPath: [HeroProtoPath], // ['./hero/hero.proto', './hero/hero2.proto'],
    url: `0.0.0.0:3003`,
  },
};
