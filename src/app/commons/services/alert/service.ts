export default function($window: ng.IWindowService) {
  'ngInject';

  return function(message) {
    return $window.alert(message);
  };

}
