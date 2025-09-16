import request from "../index";
class ServiceDetailsService {
  static getAllServiceDetails(params: any) {
    return request.get("/service-details", { params });
  }

  static getServiceDetailById(serviceDetailId: string) {
    return request.get(`/service-details/${serviceDetailId}`);
  }

  static updateServiceDetail(serviceDetailId: string, serviceDetailData: any) {
    return request.put(
      `/service-details/${serviceDetailId}`,
      serviceDetailData
    );
  }

  static deleteServiceDetail(serviceDetailId: string) {
    return request.delete(`/service-details/${serviceDetailId}`);
  }

  static createServiceDetail(serviceDetailData: any) {
    return request.post("/service-details", serviceDetailData);
  }
}

export default ServiceDetailsService;
