import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";
import {faqs} from "@/data/faqData.ts";

export const FaqSection = () => {
    return (
        <div className="mt-6">
            <h2 className="mb-4 text-xl sm:text-2xl font-semibold text-foreground">Frequently Asked Questions</h2>
            <Accordion defaultValue={["item-1"]} multiple className="rounded-lg">
                {faqs.map((faq, index) => (
                    <AccordionItem key={faq.value} value={`faq-${index}`} className="px-4">
                        <AccordionTrigger className="text-sm sm:text-base">{faq.trigger}</AccordionTrigger>
                        <AccordionContent className="text-sm sm:text-[0.9rem] text-muted-foreground">{faq.content}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}

export default FaqSection;