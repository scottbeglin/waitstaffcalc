angular.module('myApp', [])

.controller('myCtrl', function ($scope) {

    $scope.numMeals = 0;
    $scope.subTotal = 0;
    $scope.tip = 0;
    $scope.chargesTotal = 0;
    $scope.tipTotal = 0;
    $scope.avgTipMeal = 0;
    $scope.data = {};
    $scope.data.baseMealPrice = 0;
    $scope.data.taxRate = 0;
    $scope.data.tipPercentage = 0;

    /* Submit Meal Details with Submit Button */
    $scope.doSubmit = function () {
        //Customer Charges
        $scope.subTotal = $scope.getSubTotal($scope.data.baseMealPrice, $scope.data.taxRate);
        $scope.tip = $scope.getTip($scope.data.baseMealPrice, $scope.data.tipPercentage);
        $scope.chargesTotal = $scope.round($scope.subTotal + $scope.tip, 2);
        //Earnings
        $scope.tipTotal = $scope.round($scope.tipTotal + $scope.tip, 2);
        $scope.numMeals = $scope.numMeals + 1;
        $scope.avgTipMeal = $scope.round($scope.tipTotal / $scope.numMeals, 2);
    };

    /* Clear Meal Details Form Only with Canel Button */
    $scope.doCancel = function () {
        $scope.data.baseMealPrice = 0;
        $scope.data.taxRate = 0;
        $scope.data.tipPercentage = 0;
        $scope.myForm.$setPristine();
        $scope.myForm.$setUntouched();
    };

    /* Provide Subtotal and tip amt for Customer Charge section */
    $scope.getSubTotal = function (price, taxRate) {
        price = Number(price);
        taxRate = Number(taxRate);

        return (price + $scope.round(price * (taxRate / 100), 2));
    };

    $scope.getTip = function (price, percent) {
        price = Number(price);
        percent = Number(percent);

        return $scope.round(price * (percent / 100), 2);
    };

    $scope.round = function (value, decimals) {
        return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
    };

    /* Reset all values to 0 when Reset Button Clicked */
    $scope.reset = function () {
        $scope.doCancel();
        $scope.numMeals = 0;
        $scope.subTotal = 0;
        $scope.tip = 0;
        $scope.chargesTotal = 0;
        $scope.tipTotal = 0;
        $scope.avgTipMeal = 0;
    };

});
