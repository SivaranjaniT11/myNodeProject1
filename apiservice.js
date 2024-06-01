export async function postRegisterDetails(obj){
    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "username": obj.username,
  "email": obj.email
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

const response = await fetch("https://mynodeproject1-1.onrender.com/data-post", requestOptions)
const data = await response.json();
return data
}