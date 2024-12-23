import Header from "../../components/layouts/Header.tsx";
import SideBar from "../../components/layouts/SideBar.tsx";
import Post from "../../components/home/Post.tsx";
import PublishedPost from "../../components/home/PublishedPost.tsx";
import RightSide from "../../components/home/RightSide.tsx";

const Home = () => {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <div className="fixed top-0 left-0 w-full bg-white  z-50 shadow-amber-50 border">
                    <Header/>
                </div>


                <div className="flex flex-row h-full flex-1 mt-[70px]">
                    {/* Sidebar */}
                    <div className="fixed top-[70px] pt-10 left-0 w-1/5 h-[calc(100vh-64px)] bg-white overflow-y-auto border-r">
                        <SideBar/>
                    </div>

                    {/* Main Content */}
                    <div className="flex flex-col w-3/6 ml-[20%] border h-full bg-gray-100 px-20">
                        <Post/>
                        <PublishedPost/>
                    </div>

                    {/* Messages */}
                    <div className="w-full border pt-10 border-gray-200">
                        <RightSide/>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Home;