import {useNavigate} from "react-router";
import { Button } from "@/components/ui/button.tsx"
import {FaLock} from "react-icons/fa";

interface UnauthorizedScreenProps {
    title?: string;
    message?: string;
}

export const UnauthorizedPage = ({title = "Access Denied", message = "You need to be logged in to access this page"}: UnauthorizedScreenProps) => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 max-w-md w-full">
                <div className="text-center mb-6">
                    <div className="mx-auto w-16 h-16 bg-red-900 rounded-full flex items-center justify-center mb-4">
                       <FaLock size={24} className="text-red-500"/>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-100">{title}</h2>
                    <p className="text-gray-400 mt-2">{message}</p>
                </div>

                <div className="space-y-3">
                    <Button
                        onClick={() => navigate('/')}
                        className="w-full bg-orange-500 text-gray-900 hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors"
                    >
                        Go to Homepage
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default UnauthorizedPage;