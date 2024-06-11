import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Inject, Injectable } from '@nestjs/common';

export const cacheDuration = {
  TTL_MINUTES: 60,
  TTL_HOURS: 3600,
  TTL_DAYS: 86400,
};

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async set(key: string, value: any, ttl: number = 0): Promise<void> {
    await this.cacheManager.set(key, value, ttl);
  }

  async get<T>(key: string): Promise<T | null> {
    const value = await this.cacheManager.get<T>(key);
    return value ?? null;
  }

  async delete(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }

  async resetAll(): Promise<void> {
    await this.cacheManager.reset();
  }
}
