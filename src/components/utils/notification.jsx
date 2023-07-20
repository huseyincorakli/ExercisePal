import toast, { Toaster } from 'react-hot-toast';
export const successLoginNotify = (mail={mail}) => toast.success(`Welcome ${mail}`);
export const errorLoginNotify = (message={message}) => toast.error (`${message}`, {style:{background:'red',color:'white'},iconTheme:{primary:'#ffff',secondary:'red'}});
export const successLogOutNotify = () => toast.success ('Logout successful.', {style:{background:'red',color:'white'},iconTheme:{primary:'#ffff',secondary:'red'}});
export const errorLogOutNotify = () => toast.error ('Logout failed.',{style:{background:'red',color:'white'},iconTheme:{primary:'#ffff',secondary:'red'}});
export const signUpError = (message={message}) => toast.error (`${message}`,{style:{background:'red',color:'white'},iconTheme:{primary:'#ffff',secondary:'red'}});
export const resetError = (message={message}) => toast.error (`${message}`,{style:{background:'red',color:'white'},iconTheme:{primary:'#ffff',secondary:'red'}});
export const signUpSuccess = () => toast.success('Please verify your email to complete your registration.');
export const resetSuccess = () => toast.success('Click on the Reset Password link in the e-mail titled Reset Password.');

const Notification = () => {
  return (
    <Toaster position='top-center' />
  )
}

export default Notification