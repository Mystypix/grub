import { useFirestoreCollectionMutation } from '@react-query-firebase/firestore'
import { collection } from 'firebase/firestore'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm, useFieldArray } from 'react-hook-form'
import { auth, firestore } from '../../firebase/firebase'
import { Input } from 'components/input/input'
import { Button } from 'components/button/button'
import { useAuthUser } from '@react-query-firebase/auth'
import { toast } from 'react-toastify'
import { TextKey } from 'common/const/localisation/text-keys'
import { LocalisedText } from 'components/localisedText'
import { IngredientItem } from 'components/ingredient-item/ingredient-item'

export const AddRecipe = () => {
    // const [sections, setSections] = useState([
    //     [{ ingredientName: '', amount: '', unit: '' }],
    // ]) // you can have more sections. Every section consists of multiple ingredients. F.e. chococalate cake toping - cream, sugar, etc. Every ingredient will be an object
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
                        <LocalisedText textKey={TextKey.DurationPreparation} />
                    }
                    name="durationPreparation"
                    register={register}
                />
                <Input
                    label={<LocalisedText textKey={TextKey.DurationCooking} />}
                    name="durationCooking"
                    register={register}
                    validation={{ required: true }}
                />

                {sections.fields.map((field, index) => {
                    return (
                        <div key={`${field.id}`}>
                            <h3>Sekce</h3>
                            <p>Description</p>

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
                                Delete section
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
                    Add section
                </Button>

                <Button type="submit" disabled={mutation.isLoading}>
                    {/* <LocalisedText textKey={TextKey.Save} /> */}
                    Save
                </Button>
            </form>
        </div>
    )
}
