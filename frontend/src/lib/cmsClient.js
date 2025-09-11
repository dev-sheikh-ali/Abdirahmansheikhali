
import axios from "axios";

const cmsClient = axios.create({
	baseURL: `${import.meta.env.VITE_STRAPI_URL}/api`,
});

export default cmsClient;
