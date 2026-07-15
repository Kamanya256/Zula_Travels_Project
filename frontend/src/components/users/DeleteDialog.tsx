"use client";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteDialog({
  open,
  onClose,
  onConfirm,
}: Props) {

  if (!open) return null;

  return (

    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

      <div className="bg-white rounded-lg p-6 w-96">

        <h2 className="text-xl font-bold mb-4">
          Delete User
        </h2>

        <p>
          Are you sure you want to delete this user?
        </p>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Delete
          </button>

        </div>

      </div>

    </div>

  );

}