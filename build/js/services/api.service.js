(function () {

    "use strict";

    angular.module('toDoApp')
        .factory('apiService', function apiServiceFactory($http) {

            let notesEndpoint = '/notes';

            function getAllNotes() {
                return $http({

                    method: 'GET',
                    url: notesEndpoint

                });
            }

            function deleteCurrent(id) {
                return $http({

                    method: "DELETE",
                    url: notesEndpoint + "/" + id

                });
            }

            function addNewNote(note) {
                return $http({

                    method: "POST",
                    url: notesEndpoint,
                    data: note

                });
            }

            function updateCurrent(id, note) {
                return $http.put(notesEndpoint + '/' + id, note);
            }

            return {

                get: getAllNotes,
                post:addNewNote,
                delete: deleteCurrent,
                update: updateCurrent

            };

        })


}());