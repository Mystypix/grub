import React from 'react'

interface CheckboxProps {
    label?: React.ReactNode
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
        <div className="checkbox-wrapper">
            <label htmlFor={name} className="checkbox-label">
                {label}
            </label>
            <input
                type="checkbox"
                id={name}
                name={name}
                defaultChecked={defaultValue}
                {...register(name)}
                {...rest}
            />
            <span className="checkmark"></span>
        </div>
    )
}
