/** Visual variants shared by the hero and chat input. */
export interface ChatInputProps {
    variant?: 'hero' | 'chat';
    placeholder?: string;
}

/** Visible label and editable message for a suggested prompt. */
export interface ChatPromptProps {
    label: string;
    message: string;
}

/**
 * Shared suggestions with optional animated visibility in chat.
 */
export interface PromptGroupProps {
    visible?: boolean;
    variant?: 'hero' | 'chat';
}
