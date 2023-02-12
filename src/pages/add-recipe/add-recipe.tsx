import { useFirestoreCollectionMutation } from '@react-query-firebase/firestore'
import { collection } from 'firebase/firestore'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { auth, firestore } from '../../firebase/firebase'
import { Input } from 'components/input/input'
import { Button } from 'components/button/button'
import { useAuthUser } from '@react-query-firebase/auth'
import { toast } from 'react-toastify'
import { TextKey } from 'common/const/localisation/text-keys'
import ListDailyMeals from 'common/const/lists/daily-meals'
import ListMealType from 'common/const/lists/meal-type'
import { LocalisedText } from 'components/localisedText'
import { IngredientItem } from 'components/ingredient-item/ingredient-item'
import Select from 'react-select'

export const AddRecipe = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            sections: [{ name: '', description: '', ingredients: [] }],
        },
    })

    const sections = useFieldArray({ control, name: 'sections' })

    const user = useAuthUser(['user'], auth)
    const ref = collection(firestore, 'recipes')

    // TODO stil valid ?
    const mutation = useFirestoreCollectionMutation(ref, {
        onSuccess: () => {
            toast('Saved!')
        },
    })

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    label={<LocalisedText textKey={TextKey.RecipeName} />}
                    name="recipeName"
                    register={register}
                    validation={{ required: true }}
                />
                <Input
                    label={
                        <LocalisedText textKey={TextKey.RecipeDescription} />
                    }
                    name="recipeDescription"
                    register={register}
                    validation={{ required: true }}
                />

                {/* TODO 
                Styles for react-select
                
                 */}

                <Controller
                    name="recipeDailyMeal"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            options={ListDailyMeals}
                            isMulti={true}
                        />
                    )}
                />
                <Controller
                    name="recipeMealType"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            options={ListMealType}
                            isMulti={true}
                        />
                    )}
                />
                <Input
                    label={
                        <LocalisedText textKey={TextKey.DurationPreparation} />
                    }
                    name="recipeDurationPreparation"
                    register={register}
                />
                <Input
                    label={<LocalisedText textKey={TextKey.DurationCooking} />}
                    name="recipeDurationCooking"
                    register={register}
                    validation={{ required: true }}
                />

                <Input
                    label={
                        <LocalisedText textKey={TextKey.RecipeServingsNumber} />
                    }
                    name="recipeServingsNumber"
                    register={register}
                    validation={{ required: true }}
                    type="number"
                />
                {sections.fields.map((field, index) => {
                    return (
                        <div key={`${field.id}`}>
                            <Input
                                label={
                                    <LocalisedText
                                        textKey={TextKey.SectionName}
                                    />
                                }
                                name={`sections.${index}.name`}
                                register={register}
                                validation={{ required: true }}
                            />

                            <Input
                                label={
                                    <LocalisedText
                                        textKey={TextKey.SectionDescription}
                                    />
                                }
                                name={`sections.${index}.description`}
                                register={register}
                                validation={{ required: true }}
                            />
                            <IngredientItem
                                sectionIndex={index}
                                register={register}
                                control={control}
                            />

                            <Button
                                type="button"
                                disabled={mutation.isLoading}
                                onClick={() => {
                                    sections.remove(index)
                                }}
                            >
                                <LocalisedText
                                    textKey={TextKey.DeleteSection}
                                />
                            </Button>
                        </div>
                    )
                })}

                <Button
                    type="button"
                    disabled={mutation.isLoading}
                    onClick={() => {
                        sections.append({
                            name: '',
                            description: '',
                            ingredients: [],
                        })
                    }}
                >
                    <LocalisedText textKey={TextKey.AddSection} />
                </Button>

                {/* 
                TODO Pictures
                 */}
                <Input
                    label={<LocalisedText textKey={TextKey.MakePublic} />}
                    name={`isPublic`}
                    register={register}
                    validation={{ required: true }}
                    type="checkbox"
                />

                <Button type="submit" disabled={mutation.isLoading}>
                    <LocalisedText textKey={TextKey.Save} />
                </Button>
            </form>
        </div>
    )
}
