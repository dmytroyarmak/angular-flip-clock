angular.module('dyFlipClock.dyFlipClockLabelDirective', [])
  .directive('dyFlipClockLabel', dyFlipClockLabelDirective)
  .controller('DyFlipClockLabelController', DyFlipClockLabelController);

dyFlipClockLabelDirective.$inject = [];
function dyFlipClockLabelDirective() {
  return {
    restrict: 'EA',
    scope: {
      text: '@',
      hideDivider: '='
    },
    bindToController: true,
    controller: 'DyFlipClockLabelController',
    controllerAs: 'vm',
    templateUrl: 'src/js/angular-flip-clock-label-directive/angular-flip-clock-label-directive.html'
  };
}

DyFlipClockLabelController.$inject = [];
function DyFlipClockLabelController() {
}
