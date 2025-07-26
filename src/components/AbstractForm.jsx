import { useState } from "react";
import EyeToggleButton from "./icons/EyeToggleButton";

export default function AbstractForm({
   formFields,
   initialFormData,
   validate,
   onSubmit,
   title,
   submitText,
   footer
}) {
   const [formData, setFormData] = useState(initialFormData);
   const [errors, setErrors] = useState({});
   const [showPassword, setShowPassword] = useState(false);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: "" });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      const newErrors = validate(formData);

      if (Object.keys(newErrors).length > 0) {
         setErrors(newErrors);
         return;
      }

      onSubmit(formData);
   };

   return (
      <div className="flex items-center justify-center pt-8">
         <form
            onSubmit={handleSubmit}
            className="flex flex-col max-w-xl gap-6 p-8 rounded-lg min-w-80 bg-base-200"
         >
            {title && <h1 className="text-2xl font-bold text-center text-primary">{title}</h1>}

            {formFields.map((field) => {
               const fieldType = field.isPassword
                  ? (showPassword ? "text" : "password")
                  : field.type;

               return (
                  <label className="w-full max-w-xs form-control" key={field.id || field.name}>
                     <div className="flex justify-between pb-1 label">
                        <span className="label-text">{field.label}</span>
                        {field.extraLabel && field.extraLabel}
                     </div>

                     <div className={`relative input input-bordered border-2 rounded-lg w-full ${errors[field.name] ? "input-error" : "input-primary"} ${field.type === "textarea" ? "h-auto" : "flex px-0"}`}>

                        {/* Renderizado condicional del input o textarea */}
                        {field.type === "textarea" ? (
                           <textarea
                              name={field.name}
                              id={field.id}
                              value={formData[field.name] || ""}
                              onChange={handleChange}
                              placeholder={field.placeholder}
                              className="w-full h-full px-1 py-2 bg-transparent border-none resize-none focus:outline-none"
                              rows={field.rows || "4"}
                           />
                        ) : (
                           <input
                              type={fieldType}
                              name={field.name}
                              id={field.id}
                              value={formData[field.name] || ""}
                              onChange={handleChange}
                              placeholder={field.placeholder}
                              className="w-full pl-4"
                              step={field.step}
                           />
                        )}

                        {/* Renderizado condicional de contraseñas */}
                        {field.isPassword && (
                           <EyeToggleButton
                              hide={showPassword}
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-3"
                           />
                        )}
                     </div>

                     {errors[field.name] && (
                        <span className="mt-1 label-text-alt text-error">
                           {errors[field.name]}
                        </span>
                     )}
                  </label>
               );
            })}

            <button type="submit" className="w-full mt-2 btn btn-primary">
               {submitText || "Submit"}
            </button>

            {footer && <div className="text-center">{footer}</div>}
         </form>
      </div>
   );
}

