import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [Name, setName] = useState(null)
  const [Email, setEmail] = useState('')
  const [Pass, setPass] = useState('')
  const [ConfPass, setConfPass] = useState('')
  const [Errored, setErrored] = useState(false)
  const [Error, setError] = useState(null)
  const [Commited, setCommited] = useState(false)

  const users = import.meta.env.VITE_USERS

  useEffect(() => {

    if (document.querySelector('.email').value != ''
      && document.querySelector('.name').value != ''
      && document.querySelector('.pass').value != ''
      && document.querySelector('.confpass').value != '') {
      setCommited(true)
    }

    if (document.querySelector('.pass').value != document.querySelector('.confpass').value) {
      setError('The confirm password must be match!')
      setCommited(false)
      setErrored(true)
    } else {
      setErrored(false)
    }

  }, [Email, Pass, ConfPass, Name])

  const registUser = async () => {
    setCommited(false)

    const name = Name.charAt(0).toUpperCase() + Name.slice(1)

    return await fetch(`${users}/signup`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        username: name,
        email: Email,
        password: Pass
      })
    })
      .then(r => r.json())
      .then(j => {
        if (j.data) {
          setError(j.message + ' as ' + j.data.username)
          setCommited(true)
          setErrored(true)
        } else {
          setError(j.message)
          setCommited(true)
          setErrored(true)
        }
      }).catch(j => {
        setError(j.message)
        setCommited(true)
        setErrored(true)
      })
  }

  return (
    <div className="flex flex-col items-center mx-auto w-[700px] mb-20">
      <h1 className="text-5xl my-10 font-bold">User Sign Up</h1>
      <form className="w-[100%] px-20">
        {
          (Errored == true) && <div className="text-xl w-[100%] bg-slate-500 py-2 px-3 font-bold mb-4 rounded-xl text-white flex justify-between items-center">
            <div>{Error}</div>
            <button onClick={() => setErrored(false)} className="text-black hover:text-red-500 text-2xl font-bold">&times;</button>
          </div>
        }
        <input required type="text" placeholder="Input an Username..." onChange={(e) => setName(e.target.value)} className="name mt-2 bg-transparent text-white py-2 pl-3 rounded-xl text-lg  border outline-none border-slate-400 w-[100%]" />
        <input required type="email" placeholder="Input an Email Address..." onChange={(e) => setEmail(e.target.value)} className="email mt-5 bg-transparent text-white py-2 pl-3 rounded-xl text-lg  border outline-none border-slate-400 w-[100%]" />
        <input required type="password" placeholder="Input your Password..." onChange={(e) => setPass(e.target.value)} className="pass mt-5 bg-transparent text-white py-2 pl-3 rounded-xl text-lg  border outline-none border-slate-400 w-[100%]" />
        <input required type="password" placeholder="Konfirm your Password..." onChange={(e) => setConfPass(e.target.value)} className="confpass mt-2 bg-transparent text-white py-2 pl-3 rounded-xl text-lg  border outline-none border-slate-400 w-[100%]" />
        {
          (Commited == false) ? <button disabled className="cursor-not-allowed mt-12 py-2 pl-3 rounded-full text-lg bg-[#3c217c] font-bold w-[100%]" >Sign Up as User</button> : <p className="cursor-pointer text-center mt-12 bg-[#3700b3] text-white py-2 pl-3 rounded-full text-lg hover:bg-[#3c217c] font-bold w-[100%]" onClick={() => registUser()}>Sign Up as User</p>
        }
        <div className="mt-4 text-center text-lg font-bold w-[100%]" >Have an Account? <Link to="/login" className=" text-[#3700b3] hover:text-[#3c217c]">Login</Link></div>
      </form>
    </div>
  );
}

export default Register;