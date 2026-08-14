import {Loader2} from "lucide-react";

interface ListStateProps {
    isLoading: boolean;
    error: string | null;
    isEmpty: boolean;
    emptyMessage: string;
}

export const  ListState = ({ isLoading, error, isEmpty, emptyMessage }: ListStateProps)=>  {
    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-16 text-gray-400">
                <Loader2 className="h-6 w-6 animate-spin" aria-hidden="true" />
                <span className="sr-only">Loading</span>
            </div>
        );
    }

    if (error) {
        return (
            <div role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
            </div>
        );
    }

    if (isEmpty) {
        return (
            <div className="rounded-lg border border-dashed border-gray-300 py-16 text-center text-sm text-gray-400">
                {emptyMessage}
            </div>
        );
    }

    return null;
}

export default ListState;