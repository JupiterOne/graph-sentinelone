import { accountSteps } from './account';
import { agentSteps } from './agents';

const integrationSteps = [...accountSteps, ...agentSteps];

export { integrationSteps };
