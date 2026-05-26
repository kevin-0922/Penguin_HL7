import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export default function Root() {
    const { lang, setLang, t } = useLanguage();

    return (
        <div className="container mx-auto px-4 py-6">
            <header className="mb-6">
                <nav className="flex items-center bg-white p-4 rounded-lg shadow-md">
                    <Link
                        to="/"
                        className="mr-6 text-blue-600 hover:text-blue-800 font-medium"
                    >
                        {t('nav.home')}
                    </Link>
                    <Link
                        to="/o33"
                        className="mr-6 text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                    >
                        {t('nav.o33')}
                    </Link>
                    <Link
                        to="/q11"
                        className="mr-6 text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                    >
                        {t('nav.q11')}
                    </Link>
                    <Link
                        to="/o19"
                        className="mr-6 text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                    >
                        {t('nav.o19')}
                    </Link>
                    <Link
                        to="/o23"
                        className="mr-6 text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                    >
                        {t('nav.o23')}
                    </Link>

                    <div className="ml-auto flex items-center gap-1 border rounded-lg overflow-hidden text-sm font-medium">
                        <button
                            onClick={() => setLang('zh')}
                            className={`px-3 py-1.5 transition-colors ${lang === 'zh' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                            中文
                        </button>
                        <button
                            onClick={() => setLang('en')}
                            className={`px-3 py-1.5 transition-colors ${lang === 'en' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                            EN
                        </button>
                    </div>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>
        </div>
    );
}
