"use client";

export default function ConfirmModal({
  message,
  onConfirm,
  onCancel,
}: {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="flex justify-center mt-4">
      <div className="bg-gray-800 rounded-xl p-6 w-80 shadow-md border border-gray-700">
        <p className="text-white mb-6">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 transition-colors"
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
}
