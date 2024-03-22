import Swal from "sweetalert2"

export const handleNetworkError = (error) =>{
    try{
        if(!error?.response){
            Swal.fire('Network Error','please check your internet connection.','warning')
        }else Swal.fire('Something went wrong', error.repsonse.data,'error')
    }catch(err){
        console.log(err)
    }
}