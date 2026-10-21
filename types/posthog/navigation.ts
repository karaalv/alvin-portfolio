/** Bounded acquisition sources and page classifications. */
export type SourcePlatform =
    | 'instagram'
    | 'tiktok'
    | 'x'
    | 'linkedin'
    | 'youtube'
    | 'google'
    | 'other'
    | 'direct_or_unknown';

export interface NavigationContext {
    source_platform: SourcePlatform;
    page_type:
        | 'links'
        | 'portfolio'
        | 'chat'
        | 'privacy'
        | 'other';
    source_page:
        | '/links'
        | '/'
        | '/chat'
        | '/privacy'
        | 'other';
}

/** Static link metadata, never inferred from visitor content. */
export interface NavigationLinkDetails {
    destination: string;
    position: number;
    source_section: string;
    link_category:
        | 'navigation'
        | 'social'
        | 'project'
        | 'contact';
    project?: string;
    method?: string;
}
