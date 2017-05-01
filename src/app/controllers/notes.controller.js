(function () {

    "use strict";


    angular
        .module('notes')
        .config(function ($routeProvider, $locationProvider) {
            $routeProvider
                .when('/', {

                    templateUrl: './templates/firstPage.tpl.html',

                })
                .when('/create-page', {

                    templateUrl: './templates/createPage.tpl.html',
                    controller: 'createCtrl'

                });

            $locationProvider.hashPrefix('');
        })
        .controller('createCtrl', function ($scope, apiService) {

            //notes tasks model
            $scope.tasks = [];
            $scope.current = 1;
            let newText = {},
                modelText,
                marked;
            $scope.title = '';


            apiService
                .get()
                .then(function (response) {
                    $scope.tasks = response.data.tasks;
                    $scope.tasks.forEach(function (theme) {

                    });

                })
                .catch(function (error) {
                    console.log(error);
                });


            $scope.addTitle = function () {


                let newTitle = {
                    _id: new Date(),
                    task: $scope.title,
                    text: []

                };


                //Adding the title to model
                if($scope.tasks.length == 0){
                    $scope.checked = false;
                    $scope.current = '';
                }


                if($scope.title){
                    $scope.tasks.push(newTitle);
                    $scope.title = '';
                }
                //Adding the title to backend
                apiService
                    .post(newTitle)
                    .then(function (response) {
                        console.log(response.data.message);
                    })
                    .catch(function (error) {
                        console.log(error)
                    });

            };

            $scope.removeTitle = function (task) {

                //Deleting the tasks from model
                $scope.tasks.splice($scope.tasks.indexOf(task), 1);
                if($scope.tasks.length == 0){

                    $scope.checked = false;

                }

            //Deleting the tasks from backend

                apiService
                    .delete(task._id)
                    .then(function (response) {
                        console.log(response.data.message);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });


            };

            $scope.openTask = function (index) {


                $scope.checked = true;
                if($scope.checked){
                    $scope.current = index;
                }


            };


            $scope.addTask = function () {

                let current = $scope.current,
                    id = $scope.tasks[current]._id;
                newText = {

                    task: $scope.title,
                    text: [],
                    _id: id

                };


                $scope.tasks[$scope.current].text.push({text: $scope.text, done: false});
                modelText = $scope.tasks[$scope.current].text;
                newText.text = modelText;
                newText.task = $scope.tasks[$scope.current].task;
                $scope.text = '';

                //Adding the text to current theme
                apiService
                    .post(newText)
                    .then(function (result) {
                    console.log(result);
                }, function (err) {
                        console.log(err);
                    });

            };

            $scope.changeDone = function (doneindex, index) {
                let done1 = doneindex,
                    index1 = index;
                newText = $scope.tasks[$scope.current];
                newText.text[index1].done = done1;



                apiService
                    .post(newText)
                    .then(function (response) {
                        console.log(response.data.message);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            };

        });




}());

