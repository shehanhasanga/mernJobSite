import Wrapper from "../assets/wrappers/BigSidebar.js";
import {useAppContext} from "../context/appContext";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
const BigSideBar = () => {
    const {showSideBar, toggleSidebar} = useAppContext()
    return(
        <Wrapper>
            <div className={showSideBar? "sidebar-container show-sidebar" : "sidebar-container"}>
                <div className="content">
                    <header>
                        <Logo/>
                    </header>
                    <NavLinks toggleSidebar={toggleSidebar}/>
                </div>
            </div>

        </Wrapper>

    )
}

export default BigSideBar;
