import request from "../index";
class UserService {
  static getAllUsers(params: any) {    
    return request.get("/users", { params });
  }

  static getUserById(userId: string) {
    return request.get(`/users/${userId}`);
  }

  static updateUser(userId: string, userData: any) {
    return request.put(`/users/${userId}`, userData);
  }

  static deleteUser(userId: string) {
    return request.delete(`/users/${userId}`);
  }

  static createUser(userData: any) {
    return request.post("/users", userData);
  }
}

export default UserService;
