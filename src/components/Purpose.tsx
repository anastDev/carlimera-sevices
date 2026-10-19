export const Purpose = ({
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
    <div className="rounded-lg border border-border p-4 space-y-1.5">
        <h3 className="font-semibold text-foreground">{heading}</h3>
        <p><span className="font-medium">What:</span> {what}</p>
        <p><span className="font-medium">Why:</span> {why}</p>
        <p><span className="font-medium">Lawful basis:</span> {basis}</p>
        <p><span className="font-medium">Do you have to provide it?</span> {required}</p>
    </div>
);

export default Purpose;