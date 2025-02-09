const CONFIG = {
    "development": {
        hosting_url: "http://localhost:3000",
        urlEndpoint: "/",
        analyticsEndpoint: "/analytics",
    },
    "production": {
        hosting_url: "https://shorten-url-service.herokuapp.com",
        urlEndpoint: "/",
        analyticsEndpoint: "/analytics",
    },
};

export default CONFIG;