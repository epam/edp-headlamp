export interface EDPComponentExternalLinkProps {
    icon: string;
    externalLink: string;
    name?: {
        label?: string;
        value?: string;
    };
    namespace?: string;
    enabledText?: string;
    noConfigurationLink?: boolean;
}
