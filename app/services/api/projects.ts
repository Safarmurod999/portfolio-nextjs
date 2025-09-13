import request from "../index";
class ProjectsService {
  static getAllProjects(params: any) {
    return request.get("/projects", { params });
  }

  static getProjectById(projectId: string) {
    return request.get(`/projects/${projectId}`);
  }

  static updateProject(projectId: string, projectData: any) {
    return request.put(`/projects/${projectId}`, projectData);
  }

  static deleteProject(projectId: string) {
    return request.delete(`/projects/${projectId}`);
  }

  static createProject(projectData: any) {
    return request.post("/projects", projectData);
  }
}

export default ProjectsService;
