import { auth, firestore } from '../../firebase/firebase'
import { Button } from 'components/button/button'
import { collection } from 'firebase/firestore'
import { IngredientItem } from 'components/ingredient-item/ingredient-item'
import { Input } from 'components/input/input'
import { Link, useNavigate } from 'react-router-dom'
import { Loader } from '../../components/loader/loader'
import { LocalisedText } from 'components/localisedText'
import { TextKey } from 'common/const/localisation/text-keys'
import { toast } from 'react-toastify'
import { useAuthUser } from '@react-query-firebase/auth'
import { useFirestoreCollectionMutation } from '@react-query-firebase/firestore'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { useState } from 'react'
import ListDailyMeals from 'common/const/lists/daily-meals'
import ListMealType from 'common/const/lists/meal-type'
import Select from 'react-select'

export const AddRecipe = () => {
    // TODO go through settings page and explain me more
    const user = useAuthUser(['user'], auth)
    const ref = collection(firestore, 'recipes')

    // dont do anything else if the user is loading...
    if (user.isLoading) {
        return <Loader />
    }

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

    // TODO learn more about collectionMutation and how it works...
    const mutation = useFirestoreCollectionMutation(ref, {
        // TODO when it is called ? what its purpose?
        onSuccess: () => {
            toast('Saved!')
        },
    })

    // TODO what is next after SAVE - redirection to other page? loader ?
    const onSubmit = (recipeData) => {
        // TODO - settings page uses explicit object props. is this necessary?
        console.log(recipeData)
        mutation.mutate(recipeData)
    }

    return (
        <div>
            {/* TODO 
            - styles 
            - validation
             */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    label={<LocalisedText textKey={TextKey.RecipeName} />}
                    name="recipeName"
                    register={register}
                    validation={{ required: true }}
                />
                {/* TODO make description field multi lines - use textarea */}
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

                {/* TODO Learn more about the controller and what the hell is { field } ?? - the parameter which is sent internally by react-forms  - https://react-hook-form.com/api/usecontroller/controller */}
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
                {/* TODO add time units */}
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
