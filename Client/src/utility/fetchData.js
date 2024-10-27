const host = "http://localhost:5000";

const fetchData = async (url, body) => {
    const response = await fetch(`${host}${url}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(body),
    });
    const data = await response.json();
    return { response, data };
};

export default fetchData