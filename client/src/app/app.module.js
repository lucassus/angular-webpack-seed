import { anchorScroll, html5Mode, notFoundState, router } from './app.config';
import aboutModule from './about/about.module';
import angularAnimate from 'angular-animate';
import angularLoadingBar from 'angular-loading-bar';
import buildSignature from '../../build_signature_loader!./build_signature.tpl';
import commonsModule from './commons/commons.module';
import contactsModule from './contacts/contacts.module';
import homeModule from './home/home.module';
import resolveFactory from '@uirouter/angularjs/lib/legacy/resolveService';
import uiRouter from '@uirouter/angularjs';

function stateErrorsHandler($log, $rootScope, $state) {
  'ngInject';

  $rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {
    $log.error('$stateChangeError', error);
    $state.go('404');
  });
}

function logBuildSignature($log, appConfig) {
  'ngInject';

  $log.info(buildSignature);
  $log.info(`environment: ${appConfig.environment}`);
}

export default angular.module('app', [
  angularAnimate,
  uiRouter,
  angularLoadingBar,

  aboutModule,
  commonsModule,
  contactsModule,
  homeModule
])
  .config(html5Mode)
  .config(router)
  .config(anchorScroll)
  .config(notFoundState)

  .factory('$resolve', resolveFactory)

  .run(stateErrorsHandler)
  .run(logBuildSignature)

  .name;
