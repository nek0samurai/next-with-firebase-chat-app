'use client';
import React, { FC } from 'react';
import cls from './Form.module.css';
import { useRouter } from 'next/navigation';
import SignIn from '@/firebase/auth/signin';
import SignUp from '@/firebase/auth/signup';
import { SignInWithGoogle } from '@/firebase/auth/signInWithGoogle';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { updateProfile } from 'firebase/auth';
import { auth } from '@/helpers/constants/constants';

import Image from 'next/image';
import GoogleIcon from '@/static/icons/google-icon-logo.svg';

const Form = () => {
	const pathname = usePathname().split('/').pop();

	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [name, setName] = React.useState('');

	const router = useRouter();

	const handleForm = async (event) => {
		event.preventDefault();

		const { result, error } =
			pathname === 'auth/login'
				? await SignIn({ email, password, name })
				: await SignUp({ email, password, name });

		await updateProfile(auth.currentUser, { displayName: name });
		if (error) {
			return console.log(error);
		}

		console.log(result);
		return router.push('/dashboard');
	};

	const handleGoogleSignin = async () => {
		await SignInWithGoogle();
		return router.push('/dashboard');
	};

	return (
		<div className={cls.form__wrapper} data-testid="form-element">
			<button onClick={handleGoogleSignin} className={cls.form__button_google}>
				<Image src={GoogleIcon} width={20} height={20} alt="Google Icon" />
				<span>Log in with Google</span>
			</button>
			<div className={cls.form__divider}>
				<p>Or login with email</p>
			</div>
			<form onSubmit={handleForm} className={cls.form__body}>
				<label htmlFor="email">
					<p>Email</p>
					<input
						onChange={(e) => setEmail(e.target.value)}
						required
						type="email"
						name="email"
						id="email"
						placeholder="example@mail.com"
					/>
				</label>
				{pathname === 'signup' ? (
					<label htmlFor="name">
						<p>Name</p>
						<input
							onChange={(e) => setName(e.target.value)}
							required
							type="text"
							name="name"
							id="name"
							placeholder="John"
						/>
					</label>
				) : (
					<></>
				)}
				<label htmlFor="password">
					<p>Password</p>
					<input
						onChange={(e) => setPassword(e.target.value)}
						required
						type="password"
						name="password"
						id="password"
						placeholder="password"
					/>
				</label>

				<button type="submit" className={cls.form__btn}>
					{pathname === 'login' ? 'Log in' : 'Sign up'}
				</button>

				{pathname === 'login' ? (
					<p className={cls.form__link}>
						Dont have account?
						<Link href="/auth/signup">Register here</Link>
					</p>
				) : (
					<></>
				)}
			</form>
		</div>
	);
};

export default Form;
