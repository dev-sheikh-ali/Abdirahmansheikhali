
import axios from "axios";

const cmsClient = axios.create({
	baseURL: `${import.meta.env.VITE_STRAPI_URL}/api`,
	headers: {
		Authorization: `Bearer ${import.meta.env.VITE_STRAPI_TOKEN}`,
	},
});

export default cmsClient;
