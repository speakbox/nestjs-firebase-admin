import { Test, TestingModule } from '@nestjs/testing';
import { FirebaseService } from './firebase.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FirebaseModule } from './firebase.module';

/**
 * @NOTE
 * The order of the tests in this file is important for some reason 🤷🏻‍
 * Keep development block before production/staging block
 */
describe('FirebaseService', () => {
  describe('development', () => {
    let service: FirebaseService;
    let configService: ConfigService;
    const mockConfig = {
      get: jest.fn((key: string) => {
        if (key === 'APP_ENV') {
          return 'development';
        }

        return 'key';
      }),
    };

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        imports: [FirebaseModule, ConfigModule],
        providers: [FirebaseService, ConfigService],
      })
        .overrideProvider(ConfigService)
        .useValue(mockConfig)
        .compile();

      service = module.get<FirebaseService>(FirebaseService);
      configService = module.get<ConfigService>(ConfigService);
    });

    it('should be defined', () => {
      expect(mockConfig.get).toHaveBeenCalled();
      expect(service).toBeDefined();
      expect(service.auth).toBeDefined();
      expect(service.firestore).toBeDefined();
      expect(service.storage).toBeDefined();
    });
  });
  describe('production/staging', () => {
    let service: FirebaseService;
    let configService: ConfigService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        imports: [FirebaseModule, ConfigModule],
        providers: [FirebaseService, ConfigService],
      }).compile();

      service = module.get<FirebaseService>(FirebaseService);
      configService = module.get<ConfigService>(ConfigService);
    });

    it('should be defined', () => {
      expect(service).toBeDefined();
      expect(service.auth).toBeDefined();
      expect(service.firestore).toBeDefined();
      expect(service.storage).toBeDefined();
    });
  });
});
