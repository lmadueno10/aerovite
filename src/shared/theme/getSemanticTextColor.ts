/**
 * Semantic Color Token Helper
 * 
 * Maps semantic color roles to their corresponding Tailwind foreground classes.
 * This ensures proper contrast using shadcn/ui's design token system.
 */

export type SemanticColorRole =
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'destructive'
    | 'muted'
    | 'success'
    | 'warning'
    | 'info';

/**
 * Get the appropriate text color class for a semantic background color
 * 
 * @param role - Semantic color role from shadcn/ui design system
 * @returns Tailwind class for the corresponding foreground color
 */
export function getSemanticTextColor(role: SemanticColorRole): string {
    const textClassMap: Record<SemanticColorRole, string> = {
        primary: 'text-primary-foreground',
        secondary: 'text-secondary-foreground',
        accent: 'text-accent-foreground',
        destructive: 'text-destructive-foreground',
        muted: 'text-muted-foreground',
        success: 'text-success-foreground',
        warning: 'text-warning-foreground',
        info: 'text-info-foreground',
    };

    return textClassMap[role];
}

/**
 * Get the background class for a semantic color role
 */
export function getSemanticBgColor(role: SemanticColorRole): string {
    return `bg-${role}`;
}

/**
 * Get both background and text classes for a semantic color role
 */
export function getSemanticColors(role: SemanticColorRole): string {
    return `${getSemanticBgColor(role)} ${getSemanticTextColor(role)}`;
}
