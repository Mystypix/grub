import { Button } from 'components/button/button'
import { Input } from 'components/input/input'
import { useEffect } from 'react'
import { useFieldArray } from 'react-hook-form'

interface IngredientSectionProps {
    index: number
    control: any
    register: any
}

export const IngredientSection = ({
    index,
    control,
    register,
}: IngredientSectionProps) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: `ingredientSections[${index}].ingredients`,
    })

    return (
        <>
            {fields.map((item, i) => (
                <div key={item.id}>
                    <Input
                        label="Ingredient name"
                        name={`ingredientSections[${index}].ingredients[${i}].ingredientName`}
                        register={register}
                    />
                    <Input
                        label="Amount"
                        name={`ingredientSections[${index}].ingredients[${i}].ammount`}
                        register={register}
                    />
                    <Input
                        label="Unit"
                        name={`ingredientSections[${index}].ingredients[${i}].unit`}
                        register={register}
                    />
                    <Button onClick={() => remove(i)}>Remove</Button>
                </div>
            ))}
            <Button
                type="button"
                onClick={() =>
                    append({ ingredientName: '', amount: '', unit: '' })
                }
            >
                Add new ingredient
            </Button>
        </>
    )
}
