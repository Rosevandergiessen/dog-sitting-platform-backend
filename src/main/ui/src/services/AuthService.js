const API_URL = 'http://localhost:8080/'

class AuthService {
    login(username, password) {
        return fetch(API_URL + "login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json().then((data) => {
                        if (data.accessToken) {
                            localStorage.setItem("user", JSON.stringify(data));
                        }
                        return data;
                    });
                } else {
                    throw new Error("Login failed.");
                }
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username, email, password, imageFile) {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('image', imageFile);


        return fetch(API_URL + "register", {
            method: "POST",
            body: formData,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Registration failed.");
                }
            });
    }

    getCurrentUser() {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    }
}

export default new AuthService();