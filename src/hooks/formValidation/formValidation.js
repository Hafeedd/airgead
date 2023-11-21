import Swal from "sweetalert2"

export const formValidation = () =>{
    const requiredInput = document.querySelectorAll('[required]')
    if(requiredInput?.length<1) return true
    for (const inputField of requiredInput) {
        if(inputField?.value == ''){
            Swal.fire(`The ${inputField?.name} Field is required`)
            return false
        }else{
            return true
        }
    }
}