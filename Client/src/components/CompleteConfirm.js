import React from "react";

const CompleteConfirm = (props) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-lg font-semibold">Confirm Completion</h2>
                <p className="mt-2 text-sm text-gray-600">Are you sure you want to mark this note as complete?</p>
                <div className="mt-4 flex justify-end space-x-2">
                    <button
                        onClick={props.closeModal}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={props.confirmCompletion}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CompleteConfirm;