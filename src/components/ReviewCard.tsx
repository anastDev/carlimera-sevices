interface ReviewCardProps {
    quote: string;
    author: string;
}

export const ReviewCard = ({quote, author} : ReviewCardProps) => {
    return (
        <div className="min-w-[13.75rem] rounded-2xl bg-orange-50/50 p-4">
            <p className="mb-2 text-sm italic text-gray-800">"{quote}"</p>
            <p className="text-xs text-gray-500">- {author}</p>
        </div>
    );
}

export default ReviewCard;