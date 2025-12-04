export const ZEGO_CONFIG = {
  appID: process.env.EXPO_PUBLIC_ZEGO_APP_ID || 'YOUR_APP_ID',
  appSign: process.env.EXPO_PUBLIC_ZEGO_APP_SIGN || 'YOUR_APP_SIGN',
  serverSecret: process.env.EXPO_PUBLIC_ZEGO_SERVER_SECRET || 'YOUR_SERVER_SECRET'
};

export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.example.com';