import React from 'react'
import clsx from 'clsx'
import css from './ingredient-item.module.scss'
import { Button } from 'components/button/button'
import { Input } from 'components/input/input'
import { useFirestoreCollectionMutation } from '@react-query-firebase/firestore'
import { collection } from 'firebase/firestore'
import { auth, firestore } from '../../firebase/firebase'
import { toast } from 'react-toastify'
import { useForm, useFieldArray } from 'react-hook-form'

interface IngredientItemProps {
    register: any
    sectionId: any
}

const ref = collection(firestore, 'recipes')

const mutation = useFirestoreCollectionMutation(ref, {
    onSuccess: () => {
        toast('Saved!')
    },
})

export const IngredientItem = ({
    register,
    sectionId,
}: IngredientItemProps) => {
    const { control } = useForm({
        defaultValues: {
            ingredients: [{ ingredientName: '', amount: 0, unit: 'kg' }],
        },
    })
    const ingredients = useFieldArray({ control, name: 'ingredients' })

    return ingredients.fields.map((field, index) => {
        ;<li key={`${sectionId}-${field.id}-${index}`}>
            <Input
                label="Name"
                name={`ingredients.${index}.ingredientName`}
                register={register}
            />
            <Input
                label="Amount"
                name={`ingredients.${index}.amount`}
                register={register}
            />
            <Input
                label="Unit"
                name={`ingredients.${index}.unit`}
                register={register}
            />
            <Button
                type="button"
                disabled={mutation.isLoading}
                onClick={() => {
                    ingredients.remove(index)
                }}
            >
                X
            </Button>
        </li>
    })
}
