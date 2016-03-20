export * from './utils/task_tools';

export function tsProjectFn(plugins) {
  return plugins.typescript.createProject('tsconfig.json', {
    typescript: require('typescript')
  });
}