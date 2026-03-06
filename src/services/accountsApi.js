import { API_URL } from '../config';

const ACCOUNTS_URL = `${API_URL}/api/auth`

export async function login({ username, password }) {
    return fetch(`${ACCOUNTS_URL}/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            email: username,
            password: password,
        }),
    }).then((response) => {
        if (response && response.status === 200) {
            response.json().then(data => {
                localStorage.setItem("user", JSON.stringify(data));
            });
            return true;
        }
        else return false;
    });
}

export function getAccountRoles() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.userId) {
        return user.roles;
    }
};

export const getBookBookReviews = async () => {
    const data = await fetch(`${API_URL}/api/book-reviews`)
        .then(response => response.json());
    return data;
}