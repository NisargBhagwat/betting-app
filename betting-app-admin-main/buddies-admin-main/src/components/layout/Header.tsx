const Header = ({ toggleSideBar }: any) => {
    return (
        <>
            <header className="header-area d-none d-lg-block">
            </header>
            <div className="mobile-header d-block d-lg-none">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-3">
                            <div className="toggle-bar">
                                <div className="menu-bar">
                                    <span className="flaticon-menu" onClick={() => toggleSideBar()} /></div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="page-title text-center">
                                <h2 className="title">Welcome</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header