import { AuthSteps } from 'types/AuthSteps';

const getStoredAuthStep = () => {
  return (localStorage.getItem('step') as AuthSteps) || 'Step 1/3';
};

export default getStoredAuthStep;
