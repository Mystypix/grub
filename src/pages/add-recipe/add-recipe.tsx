import { useFirestoreCollectionMutation } from '@react-query-firebase/firestore'
import { collection } from 'firebase/firestore'
import { auth, firestore } from '../../firebase/firebase'
import { Input } from 'components/input/input'
import { useAuthUser } from '@react-query-firebase/auth'
import { toast } from 'react-toastify'
import { Checkbox } from 'components/checkbox/checkbox'
import { useForm } from 'react-hook-form'

export const AddRecipe = () => {
    const user = useAuthUser(['user'], auth)
    const ref = collection(firestore, 'recipes')
    const mutation = useFirestoreCollectionMutation(ref, {
        onSuccess: () => {
            toast('Saved!')
        },
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            recipeName: '',
            isPublic: false,
        },
    })

    const onSubmit = ({ recipeName, isPublic }) => {
        mutation.mutate({
            recipeName,
            isPublic,
            userId: user.data?.uid,
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    label="Name of the recipe"
                    name="recipeName"
                    type="text"
                    register={register}
                />
                {mutation.isError && <p>{mutation.error.message}</p>}
                <Checkbox
                    name="isPublic"
                    label="Public"
                    register={register}
                ></Checkbox>
                <button disabled={mutation.isLoading}>Save</button>
            </form>
        </div>
    )
}
