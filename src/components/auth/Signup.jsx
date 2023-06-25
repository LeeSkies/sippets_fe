import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { UserContext } from '../../context/userContext';

export const Signup = () => {

    const { signup } = useContext(UserContext)

    // validation schema
    const signupSchema = Joi.object({
        username: Joi.string().min(3).max(30).required(),
        email: Joi.string().email({ tlds: {allow: false}}).required(),
        password: Joi.string().min(8).max(30).required(),
        confirmPassword: Joi.any().valid(Joi.ref('password')).required().label('Confirm password'),
      });

    // validator
    const signupValidator = async (data) => {
      const { error, value: values } = signupSchema.validate(data, {
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
        resolver: signupValidator,
      });
    
      const onSubmit = async (data) => {
        const { username, email, password } = data
        const res = await signup(username, email, password);
      };
    
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 [&_input]:rounded">
      <div className="flex flex-col">
        <input
          placeholder="Username"
          {...register('username')}
          className={`border py-2 px-3 text-gray-700 ${
            errors.username ? 'border-red-700' : 'border-gray-300'
          }`}
        />
        {errors.username && (
          <p className="text-red-700 text-sm">{errors.username.message}</p>
        )}
      </div>

      <div className="flex flex-col">
        <input
          placeholder="Email"
          type="email"
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
          placeholder="Password"
          type="password"
          {...register('password')}
          className={`border py-2 px-3 text-gray-700 ${
            errors.password ? 'border-red-700' : 'border-gray-300'
          }`}
        />
        {errors.password && (
          <p className="text-red-700 text-sm">{errors.password.message}</p>
        )}
      </div>

      <div className="flex flex-col">
        <input
          placeholder="Confirm Password"
          type="password"
          {...register('confirmPassword')}
          className={`border py-2 px-3 text-gray-700 ${
            errors.confirmPassword ? 'border-red-700' : 'border-gray-300'
          }`}
        />
        {errors.confirmPassword && (
          <p className="text-red-700 text-sm">
            passwords do not match
          </p>
        )}
      </div>

      <button
        className="bg-blue-500 container text-white py-2 px-4 rounded"
      >Sign Up</button>
    </form>
  );
};
