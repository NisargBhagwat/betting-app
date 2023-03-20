import { ReactNode, useState } from 'react'
import Header from '../../components/layout/Header'
import SideBar from '../../components/layout/SideBar'
interface Props {
    children: ReactNode
}

export const Root = (props: Props) => {
    const [isShowSidebar, SetIsShowSidebar] = useState(false);

    const toggleSideBar = () => {
        SetIsShowSidebar(!isShowSidebar);
    }

    return (
        <>
            <SideBar showSideBar={isShowSidebar}/>
            <div className={`main-content-wraper`}>
                <Header toggleSideBar={toggleSideBar} />
                {props.children}
            </div>
            <div className={`body-overlay ${isShowSidebar && "active"}`} onClick={() => toggleSideBar()}></div>
        </>
    )
}
