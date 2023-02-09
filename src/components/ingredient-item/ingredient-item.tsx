import React from 'react'
import { Button } from 'components/button/button'
import { Input } from 'components/input/input'
import { useForm, useFieldArray } from 'react-hook-form'
import { useFirestoreCollectionMutation } from '@react-query-firebase/firestore'
import { collection } from 'firebase/firestore'
import { auth, firestore } from '../../firebase/firebase'
import { useAuthUser } from '@react-query-firebase/auth'

interface IngredientItemProps {
    register: any
    sectionIndex: any
    control: any
}

export const IngredientItem = ({
    sectionIndex,
    register,
    control,
}: IngredientItemProps) => {
    const user = useAuthUser(['user'], auth)
    const ref = collection(firestore, 'recipes')

    // TODO stil valid ?
    const mutation = useFirestoreCollectionMutation(ref, {
        onSuccess: () => {
            // toast('Saved!')
        },
    })

    const ingredients = useFieldArray({
        control,
        name: `sections.${sectionIndex}.ingredients`,
    })

    return (
        <React.Fragment>
            <ul>
                {ingredients.fields.map((field, index) => {
                    return (
                        <li key={`${field.id}`}>
                            <Input
                                label="Name"
                                name={`sections.${sectionIndex}.ingredients.${index}.ingredientName`}
                                register={register}
                            />
                            <Input
                                label="Amount"
                                name={`sections.${sectionIndex}.ingredients.${index}.amount`}
                                register={register}
                            />
                            <Input
                                label="Unit"
                                name={`sections.${sectionIndex}.ingredients.${index}.unit`}
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
                    )
                })}
            </ul>
            <Button
                type="button"
                // disabled={mutation.isLoading}
                onClick={() => {
                    ingredients.append({
                        ingredientName: '',
                        amount: 0,
                        unit: 'kg',
                    })
                }}
            >
                Add ingredient
            </Button>
        </React.Fragment>
    )
}
