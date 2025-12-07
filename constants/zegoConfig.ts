export const zegoConfig = {
  appID: process.env.EXPO_PUBLIC_ZEGO_APP_ID ? parseInt(process.env.EXPO_PUBLIC_ZEGO_APP_ID, 10) : 1005541882,
  appSign: process.env.EXPO_PUBLIC_ZEGO_APP_SIGN || '1f7523dd819129317ebbb4eb4aaa248127a9c11f0507b300a9150e2e0e848a0e',
  server: process.env.EXPO_PUBLIC_ZEGO_SERVER || 'wss://webliveroom1005541882-api.coolzcloud.com/ws',
};
