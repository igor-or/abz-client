
const apiUrl = process.env.REACT_APP_API_URL
    ? process.env.REACT_APP_API_URL
    : 'https://frontend-test-assignment-api.abz.agency/api/v1/';

export default {
    async getUsers(url) {
        try {
            const response = await fetch(url || apiUrl + 'users?count=6'); 
            if (!response.ok) {
                throw new Error('Error getting users!');
            }
            return await response.json();
        } catch (error) {
            throw error;
        }
    },

    async addUser(reqBody, token) {
        const response = await fetch(apiUrl + 'users', {
            method: 'POST',
            body: reqBody,
            headers: {
                Token: token,
            },
        });

        if (response.status !== 201) {
            throw new Error('Error creating user!');
        }
    },

    async getPositions() {
        try {
            const response = await fetch(apiUrl + 'positions');
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            return await response.json();
        } catch (error) {
            throw error;
        }
    },

    async getToken() {
        try {
            const response = await fetch(apiUrl + 'token');
            if (!response.ok) {
                throw new Error('Error getting token');
            }
            return await response.json();
        } catch (error) {
            throw error;
        }
    },
};
