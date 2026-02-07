import React from "react";

export default function FloatingInput({
  label,
  name,
  value,
  onChange,
  onBlur,
  type = "text",
  required = false,
  className = "",
  options = null, // ✅ if provided → render <select>
}) {
  const commonClasses = `
    peer
    w-full
    max-w-xl
    px-3
    pt-4
    pb-2
    text-base
    text-gray-900
    bg-transparent
    border
    border-gray-300
    rounded-lg
    appearance-none
    focus:outline-none
    focus:ring-0
    focus:border-blue-600
  `;

  const selectClasses = `
    ${commonClasses}
    pr-8
  `;

  return (
    <div className={`relative ${className}`}>
      {options ? (
        /* ---------------- SELECT FIELD WITH DROPDOWN ICON ---------------- */
        <>
          <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            required={required}
            className={selectClasses}
          >
            <option value="" disabled hidden></option>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 peer-focus:text-blue-600">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </>
      ) : (
        /* ---------------- INPUT FIELD ---------------- */
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder=" "
          autoComplete="off"
          required={required}
          className={commonClasses}
        />
      )}

      {/* ---------------- FLOATING LABEL ---------------- */}
      <label
        htmlFor={name}
        className={`
          lg:text-xl
          absolute
          left-3
          top-2
          z-10
          px-1
          text-sm
          text-gray-500
          bg-white
          origin-[0]
          transform
          transition-all
          duration-300
          focus:outline-none
          focus:ring-0
          ${
            value
              ? "-translate-y-4 scale-75 text-blue-600"
              : "peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600"
          }
        `}
      >
        {label}
      </label>
    </div>
  );
}
