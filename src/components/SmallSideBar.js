import Wrapper from "../assets/wrappers/SmallSidebar.js";
import {FaTimes} from "react-icons/fa";
import Logo from "./Logo";
import {useAppContext} from "../context/appContext";
import links from "../utils/links";
import {NavLink} from "react-router-dom";
import NavLinks from "./NavLinks";

const SmallSideBar = () => {
    const {toggleSidebar, showSideBar} = useAppContext()
    return(
        <Wrapper>
            <div className={showSideBar ? "sidebar-container show-sidebar" : "sidebar-container"}>
                <div className="content">
                    <button type="button" className="close-btn" onClick={() => {toggleSidebar()}}>
                        <FaTimes/>
                    </button>
                    <header>
                        <Logo/>
                    </header>
                    <NavLinks toggleSidebar={toggleSidebar}/>
                </div>
            </div>
        </Wrapper>

    )
}

export default SmallSideBar
