import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { UserContext } from '../../context/userContext';

export const Login = () => {
  const { loggedIn, login } = useContext(UserContext);

  // validation schema
  const loginSchema = Joi.object({
    email: Joi.string().email({ tlds: {allow: false}}).required(),
    password: Joi.string().min(8).max(30).required(),
  });

  // validator
  const loginValidator = async (data) => {
    const { error, value: values } = loginSchema.validate(data, {
      abortEarly: false,
    });

    if (!error) return { values: values, errors: {} };

    return {
      values: {},
      errors: error.details.reduce((previous, currentError) => ({
        ...previous,
        [currentError.path[0]]: currentError,
      }), {}),
    };
  };

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: loginValidator,
  });

  const onSubmit = async (data) => {
    const { email, password } = data;
    login(email, password);
  };

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 [&_input]:rounded">
        <div className="flex flex-col">
          <input
            placeholder='Email'
            type="email"
            id="email"
            name="email"
            {...register('email')}
            className={`border py-2 px-3 text-gray-700 ${
              errors.email ? 'border-red-700' : 'border-gray-300'
            }`}
          />
          {errors.email && (
            <p className="text-red-700 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <input
            placeholder='Password'
            type="password"
            id="password"
            name="password"
            {...register('password')}
            className={`border py-2 px-3 text-gray-700 ${
              errors.password ? 'border-red-700' : 'border-gray-300'
            }`}
          />
          {errors.password && (
            <p className="text-red-700 text-sm">{errors.password.message}</p>
          )}
        </div>

        <button className="bg-blue-500 container text-white py-2 px-4 rounded" type="submit">Log In</button>
      </form>
    </div>
  );
};
