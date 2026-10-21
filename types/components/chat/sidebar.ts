/** Presentation controls for the responsive chat sidebar. */
export interface SidebarProps {
    open: boolean;
    onClose: () => void;
    onInfo: () => void;
    onDelete: () => void;
    deleteDisabled: boolean;
}
