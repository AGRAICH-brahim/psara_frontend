import { MdNotifications, MdOutlineChat, MdPublic, MdSearch } from "react-icons/md";

const HeaderAdmin = () => {

    return (
        <div className="flex items-center justify-between p-4 px-10 bg-gray-50 border-2 rounded-lg w-full flex-wrap">
            {/* Title Section */}
            <div className="text-textSoft font-bold capitalize">
                <h1>Admin</h1>
            </div>

            {/* Menu Section */}
            <div className="flex items-center gap-5 flex-wrap">
                {/* Search Box */}
                <div className="flex items-center gap-2 bg-[#2e374a] p-2 rounded-lg">
                    <MdSearch className="text-white" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent border-none text-text w-36"
                    />
                </div>

                {/* Icons */}
                <div className="flex items-center gap-5">
                    <MdOutlineChat size={20} className="" />
                    <MdNotifications size={20} className="" />
                    <MdPublic size={20} className="" />
                </div>
            </div>
        </div>
    );
};

export default HeaderAdmin;
