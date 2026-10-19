import type {ReactNode} from "react";
import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

interface PolicySectionProps {
    value: string;
    title: string;
    children: ReactNode;
}

export const PolicySection = ({ value, title, children }: PolicySectionProps) => (
    <AccordionItem value={value} className="px-4">
        <AccordionTrigger className="text-sm sm:text-base">{title}</AccordionTrigger>
        <AccordionContent className="space-y-3 text-sm sm:text-[0.9rem] leading-relaxed text-muted-foreground">
            {children}
        </AccordionContent>
    </AccordionItem>
);

export default PolicySection;