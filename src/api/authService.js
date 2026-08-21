import httpClient from './httpClient';
import { DEMO_CREDENTIALS, DEMO_OTP } from '@/data/mock/user';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function mockResponse(data, ms = 900) {
  return delay(ms).then(() => ({ data }));
}

export const authService = {
  async login(credentials) {
    if (import.meta.env.DEV) {
      const valid =
        credentials.phone === DEMO_CREDENTIALS.phone &&
        credentials.password === DEMO_CREDENTIALS.password;
      if (!valid) {
        throw new Error('Invalid phone number or password.');
      }
      return mockResponse({
        accessToken: 'demo-access-token-ks-2026',
        refreshToken: 'demo-refresh-token-ks-2026',
        user: DEMO_CREDENTIALS,
      });
    }
    const { data } = await httpClient.post('/auth/login', credentials);
    return data;
  },

  async register(payload) {
    if (import.meta.env.DEV) {
      return mockResponse({ message: 'OTP sent to your mobile number.' });
    }
    const { data } = await httpClient.post('/auth/register', payload);
    return data;
  },

  async verifyOtp(payload) {
    if (import.meta.env.DEV) {
      if (payload.otp !== DEMO_OTP) {
        throw new Error('Invalid OTP. Hint: use 1234 in demo mode.');
      }
      return mockResponse({
        accessToken: 'demo-access-token-ks-2026',
        refreshToken: 'demo-refresh-token-ks-2026',
        user: DEMO_CREDENTIALS,
      }, 1100);
    }
    const { data } = await httpClient.post('/auth/verify-otp', payload);
    return data;
  },

  async resendOtp(payload) {
    if (import.meta.env.DEV) {
      return mockResponse({ message: 'OTP resent successfully.' }, 700);
    }
    const { data } = await httpClient.post('/auth/resend-otp', payload);
    return data;
  },

  async forgotPassword(payload) {
    if (import.meta.env.DEV) {
      return mockResponse({ message: 'Reset link sent to your email.' }, 800);
    }
    const { data } = await httpClient.post('/auth/forgot-password', payload);
    return data;
  },

  async resetPassword(payload) {
    if (import.meta.env.DEV) {
      return mockResponse({ message: 'Password updated successfully.' }, 800);
    }
    const { data } = await httpClient.post('/auth/reset-password', payload);
    return data;
  },

  async logout() {
    if (import.meta.env.DEV) {
      return mockResponse({ message: 'Logged out.' }, 300);
    }
    const { data } = await httpClient.post('/auth/logout');
    return data;
  },
};

export default authService;
