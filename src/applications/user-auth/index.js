import UserModel from "./user-model.js";

const UserAuth = {
    userList: [],

    isUserValid(user) {
        return UserModel.findUserInList(this.userList, user);
    }
 };

 export default UserAuth;
