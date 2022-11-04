import { EDPKubeObjectInterface } from '../../types/k8s';

export interface ApplicationOperation {
    info?: {
        name: string;
        value: string;
    }[];
    initiatedBy?: {
        automated?: boolean;
        username?: string;
    };
    retry?: {
        backoff?: {
            duration?: string;
            factor?: number;
            maxDuration?: string;
        };
        limit?: number;
    };
    sync?: {
        dryRun?: boolean;
        manifests?: string[];
        prune?: boolean;
        resources?: {
            group?: string;
            kind: string;
            name: string;
            namespace?: string;
        }[];
        revision?: string;
        source?: {
            chart?: string;
            directory?: {
                exclude?: string;
                include?: string;
                jsonnet?: {
                    extVars?: {
                        code?: boolean;
                        name: string;
                        value: string;
                    }[];
                    libs?: string[];
                    tlas?: {
                        code?: boolean;
                        name: string;
                        value: string;
                    }[];
                };
                recurse?: boolean;
            };
            helm?: {
                fileParameters?: {
                    name?: string;
                    path?: string;
                }[];
                ignoreMissingValueFiles?: boolean;
                parameters?: {
                    forceString?: boolean;
                    name?: string;
                    value?: string;
                }[];
                passCredentials?: boolean;
                releaseName?: string;
                skipCrds?: boolean;
                valueFiles?: string[];
                values?: string;
                version?: string;
            };
            kustomize?: {
                commonAnnotations?: {
                    additionalProperties?: string;
                };
                commonLabels?: {
                    additionalProperties?: string;
                };
                forceCommonAnnotations?: boolean;
                forceCommonLabels?: boolean;
                images?: string[];
                namePrefix?: string;
                nameSuffix?: string;
                version?: string;
            };
            path?: string;
            plugin?: {
                env?: {
                    name: string;
                    value: string;
                }[];
                name: string;
            };
            repoURL: string;
            targetRevision?: string;
        };
        syncOptions?: string[];
        syncStrategy?: {
            apply?: {
                force?: boolean;
            };
            hook?: {
                force?: boolean;
            };
        };
    };
}

export interface ApplicationSpec {
    destination: {
        name?: string;
        namespace?: string;
        server?: string;
    };
    ignoreDifferences?: {
        group?: string;
        jqPathExpressions?: string[];
        jsonPointers?: string[];
        kind: string;
        managedFieldsManagers?: string[];
        name?: string;
        namespace?: string;
    }[];
    info?: {
        name: string;
        value: string;
    }[];
    project: string;
    revisionHistoryLimit?: number;
    source: {
        chart?: string;
        directory?: {
            exclude?: string;
            include?: string;
            jsonnet?: {
                extVars?: {
                    code?: boolean;
                    name: string;
                    value: string;
                }[];
                libs?: string[];
                tlas?: {
                    code?: boolean;
                    name: string;
                    value: string;
                }[];
            };
            recurse?: boolean;
        };
        helm?: {
            fileParameters?: {
                name?: string;
                path?: string;
            }[];
            ignoreMissingValueFiles?: boolean;
            parameters?: {
                forceString?: boolean;
                name?: string;
                value?: string;
            }[];
            passCredentials?: boolean;
            releaseName?: string;
            skipCrds?: boolean;
            valueFiles?: string[];
            values?: string;
            version?: string;
        };
        kustomize?: {
            commonAnnotations?: {
                additionalProperties?: string;
            };
            commonLabels?: {
                additionalProperties?: string;
            };
            forceCommonAnnotations?: boolean;
            forceCommonLabels?: boolean;
            images?: string[];
            namePrefix?: string;
            nameSuffix?: string;
            version?: string;
        };
        path?: string;
        plugin?: {
            env?: {
                name: string;
                value: string;
            }[];
            name: string;
        };
        repoURL: string;
        targetRevision?: string;
    };
    syncPolicy?: {
        automated?: {
            allowEmpty?: boolean;
            prune?: boolean;
            selfHeal?: boolean;
        };
        retry?: {
            backoff?: {
                duration?: string;
                factor?: number;
                maxDuration?: string;
            };
            limit?: number;
        };
        syncOptions?: string[];
        syncStrategy?: {
            apply?: {
                force?: boolean;
            };
            hook?: {
                force?: boolean;
            };
        };
    };
}

export interface ApplicationStatus {
    error?: string;
    status?: string;
}

export interface ApplicationKubeObjectInterface extends EDPKubeObjectInterface {
    spec: ApplicationSpec;
    operation?: ApplicationOperation;
    status?: ApplicationStatus;
}
