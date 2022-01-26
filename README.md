<h1 align="center"></h1>

<div align="center">
  <a href="http://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="150" alt="Nest Logo" />
  </a>
</div>

<h3 align="center">NestJS Firebase Admin</h3>

<div align="center">
  <a href="https://nestjs.com" target="_blank">
    <img src="https://img.shields.io/badge/built%20with-NestJs-red.svg" alt="Built with NestJS">
  </a>
</div>

## Installation

```bash
npm install @speakbox/nestjs-firebase-admin
```

## Usage

Import the module and the service in your NestJS application:

```typescript
import { Module } from '@nestjs/common';
import { FirebaseModule, FirebaseService } from '@speakbox/nestjs-firebase-admin';

@Module({
  imports: [FirebaseModule],
  providers: [FirebaseService],
})
export class AppModule {}
```

### Using the service

```typescript
import { Inject, Injectable } from "@nestjs/common";
import { FirebaseService } from '@speakbox/nestjs-firebase-admin';

@Injectable()
export class ExampleService {
  constructor(
    @Inject(FirebaseService) private readonly firebase: FirebaseService,
  ) {}
  
  exampleAuth() {
    return this.firebase.auth.getUser('userId');
  }
  
  exampleFirestore() {
    return this.firebase.firestore.collection('users').get();
  }
  
  exampleStorage() {
    return this.firebase.storage.bucket('bucketName').file('fileName').download();
  }
}
```

For more information on how to use the service, please refer to the [Firebase Admin SDK documentation](https://firebase.google.com/docs/reference/admin) 
or the [NestJS Documentation](https://docs.nestjs.com/providers).

### Using the middleware

```typescript
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { SomeController } from './some.controller';
import { FirebaseModule, FirebaseService, FirebaseMiddleware } from '@speakbox/nestjs-firebase-admin';

@Module({
  imports: [FirebaseModule],
  controllers: [SomeController],
  providers: [FirebaseService, FirebaseMiddleware],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FirebaseModule).forRoutes(SomeController);
  }
}
```

For more information on how to use middlewares, see the [NestJS documentation](https://docs.nestjs.com/middleware).

## Change Log

See [Changelog](CHANGELOG.md) for more information.

## Contributing

Contributions welcome! See [Contributing](CONTRIBUTING.md).

## Author

**Valentin Prugnaud [@valentinprgnd](https://twitter.com/valentinprgnd)**

## License

Licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
