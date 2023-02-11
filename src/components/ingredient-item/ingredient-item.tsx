import React from 'react'
import { LocalisedText } from 'components/localisedText'
import { TextKey } from 'common/const/localisation/text-keys'
import { useForm, useFieldArray } from 'react-hook-form'
import { Button } from 'components/button/button'
import { Input } from 'components/input/input'
import clsx from 'clsx'
import css from './ingredient-item.module.scss'

interface IngredientItemProps {
    control: any
    register: any
    sectionIndex: any
}

export const IngredientItem = ({
    control,
    register,
    sectionIndex,
}: IngredientItemProps) => {
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
                                label={
                                    <LocalisedText
                                        textKey={TextKey.IngredientName}
                                    />
                                }
                                name={`sections.${sectionIndex}.ingredients.${index}.name`}
                                register={register}
                            />
                            <Input
                                label={
                                    <LocalisedText
                                        textKey={TextKey.IngredientAmount}
                                    />
                                }
                                name={`sections.${sectionIndex}.ingredients.${index}.amount`}
                                register={register}
                            />
                            <Input
                                label={
                                    <LocalisedText
                                        textKey={TextKey.IngredientUnit}
                                    />
                                }
                                name={`sections.${sectionIndex}.ingredients.${index}.unit`}
                                register={register}
                            />
                            <Button
                                type="button"
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
                        unit: '',
                    })
                }}
            >
                {<LocalisedText textKey={TextKey.AddIngredient} />}
            </Button>
        </React.Fragment>
    )
}
