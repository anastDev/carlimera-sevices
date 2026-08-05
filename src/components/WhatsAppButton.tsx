import {HoverBorderGradient} from "@/components/ui/hover-border-gradient.tsx";

import whatsapp from "../assets/whatsapp.svg";

const WHATSAPP_NUMBER="07469292183"
const WHATSAPP_MESSAGE=""

export const WhatsAppButton = () => {
    const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

    return (
    <a
        href={href}
        target="_blank"
        aria-label="Chat with us on WhatsApp"
        className="hidden lg:block fixed right-6 bottom-6 z-40"
        >
        <HoverBorderGradient
            containerClassName="rounded-full"
            as="div"
            className="flex items-center justify-center h-14 w-14 bg-[#25D366]"
        >
            <img src={whatsapp} alt="WhatsApp logo" className="h-6 w-6"/>
        </HoverBorderGradient>
</a>
);
};