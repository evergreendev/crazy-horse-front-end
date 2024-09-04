/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
    collections: {
        users: User;
        media: Media;
        pages: Page;
        'payload-preferences': PayloadPreference;
        'payload-migrations': PayloadMigration;
    };
    globals: {
        navigation: Navigation;
        'site-options': SiteOption;
        hours: Hour;
        footer: Footer;
    };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
    id: number;
    role?: 'admin' | null;
    updatedAt: string;
    createdAt: string;
    email: string;
    resetPasswordToken?: string | null;
    resetPasswordExpiration?: string | null;
    salt?: string | null;
    hash?: string | null;
    loginAttempts?: number | null;
    lockUntil?: string | null;
    password: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
    id: number;
    alt?: string | null;
    updatedAt: string;
    createdAt: string;
    url?: string | null;
    filename?: string | null;
    mimeType?: string | null;
    filesize?: number | null;
    width?: number | null;
    height?: number | null;
    focalX?: number | null;
    focalY?: number | null;
    sizes?: {
        thumbnail?: {
            url?: string | null;
            width?: number | null;
            height?: number | null;
            mimeType?: string | null;
            filesize?: number | null;
            filename?: string | null;
        };
        card?: {
            url?: string | null;
            width?: number | null;
            height?: number | null;
            mimeType?: string | null;
            filesize?: number | null;
            filename?: string | null;
        };
        tablet?: {
            url?: string | null;
            width?: number | null;
            height?: number | null;
            mimeType?: string | null;
            filesize?: number | null;
            filename?: string | null;
        };
    };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages".
 */
export interface Page {
    id: number;
    intro_content?: {
        video?: string | null;
        images?:
            | {
            media?: number | Media | null;
            id?: string | null;
        }[]
            | null;
        header?: string | null;
        content?: string | null;
    };
    jump_menu?:
        | {
        title?: string | null;
        link?: {
            relationTo: 'pages';
            value: number | Page;
        } | null;
        internal_link?: string | null;
        id?: string | null;
    }[]
        | null;
    parent_page?: (number | null) | Page;
    full_path?: string | null;
    layout?:
        | (
        | {
        vertical_separator?: boolean | null;
        columns?:
            | {
            content?:
                | (
                | {
                media?: number | Media | null;
                id?: string | null;
                blockName?: string | null;
                blockType: 'MediaBlock';
            }
                | {
                heading_1?: string | null;
                heading_2?: string | null;
                heading_link?: {
                    link?: string | null;
                    label?: string | null;
                };
                body?: {
                    text?: {
                        root: {
                            type: string;
                            children: {
                                type: string;
                                version: number;
                                [k: string]: unknown;
                            }[];
                            direction: ('ltr' | 'rtl') | null;
                            format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                            indent: number;
                            version: number;
                        };
                        [k: string]: unknown;
                    } | null;
                    link_list?:
                        | {
                        link?: string | null;
                        label?: string | null;
                        id?: string | null;
                    }[]
                        | null;
                };
                id?: string | null;
                blockName?: string | null;
                blockType: 'TextBlock';
            }
                )[]
                | null;
            width?: ('1/3' | '2/3' | '1/2' | '1/4' | '3/4') | null;
            id?: string | null;
        }[]
            | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'column';
    }
        | {
        heading_1?: {
            text?: string | null;
            highlight?: boolean | null;
        };
        heading_2?: {
            text?: string | null;
            highlight?: boolean | null;
        };
        button?: {
            text?: string | null;
            type?: ('primary' | 'secondary' | 'highlight') | null;
            link?: {
                title?: string | null;
                external?: boolean | null;
                Relation?: {
                    relationTo: 'pages';
                    value: number | Page;
                } | null;
                external_url?: string | null;
            };
        };
        id?: string | null;
        blockName?: string | null;
        blockType: 'Breaker';
    }
        | {
        media?: number | Media | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'MediaBlock';
    }
        )[]
        | null;
    title: string;
    slug?: string | null;
    publishedAt?: string | null;
    featuredImage?: number | Media | null;
    updatedAt: string;
    createdAt: string;
    _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
    id: number;
    user: {
        relationTo: 'users';
        value: number | User;
    };
    key?: string | null;
    value?:
        | {
        [k: string]: unknown;
    }
        | unknown[]
        | string
        | number
        | boolean
        | null;
    updatedAt: string;
    createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
    id: number;
    name?: string | null;
    batch?: number | null;
    updatedAt: string;
    createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "navigation".
 */
export interface Navigation {
    id: number;
    items: {
        title?: string | null;
        external?: boolean | null;
        Relation?: {
            relationTo: 'pages';
            value: number | Page;
        } | null;
        external_url?: string | null;
        columns?:
            | {
            content?:
                | (
                | {
                item?: {
                    relationTo: 'pages';
                    value: number | Page;
                } | null;
                text?: string | null;
                buttonStyle?: ('primary' | 'secondary' | 'tertiary' | 'highlight' | 'text') | null;
                id?: string | null;
                blockName?: string | null;
                blockType: 'MenuButton';
            }
                | {
                headerItem?: {
                    title?: string | null;
                    external?: boolean | null;
                    Relation?: {
                        relationTo: 'pages';
                        value: number | Page;
                    } | null;
                    external_url?: string | null;
                };
                items?:
                    | {
                    title?: string | null;
                    external?: boolean | null;
                    Relation?: {
                        relationTo: 'pages';
                        value: number | Page;
                    } | null;
                    external_url?: string | null;
                    id?: string | null;
                }[]
                    | null;
                id?: string | null;
                blockName?: string | null;
                blockType: 'MenuWithSubMenu';
            }
                | {
                title?: string | null;
                external?: boolean | null;
                Relation?: {
                    relationTo: 'pages';
                    value: number | Page;
                } | null;
                external_url?: string | null;
                item?:
                    | {
                    image?: number | Media | null;
                    title?: string | null;
                    external?: boolean | null;
                    Relation?: {
                        relationTo: 'pages';
                        value: number | Page;
                    } | null;
                    external_url?: string | null;
                    id?: string | null;
                }[]
                    | null;
                id?: string | null;
                blockName?: string | null;
                blockType: 'photoMenu';
            }
                | {
                numberOfItemsToShow?: number | null;
                collectionsToPull?: ('pages' | 'events' | 'collections') | null;
                id?: string | null;
                blockName?: string | null;
                blockType: 'collectionCards';
            }
                )[]
                | null;
            width?: ('1/3' | '2/3' | '1/2' | '1/4' | '3/4') | null;
            id?: string | null;
        }[]
            | null;
        id?: string | null;
    }[];
    updatedAt?: string | null;
    createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "site-options".
 */
export interface SiteOption {
    id: number;
    siteTitle: string;
    siteDescription: string;
    siteLogo: number | Media;
    siteLogoSmall: number | Media;
    updatedAt?: string | null;
    createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "hours".
 */
export interface Hour {
    id: number;
    Schedules?:
        | {
        schedule_start?: string | null;
        schedule_end?: string | null;
        hours?:
            | {
            title?: string | null;
            hour_start?: string | null;
            hour_end?: string | null;
            id?: string | null;
        }[]
            | null;
        id?: string | null;
    }[]
        | null;
    updatedAt?: string | null;
    createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "footer".
 */
export interface Footer {
    id: number;
    columns?:
        | {
        content?: {
            root: {
                type: string;
                children: {
                    type: string;
                    version: number;
                    [k: string]: unknown;
                }[];
                direction: ('ltr' | 'rtl') | null;
                format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                indent: number;
                version: number;
            };
            [k: string]: unknown;
        } | null;
        content_html?: string | null;
        width?: ('1/3' | '2/3' | '1/2' | '1/4' | '3/4') | null;
        id?: string | null;
    }[]
        | null;
    updatedAt?: string | null;
    createdAt?: string | null;
}
