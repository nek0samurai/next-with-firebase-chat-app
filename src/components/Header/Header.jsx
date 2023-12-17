import React from 'react'
import Link from 'next/link'
import cls from './Header.module.css'

const Header = () => {
    return (
        <header className={cls.header}>
            <nav className={cls.header__nav}>
                <ul className={cls.nav__list}>
                    <li className={cls.nav__list_item}>
                        <Link href="/auth/login">Login</Link>
                    </li>
                    <li className={cls.nav__list_item}>
                        <Link href="/auth/signup">Sign up</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header
