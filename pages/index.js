import { useState } from 'react';
import { supabase } from '../utils/supabase';
import { useRouter } from 'next/router';

export default function Home() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) alert(error.message);
    else alert('Check your email for the login link!');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold">Welcome to Coding Crafts Sale Engine</h1>
      <p className="mb-4">Sign in to start tracking job applications</p>
      <input
        type="email"
        placeholder="Enter your email..."
        className="border p-2 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleLogin} className="bg-blue-500 text-white p-2 mt-2 rounded">
        Send Login Link
      </button>
    </div>
  );
}
