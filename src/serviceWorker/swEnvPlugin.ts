import { Plugin } from 'vite';

function swEnvPlugin(): Plugin {
  return {
    name: 'sw-env',
    transform(code, id) {
      if (id.endsWith('public/firebase-messaging-sw.js')) {
        return code.replace(/process\.env\.(\w+)/g, (_, key) =>
          JSON.stringify(process.env[key])
        );
      }
      return code;
    },
  };
}

export default swEnvPlugin;
