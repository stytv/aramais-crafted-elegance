"use client"
import React, { useState } from 'react'
import { supabase } from '../../lib/supabase'  // ✅ Import supabase
import './AuthPage.css'
import { useRouter } from 'next/navigation'


const AuthPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const nav = useRouter()
    console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL)
    console.log("Supabase Anon Key starts with:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 8))


    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isLogin) {
                // 🔹 Login
                const { data, error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;

                if (data.session && data.user) {
                    // ✅ Fetch profile to get role
                    const { data: profileData, error: profileError } = await supabase
                        .from("profiles")
                        .select("role")
                        .eq("id", data.user.id)
                        .single();

                    if (profileError) throw profileError;

                    // ✅ Store session + role
                    localStorage.setItem("supabase_session", JSON.stringify(data.session));
                    localStorage.setItem("supabase_user_id", data.user.id);
                    localStorage.setItem("supabase_role", profileData.role);

                    console.log("✅ Session + Role saved:", profileData.role);

                    window.location.href = "/"; // redirect
                }
            } else {
                // 🔹 Signup
                const { data: authData, error: authError } = await supabase.auth.signUp({
                    email,
                    password,
                });
                if (authError) throw authError;

                if (authData.user) {
                    // Insert profile
                    const { error: profileError } = await supabase.from("profiles").upsert({
                        id: authData.user.id,
                        name,
                        phone,
                        role: "customer", // default
                    });
                    if (profileError) throw profileError;

                    // ✅ Fetch profile again to confirm role
                    const { data: profileData } = await supabase
                        .from("profiles")
                        .select("role")
                        .eq("id", authData.user.id)
                        .single();

                    // ✅ Store session + role
                    if (authData.session) {
                        localStorage.setItem(
                            "supabase_session",
                            JSON.stringify(authData.session)
                        );
                    }
                    localStorage.setItem("supabase_user_id", authData.user.id);
                    if (profileData) {
                        localStorage.setItem("supabase_role", profileData.role);
                    }

                    window.location.href = "/";
                }
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-image">
                    <div className="premium-overlay">
                        <h2>Artisan Crafted Leather Goods</h2>
                        <p>Experience the luxury of premium leather craftsmanship</p>
                    </div>
                </div>

                <div className="auth-form">
                    <div className="brand-header">
                        <h1>LeatherCraft</h1>
                        <p>Premium Leather Shop</p>
                    </div>

                    <div className="auth-tabs">
                        <button
                            className={`tab ${isLogin ? 'active' : ''}`}
                            onClick={() => setIsLogin(true)}
                        >
                            Login
                        </button>
                        <button
                            className={`tab ${!isLogin ? 'active' : ''}`}
                            onClick={() => setIsLogin(false)}
                        >
                            Sign Up
                        </button>
                    </div>

                    <form onSubmit={handleAuth}>
                        {error && <div className="error-message">{error}</div>}

                        {!isLogin && (
                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {!isLogin && (
                            <div className="form-group">
                                <label htmlFor="phone">Phone Number</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="auth-button"
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : (isLogin ? 'Login' : 'Create Account')}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <button
                                type="button"
                                className="link-button"
                                onClick={() => setIsLogin(!isLogin)}
                            >
                                {isLogin ? 'Sign Up' : 'Login'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthPage
