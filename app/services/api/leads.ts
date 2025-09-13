import request from "../index";
class LeadsService {
  static getAllLeads(params: any) {
    return request.get("/leads", { params });
  }

  static getLeadById(leadId: string) {
    return request.get(`/leads/${leadId}`);
  }

  static updateLead(leadId: string, leadData: any) {
    return request.put(`/leads/${leadId}`, leadData);
  }

  static deleteLead(leadId: string) {
    return request.delete(`/leads/${leadId}`);
  }

  static createLead(leadData: any) {
    return request.post("/leads", leadData);
  }
}

export default LeadsService;
