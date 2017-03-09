import { api } from 'dvax-ast';
import upperCamelCase from 'simple-uppercamelcase';
import { basename, dirname, join } from 'path';
import { statSync, readFileSync } from 'fs';
import pathExists from 'path-exists';
import leftPad from 'left-pad';
import chalk from 'chalk';
import _ from 'lodash';

function info(type, message) {
  console.log(`${chalk.green.bold(leftPad(type, 12))}  ${message}`);
}

function error(message) {
  console.error(chalk.red(message));
}

function getBabelRc(cwd) {
  const rcPath = join(cwd, '.dvarc');
  if (pathExists.sync(rcPath)) {
    return JSON.parse(readFileSync(rcPath, 'utf-8'));
  } else {
    return {};
  }
}

function generate(program, { cwd }) {
  const defaultBase = 'src';
  const rc = getBabelRc(cwd);
  const base = program.base || rc.base || defaultBase;
  const defaultEntry = `${base}/index.js`;
  const defaultRouter = `${base}/router.js`;

  const [type, name] = program.args;

  try {
    switch (type) {
      case 'model':
        (() => {
          const modelPath = `./models/${name}`;
          const filePath = `${base}/models/${name}.js`;
          const entry = program.entry || defaultEntry;
          info('create', `model ${name}`);
          info('register', `to entry ${entry}`);
          api('models.create', {
            namespace: _.camelCase(name),
            sourcePath: cwd,
            filePath,
            entry,
            modelPath,
          });
        })();
        break;
      case 'route':
        (() => {
          const componentName = upperCamelCase(name);
          const componentPath = `${base}/routes/${componentName}.js`;
          const componentCSSPath = `${base}/routes/${componentName}.css`;
          info('create', `routeComponent ${componentPath}`);
          api('routeComponents.create', {
            sourcePath: cwd,
            filePath: componentPath,
            componentName,
            state: program.state,
          });
        })();
        break;
      case 'comp':
        (() => {
          const fileName = basename(name);
          const fileDir = dirname(name);
          const componentName = upperCamelCase(fileName);
          const filePath = join(`${base}/components`, fileDir, `${componentName}.js`);
          info('create', `component ${filePath}`);
          api('components.create', {
            sourcePath: cwd,
            filePath,
            componentName,
            state: program.state,
          });
        })();
        break;
      case 'module':
        (() => {
          const arr = name.split('/')
          const namespace = _.takeRight(arr).join()

          //model
          const modelPath = `./models/${name}`;
          const filePath = `${base}/models/${name}.js`;
          const starsPath = _.times(arr.length, () => '../').join('')

          info('create', `model ${name} namespace ${namespace}`);
          api('models.create', {
            namespace: namespace,
            service: name,
            pathname: name,
            starsPath: starsPath,
            sourcePath: cwd,
            filePath,
            modelPath,
          });

          //service
          const servicePath = `./services/${name}`;
          const serviceFilePath = `${base}/services/${name}.js`;
          info('create', `service ${name}`);
          api('services.create', {
            serviceName: name,
            sourcePath: cwd,
            filePath: serviceFilePath,
            path: servicePath,
          });

          //route
          const componentName = _.upperFirst(namespace)
          arr[arr.length-1] = componentName
          const pathName = _.join(arr, '/')

          const componentPath = `${base}/routes/${pathName}.js`;
          info('create', `routeComponent ${componentPath}`);
          api('routeComponents.create', {
            sourcePath: cwd,
            filePath: componentPath,
            componentName,
            namespace: namespace,
            state: program.state,
          });

          info('finshed', `copy 'genRoute(app, '${name}', require('./models/${name}'), require('./routes/${pathName}')),' to router.js `);
        })();
        break;
      default:
        error(`ERROR: uncaught type ${type}`);
        break;
    }
  } catch (e) {
    error(e.stack);
  }
}

export default generate;
