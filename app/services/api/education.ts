import request from "../index";
class EducationService {
  static getAllEducations(params: any) {
    return request.get("/education", { params });
  }

  static getEducationById(educationId: string) {
    return request.get(`/education/${educationId}`);
  }

  static updateEducation(educationId: string, educationData: any) {
    return request.put(`/education/${educationId}`, educationData);
  }

  static deleteEducation(educationId: string) {
    return request.delete(`/education/${educationId}`);
  }

  static createEducation(educationData: any) {
    return request.post("/education", educationData);
  }
}

export default EducationService;
