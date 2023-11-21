import './header.css'
import arrow from "../../assets/icons/back_arrow.png"
import search from "../../assets/icons/search.png"
import setting from "../../assets/icons/setting.png"
import bell from "../../assets/icons/bell.png"
import { useNavigate } from 'react-router'

const Header = () =>{
    const navigate = useNavigate()
    return (
        <div className="header px-4 py-3 d-flex justify-content-between bg-dark text-light">
           <div className='prev_btn btn' onClick={()=>navigate(-1)}><img className='me-2' src={arrow} width={"7px"} height={"10px"}/>Back</div>
           <div className='d-flex gap-3 align-items-center'>
            <div className='seach_bar_cont rounded-2'><img src={search} className='search_img me-3 ms-2 py-2'/><input className='search_bar rounded-2 border-0 py-1' placeholder='Search'/></div>
            <div><img src={bell} className=''/></div>
            <div><img src={setting} className=''/></div>
           </div>
        </div>
    )
}

export default Header