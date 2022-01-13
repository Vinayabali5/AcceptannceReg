/**
 * This is the factory definition for the Department Data Service. This defines how to handle data about Department objects.
 *
 * Applied Styles: [Y001, Y002, Y010, Y021, Y022, Y023, Y024, Y050, Y051, Y052, Y053]
 *
 * @type Data Service
 */
(function() {
    'use strict';

    angular
        .module('DepartmentService', ['ui-notification'])
        .factory('Department', departmentFactory);

    departmentFactory.$inject = ['$q', '$http', '$rootScope', 'GLOBAL', 'Notification'];

    function departmentFactory($q, $http, $rootScope, GLOBAL, Notification) {
        /* jshint validthis:true */
        var vm = this;
        var url = GLOBAL.API + '/departments/';

        var factory = {
            query: getAll,
            get: getById,
            create: create,
            save: save
        };

        return factory;
        //Private Interface
        /**
         * This method is used to retrieve all the Department from the API collection.
         *
         * @return {Department} An array of Department objects.
         */
        function getAll() {
            var deferred = $q.defer();
            $http.get(url).then(function(response) {
                deferred.resolve(response);
                $rootScope.$emit('department-loaded', response.data);
            }, function(response) {
                deferred.reject(response);
            });
            return deferred.promise;
        }

        /**
         * This method is used to retrieve an instance of a Department from the API collection.
         * @param  {int} id of the Department object that is to be retrieved.
         * @return {Department} An Department object as identified by the id.
         */
        function getById(id) {
            var deferred = $q.defer();
            if (id != undefined && id != null) {
                $http.get(url + id).then(function(response) {
                    deferred.resolve(response);
                    $rootScope.$emit('department-loaded', response.data);
                }, function(response) {
                    deferred.reject(response);
                });
            } else {
                deferred.reject({
                    message: "No ID Supplied"
                });
            }
            return deferred.promise;
        }

        /**
         * This method is used to create a new instance of an Department object in the database by POSTing the
         * required data to the API.
         *
         * @param  {Department} department An Department object to persist to the database.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no Department data is provided then the method returns null.
         */
        function create(department, callback) {
            var deferred = $q.defer();
            if (department != undefined && department != null) {
                $http.post(url, department).then(function(response) {
                    deferred.resolve(response);
                    $rootScope.$emit('department-saved', response.data);
                    if (callback) {
                        callback();
                    }
                }, function(response) {
                    deferred.reject(response);
                    Notification.error("Error:" + response.data.message);
                });
            } else {
                deferred.reject({
                    message: "No Department ID Supplied"
                });
            }
            return deferred.promise;
        }

        /**
         * This method is used to save changes to an existing Department object.
         *
         * @param  {Department} department An Course object with the data to be updated.
         * @param  {Function} callback (Optional) A function to be called on a successful call to the API
         * @return {various} This method will return different things depending on the success or failure of the API call.
         * On a success full call the data returned from the API is returned, in the event of an error on the API call the
         * status and data are returned, if no Department data is provided then the method returns null.
         */
        function save(department, callback) {
            var deferred = $q.defer();
            $http.put(url + department.id, department).then(function(response) {
                deferred.resolve(response);
                $rootScope.$emit('department-saved', response.data);
                if (callback) {
                    callback();
                }
            }, function(response) {
                deferred.reject(response);
                Notification.error("Error:" + response.data.message);
            });
            return deferred.promise;
        }
    }
})();
