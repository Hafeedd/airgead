import React, { useEffect, useRef, useState } from 'react'
import { Form, Modal } from 'react-bootstrap'
import editBtn from '../../assets/icons/edit-black.svg'
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';                       // core css
// import 'primeicons/primeicons.css';                                 // icons
// import 'primeflex/primeflex.css';    
import './searchDropDown.css'

const SearchDropDown = ({
    containerClass,
    setShowDropdown,
    showDropdown,
    noSearch,
    handleKeyDown,
    noAdd,
    id,
    setDataValue,
    selectedValue,
    options,
    setNew,
}) => {
    const [show, setShow] = useState(false)
    const [editData, seteditData] = useState()
    const [edit, setEdit] = useState(false)
    const [selected, setSelected] = useState('')
    const [tempList, setTempList] = useState(options[id]?options[id]:null)
    const [search, setSearch] = useState('')
    const [dropRef, setDropRef] = useState()
    const [arrowDrop, setArrowDrop] = useState(false)
    // const dropdownRef = useRef(null)
    // const inputRef = useRef(null)

    // useEffect(()=>{
    //     let optionEl = document?.getElementsByClassName("dropdown-box-container show")[0]?.getElementsByClassName('dropdown-option-data')
    //     let optionKey , optionsArr = []
    //     if(optionEl){
    //         optionKey = Object.keys(optionEl)
    //         optionKey.map(x=>optionsArr.push(optionEl[x]))
    //     } 
    //     let newOptionArr = []
    //     if(optionsArr?.length>0){
    //         optionsArr.map((x,i)=>{
    //             if(!x.className.match(/add$|clear$/))
    //             newOptionArr.push(x)
    //             })
    //         if(newOptionArr?.length>0){
    //             // console.log(selected)
    //             if(search !== ''){
    //                 // console.log(newOptionArr)
    //                 newOptionArr.map((x,i)=>{
    //                     let lessThan = x.innerHTML.indexOf('>')
    //                     let lowerThan = x.innerHTML.lastIndexOf('<')
    //                     const find = x.innerHTML.slice(lessThan+1,lowerThan)
    //                     // console.log(search,find,selected)
    //                     if(find.toLocaleLowerCase() === selected.toLocaleLowerCase()){
    //                         // console.log(x)
    //                     x.className = "dropdown-option-data selected"}
    //                     else{
    //                         x.className = "dropdown-option-data"
    //                     }
    //                 })
    //             }else{
    //             newOptionArr.map((x,i)=>{
    //                 if(i===0) x.className = "dropdown-option-data selected"
    //                 else  x.className = "dropdown-option-data"
    //             })}
    //             // console.log(newOptionArr)
    //         }
    //         }
    //     if(optionEl && typeof optionEl !== "object") optionEl.className = "dropdown-option-data selected"
    //     const datas = document.getElementsByClassName("dropdown-box-container show")[0]?.getElementsByClassName("dropdown-option-data selected")[0]
    //     // console.log(datas)
    //     setDropRef(datas)
    // },[showDropdown])

    // useEffect(() => {
    //     if(options[id])
    //     if(typeof options[id] != 'object'){
    //         if(id == 'transaction_unit'){
    //             setTempList([...options['unit'],])}
    //         else
    //             setTempList([...options[id],])
    //         if (selectedValue[id]) {
    //             options[id].map((item)=>{
    //             if (item.value==selectedValue[id]){
    //                 setSelected(item?.label)
    //                 setSearch(item?.label)
    //             }
    //         })
    //     }
    //     else{
    //         setSelected('')
    //         setSearch('')
    //     }}
    // },[])

    useEffect(() => {
        if(id  == 'transaction_unit' && options['unit']){
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
 
    
    // useEffect(() => {
    //     if(options[id]?.length || id == 'transaction_unit'){
    //         if(id == 'transaction_unit'){
    //             setTempList([...options['unit'],])}
    //         else
    //             setTempList([...options[id],])
    // if (selectedValue[id]){
    //     options[id]?.map((item)=>{
    //         if (item.value==selectedValue[id]){
    //             setSelected(item?.label)
    //             setSearch(item?.label)
    //         }
    //     })
    // }
    // else{
    //     setSelected('')
    //     setSearch('')
    // }}
    // }, [options])

    // useEffect(() => {
    //     if (showDropdown === id) {
    //         setShow(true);
    //     }
    //     else {
    //         setShow(false);
    //     }
    // }, [showDropdown])


    const handleSearch = (e) => {
        setSearch(e.target.value)
        setShow(true)
        var filteredList = options[id]?.filter(item => item?.label?.toLowerCase().search(e.target.value.toLowerCase()) > -1)
        setTempList(filteredList)
    }

    const handleNewOption = (e) => {
        const data = { value: search, label: search }
        // dropdownRef.current.scrollTo({ top: 0, behavior: 'smooth' })
        setSelected(search)
        if(edit){
            setNew(e,search,id,edit)
        }else{
            setNew(e,data,id)
        }
        setShow(false)
        setDataValue((data)=>({...data, [id]:search}))
        setShowDropdown('')
    }

    // const handleSelect = (e,item) => {
    //     console.log("first")
    //         e.preventDefault()
    //         dropdownRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    //         setSelected(item?.label)
    //         setSearch(item?.label)
    //         if(id==='transaction_unit')
    //         setDataValue((data)=>({...data, [id]:item.label.toUpperCase()}))
    //     else
    //     setDataValue((data)=>({...data, [id]:item.value}))
    //     handleDropdown(e,'1')
// }

    const handleReset = () => {
        setSelected(null)
        setShowDropdown('')
        setShow(false)
        setSearch('')
    }

    // const moveDown = (e) => {
    //     if (dropRef?.nextSibling && e.key === "ArrowDown") {
    //         if(e.target && dropRef)
    //         dropRef.className = 'dropdown-option-data'
    //             dropRef.nextSibling.className = 'dropdown-option-data selected'
    //             setDropRef(dropRef?.nextSibling)
    //     }else if(e.key === "ArrowUp" && dropRef?.previousSibling?.className !== "dropdown-option-data add"){
    //         if(e.target && dropRef)
    //             dropRef.className = 'dropdown-option-data'
    //         dropRef.previousSibling.className = 'dropdown-option-data selected'
    //         dropRef.previousSibling.focus()
    //         setDropRef(dropRef.previousSibling)
    //     }else if(e.key === "Enter"){
    //         e.preventDefault()
    //         console.log(e.target.nextElementSibling.childNodes)
    //     }
    //   }

    const handleChange = (e) =>{
        setDataValue(data=>({...data,[id]:e.value}))
    }

    const handleEdit = (data) =>{
        console.log(data)
        setSearch(data.label)
        setEdit(data.id)
    }

    const handleClose = () =>{
        setShow(false)
        setSearch(null)
        setEdit(false)
    }

    return (
        <Form.Group className={`search_container ${containerClass}`}>
            {/* <div className='align-items-start gap-2 d-flex w-100'> */}
                    <Dropdown
                    placeholder='select'
                    filter={!noSearch}
                    editable
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    value={search}
                    // onChange={handleChange}
                    className='drop_input mx-0'
                    options={tempList}
                    />
                    {!noAdd&&<div
                        className='dropdown-btn my-0'
                        onClick={()=>setShow(!show)}>
                      <div className='pb-1'>+</div>
                    </div>}
            {/* </div> */}
            <Modal
            size='md'
            centered
            onHide={handleClose}
            show={show}
            contentClassName='search-dropdown'
            >
                <Modal.Body className='dropdown-body p-0 pb-2'>
                        <div className='dropdown-header'>Add Design</div>
                        <div className='px-4 pt-1 w-100'>
                             <div className='position-relative align-items-center d-flex mt-2'>
                                <input onChange={handleSearch} placeholder='Add category here' type='text'
                                 className='item_input height ms-0 position-relative' value={search}/>
                                <div onClick={handleNewOption} className='btn drop-add-btn py-0'>{edit?"Edit":"Add"}</div>
                            </div>
                            <div className='dropdown-add-items rounded-2 p-2 pb-1 mt-4'>
                                {tempList?.length>0?
                                tempList.map((item)=>(

                                    <div className='dropdown-add-item ms-0 mb-2 p-1 px-2'>
                                    {item.label}<img onClick={()=>handleEdit(item)} className='cursor' src={editBtn}/></div>                        
                                        )
                                ):<div className='dropdown-add-item ms-0 mb-2 p-1 px-2'>No Item Added yet</div>}
                            </div>
                        </div>
                </Modal.Body>
            </Modal>
        </Form.Group>
    )
}

export default SearchDropDown
