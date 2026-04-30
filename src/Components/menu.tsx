import { Link } from "react-router"

export default function Menu() {
    return (
        <div className="flex items-center justify-center flex-row h-30 w-screen text-5xl gap-5 text-gray-200">
            <Link to="/" className="flex">
                Home
            </Link>
            <Link to="/news" className="flex">
                News
            </Link>
            <Link to="/accounts" className="flex">
                Accounts
            </Link>
        </div>
    )
}