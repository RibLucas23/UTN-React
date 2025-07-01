import { Eye, EyeOff } from "lucide-react";

export default function EyeToggleButton({
   styles = "h-4 w-4",
   hide = false,
   onClick = () => { },

}) {
   return (
      <button
         type="button"
         onClick={onClick}
         className="btn btn-ghost p-2 min-h-0 h-auto"
      >
         {hide ? (
            <Eye className={styles} />
         ) : (
            <EyeOff className={styles} />
         )}
      </button>
   );
}