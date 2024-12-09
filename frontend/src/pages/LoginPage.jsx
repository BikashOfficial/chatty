// import React, { useState } from 'react'
// import { useAuthStore } from '../store/useAuthStore';
// import AuthImagePattern from '../components/AuthImagePattern.jsx';
// import { MessageSquare, User, Mail, Lock, EyeOff, Eye, Loader2 } from 'lucide-react'
// import { Link } from 'react-router-dom';

// function LoginPage() {

//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const { login, isLoggingIn } = useAuthStore();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     login(formData);
//   }

//   return (
//     <div className='min-h-screen grid lg: grid-cols-2'>

//       {/* left side form */}
//       <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
//         <div className='w-full max-w-md space-y-8'>
//           {/* LOGO */}
//           <div className='text-center mb-8'>
//             <div className='flex flex-col items-center gap-2 group'>
//               <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
//                 <MessageSquare className="size-6 text-primary" />
//               </div>
//               <h1 className='text-2xl font-bold mt-2'>Wellcome Back !</h1>
//               <p className='text-base-content/60'> Login to your account</p>
//             </div>
//           </div>

//           <form onSubmit={handleSubmit} className='space-y-6'>
//             {/* Email */}
//             <div className='form-control'>
//               <label className='label'>
//                 <span className='label-text font-medium'>Email</span>
//               </label>
//               <div className='relative'>
//                 <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
//                   <Mail className='size-5 text-base-content/40' />
//                 </div>
//                 <input
//                   type="email"
//                   className={`input input-bordered w-full pl-10`}
//                   placeholder='you@example.com'
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
//               </div>
//             </div>

//             {/* password */}
//             <div className='form-control'>
//               <label className='label'>
//                 <span className='label-text font-medium'>Password</span>
//               </label>
//               <div className='relative'>
//                 <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
//                   <Lock className="size-5 text-base-content/40" />
//                 </div>

//                 <input
//                   type={showPassword ? "text" : "password"}
//                   className={`input input-bordered w-full pl-10`}
//                   placeholder='Enter Password'
//                   value={formData.password}
//                   onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                 />

//                 <button
//                   type="button"
//                   className='absolute inset-y-0 right-0 pr-3 flex items-center'
//                   onClick={() => setShowPassword(!showPassword)}
//                 >

//                   {showPassword ? (
//                     <EyeOff className='size-5 text-base-content/40' />
//                   ) : (<Eye className='size-5 text-base-content/40' />)}

//                 </button>
//               </div>
//             </div>


//             {/* Submit button */}
//             <button type='submit' className='btn btn-primary w-full' disabled={isLoggingIn}>

//               {isLoggingIn ? (
//                 <>
//                   <Loader2 className='size-5 animate-spin' />
//                   Loading...
//                 </>
//               )
//                 : (
//                   "Login"
//                 )}

//             </button>


//           </form>

//           {/* Already have account */}
//           <div className='text-center'>
//             <p className='text-base-content/60'>
//               Don't have an Account ? {" "}
//               <Link to="/signup" className='link link-primary'>Create a new account
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Right side */}
//       <AuthImagePattern
//         title="Welcome back !"
//         subtitle="Login in to continue your conversations and catch up with your messages."
//       />
//     </div>
//   )
// }

// export default LoginPage

import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import AuthImagePattern from '../components/AuthImagePattern.jsx';
import { MessageSquare, Mail, Lock, EyeOff, Eye, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loginError, setLoginError] = useState(null);

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      setLoginError(null); // Clear any previous errors
    } catch (error) {
      setLoginError('Invalid email or password. Please try again.'); // Set error message
    }
  };

  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
      {/* left side form */}
      <div className='flex flex-col justify-center items-center p-6 sm:p-12 lg:w-full lg:max-w-md'>
        <div className='w-full max-w-md space-y-8'>
          {/* LOGO */}
          <div className='text-center mb-8'>
            <div className='flex flex-col items-center gap-2 group'>
              <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                <MessageSquare className='size-6 text-primary' />
              </div>
              <h1 className='text-2xl font-bold mt-2'>Welcome Back!</h1>
              <p className='text-base-content/60'>Login to your account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Email */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>Email</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Mail className='size-5 text-base-content/40' />
                </div>
                <input
                  type='email'
                  className='input input-bordered w-full pl-10'
                  placeholder='you@example.com'
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/* Password */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>Password</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Lock className='size-5 text-base-content/40' />
                </div>

                <input
                  type={showPassword ? 'text' : 'password'}
                  className='input input-bordered w-full pl-10'
                  placeholder='Enter Password'
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />

                <button
                  type='button'
                  className='absolute inset-y-0 right-0 pr-3 flex items-center'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className='size-5 text-base-content/40' /> : <Eye className='size-5 text-base-content/40' />}
                </button>
              </div>
            </div>

            {/* Submit button */}
            <button type='submit' className='btn btn-primary w-full' disabled={isLoggingIn}>
              {isLoggingIn ? (
                <>
                  <Loader2 className='size-5 animate-spin' />
                  Loading...
                </>
              ) : (
                'Login'
              )}
            </button>

            {/* Display login error */}
            {loginError && (
              <div className='text-error mt-4 text-center'>
                {loginError}
              </div>
            )}
          </form>

          {/* Already have account */}
          <div className='text-center'>
            <p className='text-base-content/60'>
              Don't have an Account?{' '}
              <Link to='/signup' className='link link-primary'>
                Create a new account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className='hidden lg:flex'>
        <AuthImagePattern
          title='Welcome back!'
          subtitle='Login in to continue your conversations and catch up with your messages.'
        />
      </div>
    </div>
  );
}

export default LoginPage;