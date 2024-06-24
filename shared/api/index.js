export {BaseRepository} from './BaseRepository';
import {UserRepository} from './UserRepository';
import { useRepoDecorator } from '@/plugins/roles/shared/utils/useRepoDecorator.js';

export const useUserRepo = () => useRepoDecorator(UserRepository);
