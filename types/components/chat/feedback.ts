/** Error copy and dismissal supplied by the chat page. */
export interface ErrorBannerProps {
    title?: string;
    message: string;
    onDismiss: () => void;
}
