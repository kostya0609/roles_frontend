import { DynamicRoleRepository } from './DynamicRoleRepository';
import { useRepoDecorator } from '@/plugins/roles/shared/utils/useRepoDecorator.js';

export const useDynamicRoleRepo = () => useRepoDecorator(DynamicRoleRepository);
