import React, { useEffect, useRef, useState } from 'react'
import { Form } from 'react-bootstrap'
import { FiChevronDown } from 'react-icons/fi'
import './searchDropDown.css'
import { ListItem } from '@mui/material'

const SearchDropDown = ({
    containerClass,
    placeholder,
    // type,
    setShowDropdown,
    showDropdown,
    id,
    setDataValue,
    selectedValue,
    options,
    addNew,
    setNew
}) => {
    const [show, setShow] = useState(showDropdown === id ? true : false)
    const [selected, setSelected] = useState('')
    const [tempList, setTempList] = useState(options[id])
    const [search, setSearch] = useState('')
    const dropdownRef = useRef(null)

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
        if(options[id]?.length>0){
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
    }, [selectedValue])

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

    const handleDropdown = () => {
        if (show) {
            setShowDropdown('')
            setShow(false)
        }
        else {
            setShowDropdown(id)
            setShow(true)
        }
    }

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

    const handleSelect = (item) => {
        dropdownRef.current.scrollTo({ top: 0, behavior: 'smooth' })
        setSelected(item?.label)
        setSearch(item?.label)
        setShowDropdown('')
        setShow(false)
        if(id==='transaction_unit')
        setDataValue((data)=>({...data, [id]:item.label}))
        else
        setDataValue((data)=>({...data, [id]:item.value}))
    }

    const handleReset = () => {
        dropdownRef.current.scrollTo({ top: 0, behavior: 'smooth' })
        setSelected(null)
        setShowDropdown('')
        setShow(false)
        setSearch('')
    }

    return (
        <Form.Group
            className={`search_container ${containerClass}`}
        >
            {/* <Form.Label
                classnName='label-text-content'
            >
                {label && label}
                {required && ' *'}
            </Form.Label> */}
            <div className='d-flex align-items-start row mx-0'>
                <div className='dropdown-position-control'>
                    <div
                        className={`dropdown-box-container ${show ? 'show' : ''}`}
                        onFocus={handleDropdown}
                        onBlur={handleDropdown}
                    >
                        <Form.Control
                            type='text'
                            className='dropdown-search-box'
                            onChange={handleSearch}
                            value={search}
                            disabled={selected ? true : false}
                            // required={required && false}
                            placeholder={placeholder || 'Select'}
                        />
                        <div className='dropdown-option-container' ref={dropdownRef}>
                            {selected && <div className={`dropdown-option-data clear`} onClick={() => handleReset()}>
                                <div className="text">Clear</div>
                            </div>}                              
                            {addNew&&<div className={`dropdown-option-data add`} onClick={(e) => handleNewOption(e)}>
                                <div className="text">{`${containerClass ? "New":"Add"}`}</div>
                            </div>}
                            {tempList &&
                                tempList.map((item, index) => (
                                    <div className={`dropdown-option-data `} key={index} onClick={() => handleSelect(item)}>
                                        <div className="text">{item?.label}</div>
                                    </div>
                                )) 
                            }  
                        </div>
                    </div>
                </div>

                <div className='dropdown-btn-container '>
                    <div
                        className='dropdown-btn'
                        onClick={handleDropdown}
                    >
                        <FiChevronDown className={`arrow  ${show ? 'show' : ''} `} />
                    </div>
                </div>
            </div>
        </Form.Group>
    )
}

export default SearchDropDown
