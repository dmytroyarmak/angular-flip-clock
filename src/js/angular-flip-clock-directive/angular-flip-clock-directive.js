angular.module('dyFlipClock.dyFlipClockDirective', [
    'dyFlipClock.dyFlipClockNumberDirective',
    'dyFlipClock.dyFlipClockLabelDirective'
  ])
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
    templateUrl: 'src/js/angular-flip-clock-directive/angular-flip-clock-directive.html'
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
