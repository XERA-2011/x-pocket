import { defineConfig } from 'checkly';
import { EmailAlertChannel, Frequency } from 'checkly/constructs';

const sendDefaults = {
  sendFailure: true,
  sendRecovery: true,
  sendDegraded: true,
};

// FIXME: Add your production URL
const productionURL = 'https://x-pocket.vercel.app';

const emailChannel = new EmailAlertChannel('email-channel-1', {
  // FIXME: add your own email address, Checkly will send you an email notification if a check fails
  address: 'contact@creativedesignsguru.com',
  ...sendDefaults,
});

export const config = defineConfig({
  // FIXME: Add your own project name, logical ID, and repository URL
  projectName: 'x-pocket',
  logicalId: 'x-pocket',
  repoUrl: 'https://github.com/XERA-2011/x-pocket',
  checks: {
    locations: ['us-east-1', 'eu-west-1'],
    tags: ['website'],
    runtimeId: '2024.02',
    browserChecks: {
      frequency: Frequency.EVERY_24H,
      testMatch: '**/tests/e2e/**/*.check.e2e.ts',
      alertChannels: [emailChannel],
    },
    playwrightConfig: {
      use: {
        baseURL: process.env.ENVIRONMENT_URL || productionURL,
        extraHTTPHeaders: {
          'x-vercel-protection-bypass': process.env.VERCEL_BYPASS_TOKEN,
        },
      },
    },
  },
  cli: {
    runLocation: 'us-east-1',
    reporters: ['list'],
  },
});

export default config;
