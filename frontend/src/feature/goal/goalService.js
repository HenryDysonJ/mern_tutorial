import axios from 'axios';

const API_URL = '/api/goals';
const BASE_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
    baseURL: BASE_URL,
});

const getAllGoal = async (token) => {
    const config = {
        headers : {
            Authorization: `Bearer ${token}`
        }
    }
    const responds = await api.get(API_URL, config);

    return responds.data;
}

const getById = async (id, token) => {
    const config = {
        headers : {
            Authorization: `Bearer ${token}`
        }
    }
    const responds = await api.get(API_URL+ `/${id}`, config);

    return responds.data;
}

const createGoal = async (goalData, token) => {
    const config = {
        headers : {
            Authorization: `Bearer ${token}`
        }
    }
    const responds = await api.post(API_URL, goalData, config);
    return responds.data;
}

const updateGoal = async (goalData, token) => {
    const config = {
        headers : {
            Authorization: `Bearer ${token}`
        }
    }
    const responds = await api.put(API_URL+ `/${goalData.id}`, goalData, config);
    return responds.data;
}

const deleteGoal = async (id, token) => {
    const config = {
        headers : {
            Authorization: `Bearer ${token}`
        }
    }
    const responds = await api.delete(API_URL+`/${id}`, config);
    return responds.data;
}

const goalService = {
    getAllGoal,
    getById,
    createGoal,
    updateGoal,
    deleteGoal
};

export default goalService