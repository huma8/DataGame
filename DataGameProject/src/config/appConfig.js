// Application Configuration
const appConfig = {
  appName: 'DataGame Production Planner',
  version: '1.0.0',
  apiUrl: process.env.REACT_APP_API_URL || '/api',
  productionDataFile: '/malzemeler.txt',
  defaultQuantity: 1,
  easterEggMessages: [
    "Miss me?",
    "Still here?",
    "Come back soon!",
    "Where did you go?",
    "Don't leave me!",
    "Please return!",
    "Can't live without you",
    "Hurry back!",
    "Time is ticking...",
    "Still producing?",
    "Don't forget me!",
    "Waiting for you...",
    "Come back!",
    "Don't abandon me!",
    "I miss you!",
    "Return to production!",
    "Still here!",
    "Miss you...",
    "Where are you?",
    "Come back to me!"
  ]
};

export default appConfig;