const API_URL = "http://localhost:8000/users";

const form = document.getElementById("userForm");
const userList = document.getElementById("userList");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email })
    });

    form.reset();
    loadUsers();
});

async function loadUsers() {
    const res = await fetch(API_URL);
    const users = await res.json();

    userList.innerHTML = "";
    users.forEach(user => {
        const li = document.createElement("li");
        li.textContent = `${user.name} - ${user.email}`;
        userList.appendChild(li);
    });
}

loadUsers();