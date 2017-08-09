/* @flow */
import "./less/app.less";

import * as angular from "angular";
import ngResource from "angular-resource";
import * as uiRouter from "@uirouter/angularjs";
import * as angularUiBootstrap from "angular-ui-bootstrap";
import defaults from "lodash/defaults";

var app = angular.module("app", ["ui.router", ngResource, "ui.bootstrap"]);

app.config([
    "$stateProvider",
    "$urlRouterProvider",
    function($stateProvider, $urlRouterProvider) {
        $stateProvider.state({
            name: "index",
            url: "/",
            templateUrl: "partials/index.html",
            controller: "ListController"
        });
        $urlRouterProvider.otherwise("/");
    }
]);
app.controller("ListController", [
    "$scope",
    "AlertsResource",
    function($scope, AlertsResource) {
        $scope.loading = false;
        $scope.response = false;
        $scope.query = {
            limit: 10,
            query: undefined
        };
        $scope.getAlerts = function(newQuery) {
            if (typeof newQuery !== "undefined") {
                if (typeof newQuery.page !== "undefined") {
                    newQuery.offset = (newQuery.page - 1) * $scope.query.limit;
                }
                $scope.query = defaults(newQuery, $scope.query);
            }
            $scope.loading = true;
            var Request = AlertsResource.get($scope.query);
            Request.$promise.then(function(response) {
                $scope.loading = false;
                response.page = response.offset / response.limit + 1;
                $scope.response = response;
            });
        };
        $scope.getAlerts();
    }
]);
app.factory("AlertsResource", [
    "$resource",
    function($resource) {
        return $resource("alerts", {
            limit: 10,
            offset: 0,
            sortBy: undefined,
            query: undefined
        });
    }
]);

(function() {
    angular.bootstrap(angular.element(document), ["app"]);
})();
