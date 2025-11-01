export interface ToastProps {
   id: string | number;
   title: string;
   body: string;
   type: "ERROR" | "WARN" | "DONE" | "NOTIFICATION" | "DEFAULT";
   action?: {
      label: string;
      onClick: () => void;
   };
}
