import React from 'react'
import css from './checkbox.module.scss'

interface CheckboxProps {
    label: React.ReactNode
    register: any
    name: string
    defaultValue?: boolean
}
export const Checkbox = ({
    label,
    register,
    name,
    defaultValue,
    ...rest
}: CheckboxProps) => {
    return (
        <div className={css.wrapper}>
            <label htmlFor={name} className={css.label}>
                {label}
            </label>
            <input
                className={css.input}
                type="checkbox"
                id={name}
                name={name}
                defaultChecked={defaultValue}
            />
        </div>
    )
}
