import { forwardRef, useId } from 'react'
import styles from './Input.module.css'

const Input = forwardRef(function Input(
  { label, error, hint, icon, className = '', containerClassName = '', ...rest },
  ref
) {
  const id = useId()
  const inputId = rest.id || id
  return (
    <div className={`${styles.wrap} ${containerClassName}`}>
      {label && <label htmlFor={inputId} className={styles.label}>{label}</label>}
      <div className={`${styles.field} ${error ? styles.fieldError : ''}`}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <input
          ref={ref}
          id={inputId}
          className={`${styles.input} ${icon ? styles.withIcon : ''} ${className}`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          {...rest}
        />
      </div>
      {error && <span id={`${inputId}-error`} className={styles.error}>{error}</span>}
      {!error && hint && <span id={`${inputId}-hint`} className={styles.hint}>{hint}</span>}
    </div>
  )
})

export default Input
