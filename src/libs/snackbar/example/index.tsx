import { snackbar } from "../utils";

export function SnackbarExample() {
   return (
      <div className="flex flex-wrap gap-4">
         <button
            type="button"
            onClick={() =>
               snackbar({
                  title: "Error",
                  body: "Something went wrong",
                  type: "ERROR",
                  action: {
                     label: "dismiss",
                     onClick: () => null,
                  },
               })
            }
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md shadow-md transition">
            ERROR
         </button>

         <button
            type="button"
            onClick={() =>
               snackbar({
                  title: "Warning",
                  body: "Be careful with this action",
                  type: "WARN",
                  action: {
                     label: "dismiss",
                     onClick: () => null,
                  },
               })
            }
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md shadow-md transition">
            WARN
         </button>

         <button
            type="button"
            onClick={() =>
               snackbar({
                  title: "Success",
                  body: "Operation completed successfully",
                  type: "DONE",
                  action: {
                     label: "dismiss",
                     onClick: () => null,
                  },
               })
            }
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow-md transition">
            DONE
         </button>

         <button
            type="button"
            onClick={() =>
               snackbar({
                  title: "Order Update",
                  body: "Your order #12345 has been shipped and will arrive soon.",
                  type: "NOTIFICATION",
                  action: {
                     label: "dismiss",
                     onClick: () => null,
                  },
               })
            }
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-md transition">
            NOTIFICATION
         </button>
      </div>
   );
}
