import request from "../index";
class TechnologiesService {
  static getAllTechnologies(params: any) {
    return request.get("/technologies", { params });
  }

  static getTechnologyById(technologyId: string) {
    return request.get(`/technologies/${technologyId}`);
  }

  static updateTechnology(technologyId: string, technologyData: any) {
    return request.put(`/technologies/${technologyId}`, technologyData);
  }

  static deleteTechnology(technologyId: string) {
    return request.delete(`/technologies/${technologyId}`);
  }

  static createTechnology(technologyData: any) {
    return request.post("/technologies", technologyData);
  }
}

export default TechnologiesService;
