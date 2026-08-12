import { Modal } from "./Modal";
import { Button } from "./Button";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Modal open={open} onClose={onCancel}>
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <p className="text-sm text-gray-600 mb-5">{message}</p>
      <div className="flex flex-row gap-3">
        <Button
          type="button"
          onClick={onCancel}
          styles="bg-white border border-gray-300 text-gray-700 flex-1"
        >
          {cancelLabel}
        </Button>
        <Button
          type="button"
          onClick={onConfirm}
          styles="bg-orange-400 text-amber-50 flex-1"
        >
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}