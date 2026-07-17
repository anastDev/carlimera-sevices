import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb.tsx";

const steps = [
    {
        number: "01",
        title: "Search Your Dream Car",
        description: "Browse the full selection of quality used vehicles for one that fits your lifestyle and budget.",
    },
    {
        number: "02",
        title: "Check Price With Features",
        description: "Compare prices and features to find the best value for your needs.",
    },
    {
        number: "03",
        title: "Contact Vendor",
        description: "Get in touch directly for enquiries, availability and support - or just book a viewing online.",
    },
];

export const AboutPage = ()=>  {
    return (
        <>
           <section className="container mx-auto max-w-7xl px-4 pb-8 mt-12 sm:mt-20 sm:px-6 lg:px-8">
               <div>
                   {/* Breadcrumb */}
                   <Breadcrumb>
                       <BreadcrumbList>
                           <BreadcrumbItem>
                               <BreadcrumbLink href="/" className="text-gray-400 hover:text-orange-400">
                                   Home
                               </BreadcrumbLink>
                           </BreadcrumbItem>
                           <BreadcrumbSeparator className="text-gray-400" />
                           <BreadcrumbItem>
                               <BreadcrumbPage className="text-gray-400">About Us</BreadcrumbPage>
                           </BreadcrumbItem>
                       </BreadcrumbList>
                   </Breadcrumb>
               </div>

               <div className="mt-4">
                   <h1 className="mb-4 text-2xl font-semibold text-blue-950">
                       Why Did You Choose CARlimera Services Ltd?
                   </h1>
                   <p className="mb-8 max-w-2xl text-sm leading-relaxed text-gray-500">
                       If you're shopping for a second-hand car, chances are you already know roughly what make, model
                       and features you're after. CARlimera keeps that process simple: their team supports you at
                       every stage of buying, not just at the point of sale.
                   </p>

                   <h2 className="mb-4 text-sm font-semibold text-gray-900">How It Works</h2>
                   <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                       {steps.map((step) => (
                           <div key={step.number} className="rounded-xl bg-orange-50/40 p-5">
                               <p className="mb-2 text-xs font-semibold text-blue-700">{step.number}</p>
                               <p className="mb-1 text-sm font-semibold text-gray-900">{step.title}</p>
                               <p className="text-xs text-gray-500">{step.description}</p>
                           </div>
                       ))}
                   </div>
               </div>
           </section>
        </>
    );
}

export default AboutPage;