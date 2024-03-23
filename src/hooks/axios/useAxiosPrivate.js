import { useEffect } from "react"
import { axiosPrivate } from "../../api/axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

const useAxiosPrivate = () => {
    const auth = useSelector(state=>state.auth)

    useEffect(() => {

        axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Token ${auth?.token}`;
                }
                return config;
            }, (error) => {
               return Promise.reject(error);
            }
        );

        axiosPrivate.interceptors.response.use(
            response => {
                return response
            }, (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    return axiosPrivate(prevRequest);
                }
                  if (error?.response?.status === 404 && error.response.config.method === "post") {
                    console.log()
                    Swal.fire("404","Page not found","error")
                  }
                return Promise.reject(error)
            })
    }, [auth])
    return axiosPrivate
}

export default useAxiosPrivate;

