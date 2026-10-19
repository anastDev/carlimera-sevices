const SITE_URL = "https://www.carlimeraservices.co.uk";
const SITE_NAME = "CARlimera Services";
const DEFAULT_IMAGE = `${SITE_URL}/carlimera-logo.png`;

interface SeoProps {
    title: string;
    description: string;
    path: string;
    image?: string;
    noindex?: boolean;
}


export const Seo = ({ title, description, path, image = DEFAULT_IMAGE, noindex = false }: SeoProps) => {
    const url = `${SITE_URL}${path}`;
    const fullTitle = `${title} | ${SITE_NAME}`;

    return (
        <>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={url} />
            {noindex && <meta name="robots" content="noindex" />}

            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={image} />
        </>
    );
};

export default Seo;