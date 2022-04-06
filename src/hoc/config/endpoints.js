let HOSTNAME = ""
let PROTO = ""
let BASE = ""
let MEDIA_BASE = ""

// Developed by Pallapu Shiva Shankar
if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host === "iott.co.in") {
        HOSTNAME = "iott.co.in/api";
        PROTO = "http";
        BASE = `${PROTO}://${HOSTNAME}`;
        MEDIA_BASE = BASE;
    }
    else if (host === "dev.iott.co.in") {
        HOSTNAME = "dev.iott.co.in/api";
        PROTO = "http";
        BASE = `${PROTO}://${HOSTNAME}`;
        MEDIA_BASE = BASE;
    } else {
        //*******For hitting local directly*******////////////
        HOSTNAME = "iott.co.in/api";
        PROTO = "http";
        BASE = `${PROTO}://${HOSTNAME}`;
        MEDIA_BASE = BASE;

    }
}

const endpoints = {
    BASE,
    MEDIA_BASE,
    base: `${BASE}`,
    //   login: `${BASE}/authenticate/login/`,
    getAllVideos: `${BASE}/videos/getallvideos`,
    getAllImages: `${BASE}/images/getallimages`,
    getAllLanguages: `${BASE}/language/getalllanguages`,
    getAllCategory: `${BASE}/category/getallcategory`,
    getVideoByid: `${BASE}/videos/GetVideoByid`,
    getByCategory: `${BASE}/videos/getbycategory`,
    privacyPoilcy: `${BASE}/knowiott/getaboutiott`,
    termAndCondition: `${BASE}/knowiott/getaboutiott`,
    aboutUs: `${BASE}/knowiott/getaboutiott`,
    contactUs: `${BASE}/knowiott/getcontactus`,
    addFavorite: `${BASE}/user/addfavorite`,
    getFavoriteById: `${BASE}/user/getfavoritebymovieid`,
    getTrailerById: `${BASE}/videos/gettrailerbyid`,
    getByLanguage: `${BASE}/videos/getbylanguage`,
    register: `${BASE}/user/signupuser`,
    verifyUser: `${BASE}/user/Verifyuser`,
    getByGenere: `${BASE}/videos/getbygenre`,
    getCollection:`${BASE}/user/getfavorite`,
    searchCollection: `${BASE}/videos/getMoviebyName`,
    getAllNotifications: `${BASE}/notification/getallnotifications`,
    feedBackSubmit: `${BASE}/user/feedback`,
};
export default endpoints;

