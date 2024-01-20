import { useEffect, useRef, useState } from 'react'

const useOnKey = (ref, setRef) =>{
    const formRef = useRef(null)

    useEffect(()=>{
        console.log(formRef)
        if(formRef.current) getRefValue(formRef,setRef)
        }
      ,[formRef])

    const getRefValue = (ref,set) =>{
    const data = [...ref.current.children]
    let newList = []
    if(data.length>0){
        data.map(x=>
            newList.push(...x.querySelectorAll('input:not([disabled]), select:not([disabled]), textarea, button'))
            )
    }
    // newList[0]?.focus()
        set(newList)
    }

    const handleKeyDown = (e) => {
            if(e?.key === "Enter") {
                if (e.keyCode == 13 && e.shiftKey) {
                    return 0
                }
                e.preventDefault();
                if (e.target && ref?.length>0) {
                    let a = ref?.indexOf(e.target)
                    if(a===ref.length-1){
                        ref[0]?.focus()
                    }
                    else{
                        ref[a]?.blur()
                        ref[a+1]?.focus();
                    }
                }
            }
        }

    return [ handleKeyDown, formRef ]
}

export default useOnKey