import { useEffect, useRef } from "react";

const useOnKey = (ref, setRef,...otherChangableState) => {
  let formRef = useRef([]);

  useEffect(() => {
    // console.log(formRef.current)
    if (formRef?.current) getRefValue(formRef, setRef);
  }, [formRef, ...otherChangableState]);

  const getRefValue = (fRef, set) => {
    let newList = []
    if(Array.isArray(fRef?.current)){
      fRef?.current.map(data=>{if(data)newList.push(...data?.querySelectorAll(
        "input:not([disabled]), select:not([disabled]), textarea, button"
        ))})
    }else{
      newList = [...fRef?.current?.querySelectorAll(
        "input:not([disabled]), select:not([disabled]), textarea, button"
        )||[]]
      }
    set(newList);
  };

  const handleKeyDown = (e) => {
    
    if (e?.key === "Enter") {
      if (e.keyCode == 13 && e.shiftKey) {
        return 0;
      }
      if (e.key == "Enter" && e.ctrlKey){
        e.preventDefault();
        if (e.target && ref?.length > 0) {
          let a = ref?.indexOf(e.target);
          if (a === 0) {
            ref[ref.length-1]?.focus();
          } else {
            ref[a]?.blur();
            ref[a - 1]?.focus();
          }
        }
        return 0
      }
    //   if(e.keyCode)
      e.preventDefault();
      if (e.target && ref?.length > 0) {
        let a = ref?.indexOf(e.target);
        if (a === ref.length - 1) {
          ref[0]?.focus();
        } else {
          ref[a]?.blur();
          ref[a + 1]?.focus();
        }
      }
    }
  };

  return [ handleKeyDown, formRef ];
};

export default useOnKey;