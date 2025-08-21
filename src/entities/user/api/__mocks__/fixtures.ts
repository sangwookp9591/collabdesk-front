import { faker } from '@faker-js/faker';

export const createMockUser = (overrides = {}) => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  profileImgUrl: faker.image.avatar(),
  createdAt: faker.date.recent().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
  ...overrides,
});

export const mockUsers = Array.from({ length: 10 }, () => createMockUser());
