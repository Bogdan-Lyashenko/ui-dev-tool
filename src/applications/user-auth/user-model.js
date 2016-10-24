import UserDataSource from "./user-data-source.js";

export default class UserModel  {
    constructor() {
        this.dataSource = new UserDataSource();
    }

    /**
     *
     * @param {String} email
     * @returns {*}
     */
    getUser(email) {
        return this.dataSource.get(email);
    }

    /**
      *
      * @param {Array} usersList
      * @param {String} userEmail
      * @return {Object}
      */
    static findUserInList (usersList, userEmail) {
        return usersList.find(function(item) {
            return userEmail === item.email;
        });
    }
 }


