import React, { useEffect, useRef, useState } from 'react'
import { Form } from 'react-bootstrap'
import { FiChevronDown } from 'react-icons/fi'
import './searchDropDown.css'

const SearchDropDown = ({
    containerClass,
    placeholder,
    // type,
    setShowDropdown,
    showDropdown,
    handleKeyDown,
    id,
    setDataValue,
    selectedValue,
    options,
    addNew,
    setNew,
    required
}) => {
    const [show, setShow] = useState(showDropdown === id ? true : false)
    const [selected, setSelected] = useState('')
    const [tempList, setTempList] = useState(options[id])
    const [search, setSearch] = useState('')
    const [dropRef, setDropRef] = useState()
    const [arrowDrop, setArrowDrop] = useState(false)
    const dropdownRef = useRef(null)
    const inputRef = useRef(null)

    useEffect(()=>{
        let optionEl = document?.getElementsByClassName("dropdown-box-container show")[0]?.getElementsByClassName('dropdown-option-data')
        // console.log(optionEl)
        // console.log(inputRef.current.value)
        let optionKey , optionsArr = []
        if(optionEl){
            optionKey = Object.keys(optionEl)
            optionKey.map(x=>optionsArr.push(optionEl[x]))
        } 
        let newOptionArr = []
        if(optionsArr?.length>0){
            optionsArr.map((x,i)=>{
                if(!x.className.match(/add$|clear$/))
                newOptionArr.push(x)
                })
            if(newOptionArr?.length>0){
                // console.log(selected)
                if(search !== ''){
                    // console.log(newOptionArr)
                    newOptionArr.map((x,i)=>{
                        let lessThan = x.innerHTML.indexOf('>')
                        let lowerThan = x.innerHTML.lastIndexOf('<')
                        const find = x.innerHTML.slice(lessThan+1,lowerThan)
                        // console.log(search,find,selected)
                        if(find.toLocaleLowerCase() === selected.toLocaleLowerCase()){
                            // console.log(x)
                        x.className = "dropdown-option-data selected"}
                        else{
                            x.className = "dropdown-option-data"
                        }
                    })
                }else{
                newOptionArr.map((x,i)=>{
                    if(i===0) x.className = "dropdown-option-data selected"
                    else  x.className = "dropdown-option-data"
                })}
                // console.log(newOptionArr)
            }
            }
        if(optionEl && typeof optionEl !== "object") optionEl.className = "dropdown-option-data selected"
        const datas = document.getElementsByClassName("dropdown-box-container show")[0]?.getElementsByClassName("dropdown-option-data selected")[0]
        // console.log(datas)
        setDropRef(datas)
    },[showDropdown])

    useEffect(() => {
        if(options[id])
        if(typeof options[id] != 'object'){
            if(id == 'transaction_unit'){
                setTempList([...options['unit'],])}
            else
                setTempList([...options[id],])
            if (selectedValue[id]) {
                options[id].map((item)=>{
                if (item.value==selectedValue[id]){
                    setSelected(item?.label)
                    setSearch(item?.label)
                }
            })
        }
        else{
            setSelected('')
            setSearch('')
        }}
    },[])

    useEffect(() => {
        if(id  == 'transaction_unit'){
            setTempList([...options['unit'],])
            if(selectedValue[id]){
                options['unit']?.map(item=>{
                    let a = selectedValue[id].toLowerCase()
                    if(item.label==a){
                    setSearch(item?.label)
                    setSelected(item?.label)
                }
                })
            }
        }else
        if(options[id]?.length>0)
                setTempList([...options[id],])
        if (selectedValue[id]) {
            options[id]?.map((item)=>{
                if (item.value==selectedValue[id]){
                    setSelected(item?.label)
                    setSearch(item?.label)
                }
            })
        }
        else{
            handleReset()
        }}
    , [selectedValue,options])

    if(id == 'transaction_unit'){
        // console.log(search)
    }
    
    useEffect(() => {
        if(options[id]?.length || id == 'transaction_unit'){
            if(id == 'transaction_unit'){
                setTempList([...options['unit'],])}
            else
                setTempList([...options[id],])
    if (selectedValue[id]){
        options[id]?.map((item)=>{
            if (item.value==selectedValue[id]){
                setSelected(item?.label)
                setSearch(item?.label)
            }
        })
    }
    else{
        setSelected('')
        setSearch('')
    }}
    }, [options])

    useEffect(() => {
        if (showDropdown === id) {
            setShow(true);
        }
        else {
            setShow(false);
        }
    }, [showDropdown])


    const handleSearch = (e) => {
        setSearch(e.target.value)
        setShow(true)
        var filteredList = options[id]?.filter(item => item?.label?.toLowerCase().search(e.target.value.toLowerCase()) > -1)
        setTempList(filteredList)
    }

    const handleNewOption = (e) => {
        const data = { value: search, label: search }
        dropdownRef.current.scrollTo({ top: 0, behavior: 'smooth' })
        setSelected(search)
        setNew(e,data,id)
        setShow(false)
        setDataValue((data)=>({...data, [id]:search}))
        setShowDropdown('')
    }

    const handleSelect = (e,item) => {
        dropdownRef.current.scrollTo({ top: 0, behavior: 'smooth' })
        setSelected(item?.label)
        setSearch(item?.label)
        if(id==='transaction_unit')
        setDataValue((data)=>({...data, [id]:item.label.toUpperCase()}))
        else
        setDataValue((data)=>({...data, [id]:item.value}))
        handleDropdown(e,'1')
}

    const handleReset = () => {
        dropdownRef.current.scrollTo({ top: 0, behavior: 'smooth' })
        setSelected(null)
        setShowDropdown('')
        setShow(false)
        setSearch('')
    }

    const moveDown = (e) => {
        if (dropRef?.nextSibling && e.key === "ArrowDown") {
            if(e.target && dropRef)
            dropRef.className = 'dropdown-option-data'
                dropRef.nextSibling.className = 'dropdown-option-data selected'
                setDropRef(dropRef?.nextSibling)
        }else if(e.key === "ArrowUp" && dropRef?.previousSibling?.className !== "dropdown-option-data add"){
            if(e.target && dropRef)
                dropRef.className = 'dropdown-option-data'
            dropRef.previousSibling.className = 'dropdown-option-data selected'
            dropRef.previousSibling.focus()
            setDropRef(dropRef.previousSibling)
        }else if(e.key === "Enter"){
            e.preventDefault()
            handleKeyDown(e)
        }
      }

    const handleDropdown = (e,x) =>{
        if(x==='1'){
            console.log("first")
            setShow(false)
            setShowDropdown('')
            setArrowDrop(true)
            const field = e.target?.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("dropdown-search-box")[0]
            field.blur()
            setTimeout(()=>{
                setArrowDrop(false)
            },300)
        }else if(x==='2'){
            if(!arrowDrop){
                setShow(true)
                setShowDropdown(id)
            }
        }else if(x==='3'){
            const field = e.target?.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("dropdown-search-box")[0]
            field.focus()
        }
    }

    return (
        <Form.Group className={`search_container ${containerClass}`}>
            <div className='d-flex align-items-start row mx-0'>
                <div className='dropdown-position-control'>
                    <div
                        className={`dropdown-box-container ${show ? 'show' : ''}`}
                        onBlur={e=>handleDropdown(e,'1')}
                        onFocus={e=>handleDropdown(e,'2')}
                    >
                        <Form.Control
                            // onClick={handleDropdown}
                            required={required}
                            type='text'
                            ref={inputRef}
                            className='dropdown-search-box'
                            onChange={handleSearch}
                            value={search}
                            onKeyDown={moveDown}
                            // disabled={selected ? true : false}
                            placeholder={placeholder || 'Select'}
                        />
                        <div tabIndex="-1" className='dropdown-option-container' ref={dropdownRef}>
                            {selected && <div className={`dropdown-option-data clear`} onClick={() => handleReset()}>
                                <div className="text">Clear</div>
                            </div>}
                            {addNew&&<div className={`dropdown-option-data add`} onClick={(e) => handleNewOption(e)}>
                                <div className="drop-text">{`${containerClass ? "New":"Add"}`}</div>
                            </div>}
                            {tempList?.length>0 && <div className={`dropdown-option-data selected`} onClick={(e) =>{handleSelect(e,tempList[0])}}>
                                <div className="dropdown-text selected">{tempList[0]?.label}</div>
                            </div>}
                            {tempList?.length>0 &&
                                tempList.map((item, index) => {
                                {
                                return index!=0&&(<div className={`dropdown-option-data `} key={index} onClick={(e) => handleSelect(e,item)}>
                                    <div className="dropdown-text">{item?.label}</div>
                                </div>)}
                                })
                            }
                        </div>
                    </div>
                </div>

                <div className='dropdown-btn-container '>
                    <div 
                        className='dropdown-btn'
                        onClick={e=>{
                                if(!arrowDrop)
                                handleDropdown(e,'3')}}
                    >
                        <FiChevronDown className={`arrow  ${show ? 'show' : ''} `} />
                    </div>
                </div>
            </div>
        </Form.Group>
    )
}

export default SearchDropDown
