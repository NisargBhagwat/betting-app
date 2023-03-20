import userSvg from "../../assets/images/icons/user.svg";
import historySvg from "../../assets/images/icons/history.svg"
import querySvg from "../../assets/images/icons/query.svg";
import homeSvg from "../../assets/images/icons/home.svg";
import { Link, useLocation, useNavigate } from 'react-router-dom';

const sideBarPages = [
    {
        title: "Buddies",
        svg: homeSvg,
        url: "/"
    },
    {
        title: "Yantra",
        svg: homeSvg,
        url: "/yantra"
    },
    {
        title: "History",
        svg: historySvg,
        url: "/history"
    },
    {
        title: "Users",
        svg: userSvg,
        url: "/users"
    },
    {
        title: "Queries",
        svg: querySvg,
        url: "/query"
    },
    {
        title: "Transactions",
        svg: querySvg,
        url: "/transactionReqs"
    },
    {
        title: "Withdraws",
        svg: querySvg,
        url: "/withdrawReqs"
    },
    {
        title: "Refer Earn",
        svg: querySvg,
        url: "/referEarn"
    },
    {
        title: "Account",
        svg: querySvg,
        url: "/account"
    },
]

const SideBar = ({ showSideBar }: any) => {
    const navigate = useNavigate();
    const location = useLocation();

    const logOutHandler = () => {
        localStorage.removeItem("jwt");
        navigate('/signIn');
    }

    return (
        <div className={`main-sidebar ${showSideBar && "show"}`}>
            <div className="sidebar-wrap scrollbar-inner">
                <div className="brand-area">
                    <Link to={"/"}><img src={require("../../assets/images/BuddiesIcon.png")} alt="medico" /></Link>
                </div>
                <nav className="menu-area ">
                    <ul>
                        {
                            sideBarPages.map((page: any, index: number) => (
                                <li className={`${page.url == location.pathname && "current-menu-item"}`} key={index}>
                                    <Link className='has-arrow' to={page.url}><img src={page.svg} alt={page.title}
                                        style={{
                                            marginRight: "1rem",
                                            paddingBottom: "0.5rem"
                                        }} />{page.title}</Link>
                                </li>
                            ))

                        }
                        {
                            <li className="has-arrow">
                                <Link className='has-arrow' to={'/signIn'} onClick={logOutHandler}>
                                    <img src={querySvg} alt="home"
                                        style={{
                                            marginRight: "1rem",
                                            paddingBottom: "0.5rem"
                                        }} />
                                    Logout
                                </Link>
                            </li>
                        }
                    </ul>
                </nav>
            </div>
        </div >
    )
}

export default SideBar