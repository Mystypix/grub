import { useFirestoreCollectionMutation } from '@react-query-firebase/firestore'
import { collection } from 'firebase/firestore'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { auth, firestore } from '../../firebase/firebase'
import { Input } from 'components/input/input'
import { Button } from 'components/button/button'
import { useAuthUser } from '@react-query-firebase/auth'
import { toast } from 'react-toastify'
import { TextKey } from 'common/const/localisation/text-keys'
import { LocalisedText } from 'components/localisedText'
import { IngredientItem } from 'components/ingredient-item/ingredient-item'

export const AddRecipe = () => {
    const [sections, setSections] = useState([
        [{ ingredientName: '', amount: '', unit: '' }],
    ]) // you can have more sections. Every section consists of multiple ingredients. F.e. chococalate cake toping - cream, sugar, etc. Every ingredient will be an object

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

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
        // const { email, password } = data; // TODO RECIPE DATA
        // mutation.mutate({ email, password });

        // if (mutation.isSuccess) { // TODO
        //     navigate("/dashboard");
        // }
    }

    const handleAddSection = () => {
        setSections((prevValue) => {
            return [
                ...prevValue,
                [{ ingredientName: '', amount: '', unit: '' }],
            ]
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    label={<LocalisedText textKey={TextKey.RecipeName} />}
                    name="recipeName"
                    type="recipeName"
                    register={register}
                    validation={{ required: true }}
                    value={name}
                />

                <div>
                    <Input
                        label={
                            <LocalisedText
                                textKey={TextKey.DurationPreparation}
                            />
                        }
                        name="durationPreparation"
                        type="durationPreparation"
                        register={register}
                        // validation={{ required: true }}
                        value={name}
                    />
                    <Input
                        label={
                            <LocalisedText textKey={TextKey.DurationCooking} />
                        }
                        name="durationCooking"
                        type="durationCooking"
                        register={register}
                        // validation={{ required: true }}
                        value={name}
                    />
                </div>

                {sections.map((sectionIngredients, sectionIndex) => {
                    return (
                        <div key={sectionIndex}>
                            <p>Igredients section: {sectionIndex}</p>
                            {sectionIngredients.map(
                                (ingredient, ingredientIndex, ingredients) => {
                                    return (
                                        <IngredientItem
                                            amount={ingredient.amount}
                                            keyIngredient={`section-${sectionIndex}-${ingredientIndex}`}
                                            name={ingredient.name}
                                            register={register}
                                            unit={ingredient.unit}
                                        />
                                    )
                                }
                            )}
                        </div>
                    )
                })}

                <Button
                    type="button"
                    disabled={mutation.isLoading}
                    onClick={handleAddSection}
                >
                    {/* <LocalisedText textKey={TextKey.Save} /> */}
                    Přidat sekci
                </Button>

                <Button
                    type="button"
                    disabled={mutation.isLoading}
                    onClick={() => {
                        console.log(sections)
                    }}
                >
                    {/* <LocalisedText textKey={TextKey.Save} /> */}
                    Zobraz sekce
                </Button>

                {errors.recipeName?.type === 'required' && (
                    <div>Recipe name is required</div>
                )}
                {/* TODO localised */}

                <Button disabled={mutation.isLoading}>
                    <LocalisedText textKey={TextKey.Save} />
                </Button>
            </form>
        </div>
    )
}
