import React, { useState } from 'react';
import {useForm} from 'react-hook-form';
import './App.css';



function App() {
  const {
    register, 
    formState: {errors, isValid},
    handleSubmit,
    reset,

  } = useForm({
    mode:'onBlur',
  });

const [file, setFile] = useState(null);
const [isError, setIsError] = useState(false)
const [errorMsg, setErrorMsg] = useState("");
const [isSuccess, setIsSuccess] = useState(false)



const onChangeFile = (event) => {
  handleFileChange(event);
  fileSize(event);
  };

const handleFileChange = (event) => {
  const selectedFile = event.target.files[0];
  setIsSuccess(false);

  const allowedTypes = ["image/jpeg", "image/png"];
  if (!allowedTypes.includes(selectedFile?.type)) {
    setIsError(true);
    setErrorMsg("Только изображения JPEG и PNG");
    return;
  }
  setIsError(false);
  setFile(selectedFile);
};

const fileSize = (event) => {
  if (event.target.files && event.target.files[0]) {
    if (event.target.files[0].size > 2097152) {
      setIsError(true);
      setErrorMsg("Максимум 2МБ" );
      return false;
    }}
}

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
    reset();
  };

  
  return (
        <div className="form-section">
          <div className="container">
            <form onSubmit={handleSubmit(onSubmit)} className='form'> 

               <h1 className='title'>Форма обратной связи</h1>

                <input className='input firstname' id='firstname'
                    placeholder='Введите Имя'
                    name='firstname'                  
                    {...register('firstname',{ 
                    required: true, 
                    })}
                  />

                <div className='error-first' id='error1' style={{height: 40}}>
                  {errors?.firstname &&<p>Напишите Имя</p>}
                </div>


                <input className='input lastname' id='lastname'
                  placeholder='Введите Фамилию'
                  name='lastname'
                  {...register('lastname', { 
                  required: true,
                  })}
                  />
        
                <div className='error-last' id='error2' style={{height: 40}}>
                  {errors?.lastname &&<p>Напишите Фамилию</p>}
                </div>


                  <input className='input email'
                    placeholder='Введите Email'
                    {...register('email',{ 
                    required: true,
                    })}
                    />            

                  <div className='error-email' style={{height: 40}}>
                    {errors?.email  &&<p>{errors?.email?.message|| 'Обязательное поле'}</p>}
                  </div>
                  

                  <select className='input category'
                    {...register("category", { required: true })}>
                      <option className='disabled-option' value="" selected disabled>Категория сообщения </option>     
                      <option value="1">Категория 1</option>
                      <option value="2">Категория 2</option>
                      <option value="3">Категория 3</option>
                  </select>
              
                  <div className='error-category' style={{height: 40}}>
                    {errors?.category && <p>Обязательное поле</p>}
                  </div>


                  <textarea className='text-box'
                    placeholder='Введите сообщение'
                    name='Введите сообщение' 
                    {...register("text", {
                    required: true,
                    minLength: {
                    value: 10,
                    message: 'Минимум 10 символов'
                    }
                    })}
                    />

                  <div className='error-text' style={{height: 40}}>
                    {errors?.text  &&<p>{errors?.text?.message || 'Обязательное поле'}</p>}
                  </div>
              

                  <input className='photo-box'
                    name="file-upload"
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={onChangeFile} 
                  />
              
                  <div className="error-photo">
                    {isError && <div className="error-text">{errorMsg}</div>}
                  </div>


                  <div className="button-box">
                    <input type="submit" className="button" disabled={!isValid} />
                  </div>
            </form>
          </div>
      </div>
  );
}

export default App;
