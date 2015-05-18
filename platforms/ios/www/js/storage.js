angular.module('local.storage', [])
// Local storage:
//  http://learn.ionicframework.com/formulas/localstorage/


.factory('$localstorage', ['$window', function($window) {
/*  iCloud WARNING
  To make sure data stored in localStorage does not get backed up to iCloud 
  and thus resulting in Apple rejecting your app for voilating the Data Storage 
  Guidelines, make sure to set BackupWebStorage to none in your config.xml for 
  Cordova/PhoneGap:

    <!-- config.xml -->

    <?xml version='1.0' encoding='utf-8'?>
    <widget ...>
      <preference name="BackupWebStorage" value="none" />
    </widget>
*//* 
  Refs: 
    http://learn.ionicframework.com/formulas/localstorage/
    https://developer.mozilla.org/en-US/docs/Web/API/Storage
*/
  return {

    key: function(key) {
    // When passed a number n, this method will return the name of the nth key in the storage.
      return $window.localStorage.key(key);
    },

    set: function(key, value) {
    // When passed a key name and value, will add that key to the storage, or update that key's value if it already exists.
      $window.localStorage[key] = value;
    },

    get: function(key, defaultValue) {
    // When passed a key name, will return that key's value.
      return $window.localStorage[key] || defaultValue;
    },

    remove: function(key) {
    // When passed a key name, will remove that key from the storage.
      return $window.localStorage.removeItem(key);
    },

    clear: function() {
    // When invoked, will empty all keys out of the storage.
      return $window.localStorage.clear();
    },

    getLength: function() {
    // Returns an integer representing the number of data items stored in the Storage object.
      return $window.localStorage.length;
    },

    // The following two methods are used to store objects as JSOM strings.
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },

    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}]);
