import axios from "axios";

const API_URL = "/api/interviews/";


const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export const generateInterviewReport = async (jobDescription, resumeFile, selfDescription) => {
    const formData = new FormData();
    formData.append("jobDescription", jobDescription);
    formData.append("selfDescription", selfDescription);
    formData.append("resume", resumeFile);

    const response = await api.post("/", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const getInterviewReportById = async (interviewId) => {
    const response = await api.get(`/report/${interviewId}`);
    return response.data;
};

export const getAllInterviewReports = async () => {
    const response = await api.get("/");
    return response.data;
};

export const generateResumePdf = async ({ interviewReportId }) => {
    const response = await api.get(`/pdf/${interviewReportId}`, {
        responseType: 'blob'
    });
    return response.data;
};
