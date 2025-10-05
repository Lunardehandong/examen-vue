export function registerUser(name, email, password) {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const exists = users.find(u => u.email === email);
  if (exists) throw new Error("El usuario ya existe");
  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));
}

export function loginUser(email, password) {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) throw new Error("Correo o contraseña incorrectos");
  localStorage.setItem("token", JSON.stringify({ email }));
}

export function logoutUser() {
  localStorage.removeItem("token");
}

export function isAuthenticated() {
  return !!localStorage.getItem("token");
}
