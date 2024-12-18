const Post = () => {
    return (
        <>
            <div className="flex flex-col justify-center p-6  ">
                <div className="flex justify-between items-center bg-white gap-3 border rounded-2xl p-2">
                    <div>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs"/>
                    </div>
                    <div>
                    <button className="btn-home">Post</button>
                    </div>
                </div>

            </div>
        </>
    )
}
export default Post;