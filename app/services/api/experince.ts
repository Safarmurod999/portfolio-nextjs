import request from "../index";
class ExperienceService {
  static getAllExperiences(params: any) {
    return request.get("/experience", { params });
  }

  static getExperienceById(experienceId: string) {
    return request.get(`/experience/${experienceId}`);
  }

  static updateExperience(experienceId: string, experienceData: any) {
    return request.put(`/experience/${experienceId}`, experienceData);
  }

  static deleteExperience(experienceId: string) {
    return request.delete(`/experience/${experienceId}`);
  }

  static createExperience(experienceData: any) {
    return request.post("/experience", experienceData);
  }
}

export default ExperienceService;
