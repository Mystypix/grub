import React from 'react'
import clsx from 'clsx'
import css from './ingredient-item.module.scss'
import { Input } from 'components/input/input'

interface IngredientItemProps {
    keyIngredient: string
    register: any
    name: string
    amount: number
    unit: string
}

export const IngredientItem = ({
    keyIngredient,
    register,
    name,
    amount,
    unit,
}: IngredientItemProps) => (
    <div key={keyIngredient} className={css.ingredient}>
        <Input
            label={'Name'}
            name={`${keyIngredient}-name`}
            // type={name}
            register={register}
            // validation={{ required: true }}
            // value={name}
        />
        <Input
            label={'Amount'}
            name={`${keyIngredient}-amount`}
            // type={name}
            register={register}
            // validation={{ required: true }}
            value={amount}
        />
        <Input
            label={'Unit'}
            name={`${keyIngredient}-unit`}
            // type={unit}
            register={register}
            // validation={{ required: true }}
            // value={name}
        />
        <button key={`${keyIngredient}-button`}>X</button>
    </div>
)
