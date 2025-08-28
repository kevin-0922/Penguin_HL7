import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function Root() {
    return (
        <div className="container mx-auto px-4 py-6">
            <header className="mb-6">
                <nav className="flex bg-white p-4 rounded-lg shadow-md">
                    <Link 
                        to="/" 
                        className="mr-6 text-blue-600 hover:text-blue-800 font-medium"
                    >
                        首頁
                    </Link>
                    <Link 
                        to="/o33" 
                        className="mr-6 text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                    >
                        O33 表單
                    </Link>
                    <Link 
                        to="/q11" 
                        className="mr-6 text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                    >
                        Q11 表單
                    </Link>
                    <Link 
                        to="/o19" 
                        className="mr-6 text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                    >
                        O19 表單
                    </Link>
                    <Link 
                        to="/o23" 
                        className="mr-6 text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                    >
                        O23 表單
                    </Link>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>
        </div>
    );
}
