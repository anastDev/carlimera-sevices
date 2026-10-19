import {type ReactNode} from "react";
import Seo from "@/components/Seo.tsx";
import PolicySection from "@/components/PolicySection.tsx";
import {Accordion} from "@/components/ui/accordion";
import {container} from "@/utils/transitions.ts";
import Breadcrumb from "@/components/smoothui/breadcrumb";
import {motion} from "framer-motion";

const LAST_UPDATED = "19 October 2026";
const EMAIL = "kalimeraservices@gmail.com";

const breadcrumbItems = [
    { label: "Home", value: "/" },
    { label: "Privacy Policy" },
];

const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.5, ease: "easeOut" },
} as const;

const ExternalLink = ({ href, children }: { href: string; children: ReactNode }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-primary underline underline-offset-2"
    >
        {children}
    </a>
);

const Purpose = ({
                     heading,
                     what,
                     why,
                     basis,
                     required,
                 }: {
    heading: string;
    what: string;
    why: string;
    basis: string;
    required: string;
}) => (
    <div className="rounded-lg border border-border bg-background p-4 shadow-sm space-y-1.5">
        <h3 className="text-sm font-bold text-foreground">{heading}</h3>
        <p><span className="font-semibold text-foreground/80">What:</span> {what}</p>
        <p><span className="font-semibold text-foreground/80">Why:</span> {why}</p>
        <p><span className="font-semibold text-foreground/80">Lawful basis:</span> {basis}</p>
        <p><span className="font-semibold text-foreground/80">Do you have to provide it?</span> {required}</p>
    </div>
);

export const PrivacyPolicy = () => {

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="container mx-auto max-w-7xl px-4 pb-10 mt-12 sm:mt-20 sm:px-6 lg:px-8"
        >
            <Seo
                title="Privacy Policy"
                description="How CARlimera Services collects, uses and protects your personal information, and your rights under UK data protection law."
                path="/privacy"
            />

            <Breadcrumb items={breadcrumbItems} className="hover:text-primary" />

            <div className="max-w-3xl">
                <motion.div variants={fadeUp} className="my-6 space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                        Privacy Policy
                    </h1>
                    <p className="text-sm text-muted-foreground">Last updated: {LAST_UPDATED}</p>
                    <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                        This policy explains what personal information Carlimera Services Ltd
                        collects, why we collect it and your rights. We never sell your information,
                        and we only use analytics if you agree to it.
                    </p>
                </motion.div>

                <motion.div variants={fadeUp}>
                    <Accordion multiple className="rounded-lg">
                        <PolicySection value="who-we-are" title="1. Who we are">
                            <p>
                                <strong className="text-foreground">Carlimera Services Ltd</strong> is
                                the data controller for the information described in this policy.
                            </p>
                            <ul className="space-y-1">
                                <li>Opp 115 Max Road, Coventry, West Midlands, CV6 1EL</li>
                                <li>
                                    <a href={`mailto:${EMAIL}`} className="font-medium text-primary underline underline-offset-2">
                                        {EMAIL}
                                    </a>
                                    {" · "}
                                    <a href="tel:07469292183" className="font-medium text-primary underline underline-offset-2">
                                        07469 292183
                                    </a>
                                </li>
                            </ul>
                            <p>
                                We are not required to appoint a Data Protection Officer. For any
                                privacy question, contact us using the details above.
                            </p>
                        </PolicySection>

                        <PolicySection value="scope" title="2. When this policy applies">
                            <p>This policy covers personal information we collect when you:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>visit or use carlimeraservices.co.uk</li>
                                <li>contact us by phone, email, text or through our contact form</li>
                                <li>visit our premises or take a test drive</li>
                                <li>enquire about one of our vehicles through a third-party site such as Autotrader</li>
                                <li>interact with our YouTube channel</li>
                            </ul>
                            <p>
                                In this policy, “data protection law” means the UK General Data
                                Protection Regulation (UK GDPR), the Data Protection Act 2018 and the
                                Privacy and Electronic Communications Regulations 2003 (PECR).
                            </p>
                        </PolicySection>

                        <PolicySection value="what-we-collect" title="3. What we collect and why">
                            <Purpose
                                heading="Booking a viewing or test drive"
                                what="Your name, email address, phone number, and the vehicle, date and time you choose. Optionally, your postcode: we keep only the first half (for example “CV6”)."
                                why="To arrange your appointment and contact you if anything changes. The postcode area helps us plan delivery and understand where our customers come from."
                                basis="Contract (UK GDPR Article 6(1)(b)) for the appointment details; legitimate interests (Article 6(1)(f)) for the postcode area."
                                required="Name, email and phone: yes, or we can't book your appointment. Postcode: no, it's optional."
                            />
                            <Purpose
                                heading="Contacting us"
                                what="Your name, contact details and what you tell us, whether by form, email, phone or in person."
                                why="To answer your question and help you find a vehicle."
                                basis="Legitimate interests (Article 6(1)(f)): responding to people who contact us."
                                required="Only if you want a reply."
                            />
                            <Purpose
                                heading="Using the delivery calculator"
                                what="Your postcode. It is used to estimate a distance and is not stored. We keep only the first half (for example “CV6”), which covers thousands of addresses and does not identify you."
                                why="To give you an estimate, and to see which areas our enquiries come from."
                                basis="Legitimate interests (Article 6(1)(f)): providing estimates and understanding our market."
                                required="No. The calculator is optional."
                            />
                            <Purpose
                                heading="Buying a vehicle"
                                what="Your name, address, contact details, payment and finance details, and part-exchange vehicle information."
                                why="To complete the sale, register the vehicle, and meet our legal and accounting obligations."
                                basis="Contract (Article 6(1)(b)) and legal obligation (Article 6(1)(c))."
                                required="Yes. We cannot complete a sale without them."
                            />
                            <Purpose
                                heading="Website analytics"
                                what="A random identifier stored in your browser, the vehicle pages it viewed, and your approximate town or city, estimated from your internet connection. We don't store your IP address, and none of this is linked to your name, email or any booking."
                                why="To understand which vehicles and pages people find most useful and which areas our visitors come from, so we can improve our website, our listings and the cars we stock."
                                basis="Consent (Article 6(1)(a)), given through our cookie banner."
                                required="No. If you decline, nothing is stored and the site works the same."
                            />
                            <p>
                                We do not use your information for automated decision-making or
                                profiling that has legal or similarly significant effects on you.
                            </p>
                        </PolicySection>

                        <PolicySection value="other-sources" title="4. Information we receive from others">
                            <p>
                                If you enquire about one of our vehicles on Autotrader or a similar
                                site, that site passes us the details you gave it, usually your name,
                                contact details and message. We use them only to reply to your
                                enquiry, on the basis of legitimate interests. Their own privacy policy
                                explains how they handle your data.
                            </p>
                        </PolicySection>

                        <PolicySection value="cookies" title="5. Cookies and similar technologies">
                            <p>
                                We only store non-essential information on your device with your
                                consent. We use:
                            </p>
                            <div className="overflow-x-auto rounded-lg border border-border bg-background">
                                <table className="w-full text-left text-xs">
                                    <thead className="bg-muted/50 text-foreground/80">
                                    <tr>
                                        <th className="p-3 font-semibold">Name</th>
                                        <th className="p-3 font-semibold">Type</th>
                                        <th className="p-3 font-semibold">Purpose</th>
                                        <th className="p-3 font-semibold">Duration</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                    <tr>
                                        <td className="p-3 font-mono">analytics_consent</td>
                                        <td className="p-3">Strictly necessary</td>
                                        <td className="p-3">Remembers your cookie choice</td>
                                        <td className="p-3">Until you clear your browser data</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3 font-mono">visitor_id</td>
                                        <td className="p-3">Analytics (consent)</td>
                                        <td className="p-3">Helps us understand which vehicles and pages are most useful, to improve the site</td>
                                        <td className="p-3">Until you withdraw consent; view records deleted after 12 months</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3">Google Maps</td>
                                        <td className="p-3">Third party</td>
                                        <td className="p-3">Shows our location on the Contact page</td>
                                        <td className="p-3">Set by Google</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3">YouTube</td>
                                        <td className="p-3">Third party</td>
                                        <td className="p-3">Plays vehicle walkaround videos</td>
                                        <td className="p-3">Set by Google</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p>
                                Google Maps and YouTube may set their own cookies. See{" "}
                                <ExternalLink href="https://policies.google.com/privacy">
                                    Google's privacy policy
                                </ExternalLink>
                                .
                            </p>
                        </PolicySection>

                        <PolicySection value="sharing" title="6. Who we share it with">
                            <p>
                                We never sell your information. We share it only with providers who
                                help us run the business, under contracts requiring them to act on our
                                instructions and keep it secure:
                            </p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li><strong className="text-foreground">MongoDB Atlas</strong>: database hosting</li>
                                <li><strong className="text-foreground">Vercel</strong>: website hosting</li>
                                <li><strong className="text-foreground">Resend</strong>: sending emails</li>
                                <li><strong className="text-foreground">Google Firebase</strong>: storing vehicle photos</li>
                                <li><strong className="text-foreground">postcodes.io</strong>: postcode lookups for delivery estimates</li>
                            </ul>
                            <p>
                                When you buy a vehicle, we may also share details with the DVLA,
                                finance providers you choose to use, and warranty providers. We will
                                share information where the law requires it, for example with HMRC or
                                the police.
                            </p>
                        </PolicySection>

                        <PolicySection value="transfers" title="7. International transfers">
                            <p>
                                Some providers store or process data outside the UK, including in the
                                United States and the European Economic Area. These transfers are
                                protected by UK adequacy regulations (including the UK-US data bridge
                                for certified organisations), the ICO's International Data Transfer
                                Agreement, or the UK Addendum to the EU Standard Contractual Clauses.
                            </p>
                        </PolicySection>

                        <PolicySection value="retention" title="8. How long we keep it">
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Appointment details: 24 months, then deleted automatically</li>
                                <li>Enquiries: up to 12 months after our last contact with you</li>
                                <li>Analytics view records: 12 months, then deleted automatically</li>
                                <li>Delivery area data (for example “CV6”): 24 months, then deleted automatically</li>
                                <li>Sales records: 6 years, as required by HMRC</li>
                            </ul>
                        </PolicySection>

                        <PolicySection value="security" title="9. Keeping it secure">
                            <p>
                                Data is encrypted in transit (HTTPS), our admin system is
                                password-protected and limited to our staff, and our providers use
                                industry-standard security. No system is completely secure, but we
                                take reasonable steps to protect your information.
                            </p>
                        </PolicySection>

                        <PolicySection value="rights" title="10. Your rights">
                            <p>Under data protection law, you have the right to:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li><strong className="text-foreground">Access</strong>: get a copy of the information we hold about you</li>
                                <li><strong className="text-foreground">Rectification</strong>: have inaccurate information corrected</li>
                                <li><strong className="text-foreground">Erasure</strong>: have your information deleted</li>
                                <li><strong className="text-foreground">Restriction</strong>: limit how we use it</li>
                                <li><strong className="text-foreground">Objection</strong>: object to uses based on legitimate interests</li>
                                <li><strong className="text-foreground">Portability</strong>: receive it in a common, machine-readable format</li>
                                <li><strong className="text-foreground">Withdraw consent</strong>: at any time, where we rely on consent</li>
                            </ul>
                            <p>
                                Some rights apply only in certain circumstances. Email{" "}
                                <a href={`mailto:${EMAIL}`} className="font-medium text-primary underline underline-offset-2">
                                    {EMAIL}
                                </a>{" "}
                                to make a request. We will respond within one month, normally free of
                                charge.
                            </p>
                        </PolicySection>

                        <PolicySection value="children" title="11. Children">
                            <p>
                                Our services are for adults. We do not knowingly collect information
                                from anyone under 18.
                            </p>
                        </PolicySection>

                        <PolicySection value="complaints" title="12. Complaints">
                            <p>
                                Please contact us first so we can try to put things right. You can
                                also complain to the Information Commissioner's Office at{" "}
                                <ExternalLink href="https://ico.org.uk/make-a-complaint">
                                    ico.org.uk/make-a-complaint
                                </ExternalLink>{" "}
                                or on 0303 123 1113.
                            </p>
                        </PolicySection>

                        <PolicySection value="changes" title="13. Changes to this policy">
                            <p>We may update this policy. The date at the top shows when it last changed.</p>
                        </PolicySection>
                    </Accordion>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default PrivacyPolicy;