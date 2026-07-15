"use client";

interface Props {
  open: boolean;
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmDialog({
  open,
  title,
  message,
  onCancel,
  onConfirm,
}: Props) {

  if (!open) return null;

  return (

    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl w-96 p-6">

        <h2 className="text-xl font-bold">
          {title}
        </h2>

        <p className="mt-3 text-gray-600">
          {message}
        </p>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onCancel}
            className="border rounded-lg px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="bg-red-600 text-white rounded-lg px-4 py-2"
          >
            Confirm
          </button>

        </div>

      </div>

    </div>

  );

}