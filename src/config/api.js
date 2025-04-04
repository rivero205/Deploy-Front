export const API_URL = 'https://servidor-sun.onrender.com/api';

export const endpoints = {
    getAllData: `${API_URL}/datos`,
    getStationData: (stationId) => `${API_URL}/datos/${stationId}`,
    getLatestReadings: `${API_URL}/ultimas-lecturas`,
    insertData: `${API_URL}/datos`
};