import { useEffect, useRef, useState } from 'react'

const useOnKey = (ref, setRef) =>{
    const formRef = useRef(null)

    useEffect(()=>{
        if(formRef.current) getRefValue(formRef,setRef)
        }
      ,[formRef])

    const getRefValue = (ref,set) =>{
    const data = [...ref.current.children]
    let newList = []
    if(data.length>0){
        data.map(x=>
            newList.push(...x.querySelectorAll('input, select, textarea, button'))
            )
    }
    newList[0]?.focus()
        set(newList)
    }

    const handleKeyDown = (e) => {
        if (e.keyCode == 13 && e.shiftKey) { 
            e.target.value += '\n';
            e.preventDefault()
        }
        else if(e.key === "Enter") {
            e.preventDefault();
            if (e.target && ref?.length>0) {
                let a = ref?.indexOf(e.target)
                    if(a===ref.length-1){
                        ref[0]?.focus()
                    }else if (ref[a+1]?.disabled ){
                        if(a!==ref?.length-2){
                        ref[a]?.blur()
                        ref[a+2]?.focus();}
                        else{
                            ref[0]?.focus()
                        }
                    }
                    else{
                        ref[a]?.blur()
                        ref[a+1]?.focus();
                    }
            }
        }
    }

    return{handleKeyDown,formRef}
}

export default useOnKey