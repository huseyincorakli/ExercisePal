import toast, { Toaster } from 'react-hot-toast';
export const successLoginNotify = () => toast.success('Login successful.');
export const errorLoginNotify = () => toast.error ('Login failed.');
export const successLogOutNotify = () => toast.success ('Logout successful.', {style:{background:'red',color:'white'},iconTheme:{primary:'#ffff',secondary:'red'}});
export const errorLogOutNotify = () => toast.error ('Logout failed.',{style:{background:'red',color:'white'},iconTheme:{primary:'#ffff',secondary:'red'}});
export const signUpError = (message={message}) => toast.error (`${message}`,{style:{background:'red',color:'white'},iconTheme:{primary:'#ffff',secondary:'red'}});
export const signUpSuccess = () => toast.success('Please verify your email to complete your registration.');

const Notification = () => {
  return (
    <Toaster position='top-center' />
  )
}

export default Notification