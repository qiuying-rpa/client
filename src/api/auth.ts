import { BASE_URL } from "@/config";
import jsonAxios from "@/utils/api";

export const getPermissions = () => jsonAxios.get(`${BASE_URL}/auth/permissions`)