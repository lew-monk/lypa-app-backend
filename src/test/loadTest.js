import http from "k6/http";

export default function () {
  const url = "https://lypa-backend-y843r.ondigitalocean.app/api/user/login";
  const payload = JSON.stringify({
    email: "test@gmail.com",
    password: "test",
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  http.post(url, payload, params);
}
