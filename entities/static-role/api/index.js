import { StaticRoleRepository } from './StaticRoleRepository.js';
import { useRepoDecorator } from '@/plugins/roles/shared/utils/useRepoDecorator.js';

export const useStaticRoleRepo = () => useRepoDecorator(StaticRoleRepository);