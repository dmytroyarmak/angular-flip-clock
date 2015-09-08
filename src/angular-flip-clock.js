(function(window, document, undefined) {
  'use strict';

  angular.module('dyFlipClock', []);

  angular.module('dyFlipClock')
    .directive('dyFlipClock', dyFlipClockDirective)
    .controller('DyFlipClockController', DyFlipClockController);

  dyFlipClockDirective.$inject = [];
  function dyFlipClockDirective() {
    return {
      restrict: 'EA',
      scope: {
        time: '='
      },
      bindToController: true,
      controller: 'DyFlipClockController',
      controllerAs: 'vm',
      templateUrl: '/src/angular-flip-clock.html'
    };
  }

  DyFlipClockController.$inject = ['$interval'];
  function DyFlipClockController($interval) {
    var MILISECONDS_IN_SECOND = 1000;
    var MILISECONDS_IN_MINUTE = MILISECONDS_IN_SECOND * 60;
    var MILISECONDS_IN_HOUR = MILISECONDS_IN_MINUTE * 60;
    var MILISECONDS_IN_24_HOURS = MILISECONDS_IN_HOUR * 24;

    var vm = this;

    vm.time = 0;

    vm.getHoursTensPlace = getHoursTensPlace;
    vm.getHoursOnesPlace = getHoursOnesPlace;
    vm.getMinutesTensPlace = getMinutesTensPlace;
    vm.getMinutesOnesPlace = getMinutesOnesPlace;
    vm.getSecondsTensPlace = getSecondsTensPlace;
    vm.getSecondsOnesPlace = getSecondsOnesPlace;

    //////////

    function getHoursTensPlace() {
      return _getTensPlace(_getHours(vm.time));
    }

    function getHoursOnesPlace() {
      return _getOnesPlace(_getHours(vm.time));
    }

    function getMinutesTensPlace() {
      return _getTensPlace(_getMinutes(vm.time));
    }

    function getMinutesOnesPlace() {
      return _getOnesPlace(_getMinutes(vm.time));
    }

    function getSecondsTensPlace() {
      return _getTensPlace(_getSeconds(vm.time));
    }

    function getSecondsOnesPlace() {
      return _getOnesPlace(_getSeconds(vm.time));
    }

    function _getHours(time) {
      return Math.floor((time % MILISECONDS_IN_24_HOURS - _getMinutes(time)) / MILISECONDS_IN_HOUR);
    }

    function _getMinutes(time) {
      return Math.floor((time % MILISECONDS_IN_HOUR - _getSeconds(time)) / MILISECONDS_IN_MINUTE);
    }

    function _getSeconds(time) {
      return Math.floor((time % MILISECONDS_IN_MINUTE - _getMiliseconds(time)) / MILISECONDS_IN_SECOND);
    }

    function _getMiliseconds(time) {
      return Math.floor(time % MILISECONDS_IN_SECOND);
    }

    function _getTensPlace(number) {
      return (number % 100 - _getOnesPlace(number)) / 10;
    }

    function _getOnesPlace(number) {
      return number % 10;
    }
  }

  angular.module('dyFlipClock')
    .directive('dyFlipClockNumber', dyFlipClockNumberDirective)
    .controller('DyFlipClockNumberController', DyFlipClockNumberController);

  dyFlipClockNumberDirective.$inject = [];
  function dyFlipClockNumberDirective() {
    return {
      restrict: 'EA',
      scope: {
        // value: '@'
      },
      bindToController: true,
      controllerAs: 'vm',
      controller: 'DyFlipClockNumberController',
      templateUrl: '/src/angular-flip-clock-number.html'
    };
  }

  DyFlipClockNumberController.$inject = ['$scope', '$parse', '$attrs'];
  function DyFlipClockNumberController($scope, $parse, $attrs) {
        var vm = this;

        vm.numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        vm.currentValue = 0;
        vm.previousValue = 0;

        vm.isActive = isActive;
        vm.isBefore = isBefore;
        vm.isAnimated = isAnimated;

        activate();

        //////////

        function activate() {
          $scope.$watch(function getValueFromParentScope() {
            return $parse($attrs.value)($scope.$parent);
          }, function onValueChanged(newValue, oldValue) {
            vm.currentValue = newValue;
            vm.previousValue = oldValue;
          });
        }

        function isActive(number) {
          return vm.currentValue === number;
        }

        function isBefore(number) {
          return vm.previousValue !== vm.currentValue && number === vm.previousValue;
        }

        function isAnimated() {
          return vm.previousValue !== vm.currentValue;
        }
      }

  angular.module('dyFlipClock')
    .directive('dyFlipClockDivider', dyFlipClockDividerDirective)
    .controller('DyFlipClockDividerController', DyFlipClockDividerController);

  dyFlipClockDividerDirective.$inject = [];
  function dyFlipClockDividerDirective() {
    return {
      restrict: 'EA',
      scope: {
        label: '@'
      },
      bindToController: true,
      controller: 'DyFlipClockDividerController',
      controllerAs: 'vm',
      templateUrl: '/src/angular-flip-clock-divider.html'
    };
  }

  DyFlipClockDividerController.$inject = [];
  function DyFlipClockDividerController() {
  }

})(window, document);
