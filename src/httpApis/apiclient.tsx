import axios, { AxiosError } from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_WEWANTWASTE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use(
  (config) => {
    /// We do not hacve any call that uses token, so this is just here for future use if needed. when available though, the token will be added to the request headers.
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

client.interceptors.response.use(
  (response) => {
    
    return response;
  },
  (e: AxiosError) => {
    if (e.response) {
      const { status, data } = e.response;

    //   if (status === 401) {
    //     // Optional: redirect to login or logout
    //     window.location.href = "/login";
    //   }

      // Optionally show a toast notification here
      // e.g., toast.error(data?.message || "Something went wrong");
    } else if (e.request) {
        // build the error object for any observerbilty tool. But for the purpose of this coding test, i will console log it.
      console.error("Response not recieved from the server with error:", e.request);
    } else {
         // build the error object for any observerbilty tool. But for the purpose of this coding test, i will console log it.
      console.error(":", e.message);
    }

    return Promise.reject(e);
  }
);

export default client;