/** Visual variants shared by the hero and chat input. */
export interface ChatInputProps {
    variant?: 'hero' | 'chat';
    placeholder?: string;
}

/** Visible label for a suggested chat prompt. */
export interface ChatPromptProps {
    label: string;
}

/** Shared suggestions with optional animated visibility in chat. */
export interface PromptGroupProps {
    visible?: boolean;
    variant?: 'hero' | 'chat';
}
