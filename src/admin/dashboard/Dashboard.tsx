import SideBarAdmin from "../components/layouts/SideBarAdmin.tsx";
import HeaderAdmin from "../components/layouts/HeaderAdmin.tsx";
import Analytics from "../components/Analytics.tsx";

const Dashboard = () => {
    return (
        <>
            <div className="container flex gap-5 ">
                <div className="w-[300px] h-screen fixed border ">
                    <SideBarAdmin/>
                </div>
                <div className="flex flex-col ml-[330px] mt-2 mr-2 w-full h-full  ">
                    <div>
                        <HeaderAdmin/>
                    </div>
                    <div>
                        <Analytics/>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Dashboard;