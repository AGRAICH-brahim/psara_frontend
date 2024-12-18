import Header from "../../components/layouts/Header.tsx";
import SideBar from "../../components/layouts/SideBar.tsx";
import Post from "../../components/home/Post.tsx";
import PublishedPost from "../../components/home/PublishedPost.tsx";

const Home = () => {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Header/>

                <div className="flex flex-row h-full flex-1">
                    {/* Sidebar */}
                    <div className="w-1/5 h-full bg-white">
                        <SideBar/>
                    </div>

                    {/* Main Content */}
                    <div className="flex flex-col w-4/6 border h-full bg-gray-100 px-20">
                        <Post/>
                        <PublishedPost/>
                    </div>

                    {/* Messages */}
                    <div className="w-2/5 border-2 border-gray-200">
                        Messages
                    </div>
                </div>
            </div>


        </>
    )
}

export default Home;