import request from "../index";
class ServicesService {
  static getAllServices(params: any) {
    return request.get("/services", { params });
  }

  static getServiceById(serviceId: string) {
    return request.get(`/services/${serviceId}`);
  }

  static updateService(serviceId: string, serviceData: any) {
    return request.put(`/services/${serviceId}`, serviceData);
  }

  static deleteService(serviceId: string) {
    return request.delete(`/services/${serviceId}`);
  }

  static createService(serviceData: any) {
    return request.post("/services", serviceData);
  }
}

export default ServicesService;
