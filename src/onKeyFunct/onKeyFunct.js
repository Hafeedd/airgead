import { useEffect, useRef, useState } from 'react'

const useOnKey = (ref, setRef) =>{
    const formRef = useRef(null)

    useEffect(()=>{
        if(formRef.current) getRefValue(formRef,setRef)
        }
      ,[formRef])

    const getRefValue = (ref,set) =>{
    const data = [...ref.current.children]
    const newList = [...data[0].querySelectorAll('input, select, textarea, button')]
    newList[0].focus()
        set(newList)
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (e.target && ref.length>0) {
                let a = ref.indexOf(e.target)
                if(a===ref.length-1){
                    ref[0].focus()
                }else{
                ref[a].blur()
                ref[a+1].focus();
            }
            }
        }
    };

    return{handleKeyDown,formRef}
}

export default useOnKey