import request from "../index";
class CategoriesService {
  static getAllCategories(params: any) {
    return request.get("/categories", { params });
  }

  static getCategoryById(categoryId: string) {
    return request.get(`/categories/${categoryId}`);
  }

  static updateCategory(categoryId: string, categoryData: any) {
    return request.put(`/categories/${categoryId}`, categoryData);
  }

  static deleteCategory(categoryId: string) {
    return request.delete(`/categories/${categoryId}`);
  }

  static createCategory(categoryData: any) {
    return request.post("/categories", categoryData);
  }
}

export default CategoriesService;
