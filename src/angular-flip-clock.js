(function(window, document, undefined) {
  'use strict';

  angular.module('dyFlipClock', []);

  angular.module('dyFlipClock')
    .directive('dyFlipClock', dyFlipClockDirective);

  dyFlipClockDirective.$inject = [];
  function dyFlipClockDirective() {
    return {
      restrict: 'EA',
      scope: {
      },
      bindToController: true,
      controllerAs: 'vm',
      controller: function($interval) {
        var vm = this;
        vm.seconds = 0;

        $interval(function() {
          vm.seconds += 1;
        }, 1000);
      },
      templateUrl: '/src/angular-flip-clock.html'
    };
  }

  angular.module('dyFlipClock')
    .directive('dyFlipClockNumber', dyFlipClockNumberDirective);

  dyFlipClockNumberDirective.$inject = [];
  function dyFlipClockNumberDirective() {
    return {
      restrict: 'EA',
      scope: {
        // value: '@'
      },
      bindToController: true,
      controllerAs: 'vm',
      controller: function($scope, $parse, $attrs) {
        var vm = this;

        vm.numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        vm.currentValue = null;
        vm.previousValue = null;

        $scope.$watch(function() {
          return $parse($attrs.value)($scope.$parent);
        }, function(newValue, oldValue) {
          vm.currentValue = newValue;
          vm.previousValue = oldValue;
        });
      },
      templateUrl: '/src/angular-flip-clock-number.html'
    };
  }

  angular.module('dyFlipClock')
    .directive('dyFlipClockDivider', dyFlipClockDividerDirective);

  dyFlipClockDividerDirective.$inject = [];
  function dyFlipClockDividerDirective() {
    return {
      restrict: 'EA',
      scope: {
        label: '@'
      },
      bindToController: true,
      controllerAs: 'vm',
      controller: angular.noop,
      templateUrl: '/src/angular-flip-clock-divider.html'
    };
  }
})(window, document);
