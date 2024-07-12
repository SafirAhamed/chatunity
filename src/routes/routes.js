import CountryDetailsPage from "../pages/CountryDetailsPage.js";
import UnderDevPage from "../pages/UnderDevPage.js";

export const routes = [
    {
        path: "/",
        component: <UnderDevPage/> 
    },
    {
        path: "tools/country_details",
        component: <CountryDetailsPage/> 
    },
]
    