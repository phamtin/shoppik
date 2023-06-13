import makeStoreService from './store/store.service';
import makeAuthService from './auth/auth.service';

export const storeService = makeStoreService();
export const authService = makeAuthService();
