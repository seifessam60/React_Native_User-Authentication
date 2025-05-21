import axios from "axios";

const API_KEY = "AIzaSyCTYqmOmSDXtGBOADloQiDvF5uBDfPsnsc";

async function authnticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email,
    password,
    returnSecureToken: true,
  });

  return response.data.idToken;
}

export function createUser(email, password) {
  return authnticate("signUp", email, password);
}

export function login(email, password) {
  return authnticate("signInWithPassword", email, password);
}
