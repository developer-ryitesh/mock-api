export interface SnackbarProps {
   id?: string | number;
   title: string;
   body: string;
   type: "ERROR" | "WARN" | "DONE" | "NOTIFICATION";
   data?: {
      title: string;
      description: string;
      icon: string;
      message: string;
      metaData: string;
      type: string;
      imageUrl: string;
      priority: string;
      redirectUrl: string;
   };
   onRefresh?: () => void;
   action?: {
      label: string;
      onClick: () => void;
   };
   onRedirect?: {
      label: string;
      onClick: () => void;
   };
}
