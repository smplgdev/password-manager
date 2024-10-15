import { atom } from 'recoil';
import { loadState } from '../services/localStorageService';

export const userState = atom({
  key: 'userState',
  default: loadState('userState') || null,
});
