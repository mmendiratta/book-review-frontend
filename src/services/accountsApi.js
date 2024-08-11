const ACCOUNTS_URL = "https://book-review-backend-pl3j.onrender.com/api/auth"

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
    const data = await fetch("https://book-review-backend-pl3j.onrender.com/api/book-reviews")
        .then(response => response.json());
    return data;
}