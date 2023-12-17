import Form from '@/components/Form/Form'

import cls from './layout.module.css'

const AuthLayout = ({ children }) => {
    return (
        <div className={cls.auth_wrapper}>
            <h1>Welcome Back</h1>
            <Form>{children}</Form>
        </div>
    )
}

export default AuthLayout
