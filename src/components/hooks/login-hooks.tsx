import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, type LoginSchemaDTO } from "@/schemas/auth-schema"

export default function LoginHooks() {
    const form = useForm<LoginSchemaDTO>({
        resolver:zodResolver(loginSchema)
    })

    const onSubmit = (data: LoginSchemaDTO) => {
        console.log(data)
    }

    return{
        form,
        onSubmit
    }
}