import { useState } from "react";

export const useMutation = ({ mutationFn, onSuccess }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const mutate = async (variables, options = { onSuccess }) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await mutationFn(variables);
      options.onSuccess(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, error, isLoading };
};
