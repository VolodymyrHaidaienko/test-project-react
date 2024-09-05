import axios, { AxiosInstance } from "axios";
import baseURL from "../constants/urls";

export const axiosService: AxiosInstance = axios.create({baseURL});