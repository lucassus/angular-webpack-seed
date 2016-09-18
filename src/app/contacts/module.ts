import * as angular from 'angular';
import * as angularMessages from 'angular-messages';
import * as angularResource from 'angular-resource';
import appCommons from '../commons/module';
import contactFactory from './services/contact_factory';
import contactFormComponent from './components/contact_form_component';
import favouriteButtonComponent from './components/favourite_button_component';
import states from './states/config';
import uiRouter from 'angular-ui-router';

export default angular.module('app.contacts', [
  angularMessages,
  angularResource,
  uiRouter,

  appCommons.name
])
  .factory('Contact', contactFactory)
  .component('contactForm', contactFormComponent)
  .component('favouriteButton', favouriteButtonComponent)
  .config(states);