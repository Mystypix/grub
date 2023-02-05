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

export const AddRecipe = () => {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const [name, setName] = useState('')
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

    const handleInputChange = (e) => {
        setName(e.target.value)
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
