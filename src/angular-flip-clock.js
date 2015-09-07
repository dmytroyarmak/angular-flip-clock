(function(window, document, undefined) {
  'use strict';

  angular
    .module('dyFlipClock', [])
    .directive('dyFlipClock', dyFlipClockDirective);

    dyFlipClockDirective.$inject = [];
    function dyFlipClockDirective() {
      return {
        restrict: 'EA',
        templateUrl: '/src/angular-flip-clock.html'
      };
    }
})(window, document);
