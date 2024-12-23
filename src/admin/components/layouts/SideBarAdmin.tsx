import {
    MdAnalytics,
    MdAttachMoney,
    MdDashboard,
    MdHelpCenter,
    MdOutlineSettings,
    MdPeople,
    MdShoppingBag,
    MdSupervisedUserCircle,
    MdWork
} from "react-icons/md";
import { NavLink } from "react-router-dom"; // Utiliser NavLink pour gérer l'active state

const SideBarAdmin = () => {
    const menuItems = [
        {
            title: "Pages",
            list: [
                { title: "Dashboard", path: "/admin", icon: <MdDashboard /> },
                { title: "Users", path: "/admin/users", icon: <MdSupervisedUserCircle /> },
                { title: "Centre de vacance", path: "/admin/resort", icon: <MdShoppingBag /> },
                { title: "Hebergements", path: "/admin/hebergement", icon: <MdAttachMoney /> },
                { title: "Options", path: "/admin/options", icon: <MdAttachMoney /> },
            ],
        },
        {
            title: "Analytics",
            list: [
                { title: "Réservations", path: "/admin/reservations", icon: <MdWork /> },
                { title: "Paiements", path: "/admin/paiement", icon: <MdAnalytics /> },
                { title: "Clients", path: "/admin/clients", icon: <MdPeople /> },
            ],
        },
        {
            title: "User",
            list: [
                { title: "Settings", path: "/dashboard/settings", icon: <MdOutlineSettings /> },
                { title: "Log Out", path: "/dashboard/help", icon: <MdHelpCenter /> },
            ],
        },
    ];

    return (
        <div className="flex flex-col gap-5 justify-center w-full p-4 items-center  ">
            {/* Avatar and Title */}
            <div className="flex flex-col  gap-5 items-center">
                <div role="button" className="btn btn-ghost w-20 btn-circle avatar">
                    <div className="w-20 rounded-full">
                        <img
                            alt="Tailwind CSS Navbar component"
                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        />
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl mt-1 font-bold">Admin Dashboard</h2>
                </div>
            </div>

            {/* Menu */}
            <div className="w-full">
                <ul className="space-y-1">
                    {menuItems.map((cat) => (
                        <li key={cat.title}>
                            <span className="text-lg font-semibold text-gray-400">{cat.title}</span>
                            <ul className="mt-1 space-y-1">
                                {cat.list.map((item) => (
                                    <li key={item.title}>
                                        <NavLink
                                            to={item.path}
                                            className={({ isActive }) =>
                                                `flex items-center gap-5 py-2 px-4 rounded-lg 
                                                ${isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-500 hover:text-white'}`
                                            }
                                        >
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SideBarAdmin;
