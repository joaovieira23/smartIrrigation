import { useState, useEffect, Dispatch, SetStateAction } from 'react';

export interface FormField<T> {
  value: T;
  setValue: Dispatch<SetStateAction<T>>;
  error: boolean;
  isValid: boolean;
  focus: boolean;
  reset: () => void;
  setFocus: Dispatch<SetStateAction<boolean>>;
  touched: boolean;
  setTouched: Dispatch<SetStateAction<boolean>>;
}

export default function useFormField<T>({
  defaultValue,
  validate = () => true,
}: {
  defaultValue: T;
  validate?: (value: T) => boolean;
}): FormField<T> {
  const [value, setValue] = useState<T>(defaultValue);
  const error = validate(value);
  const [showError, setShowError] = useState<boolean>(false);
  const [previousFocus, setPreviousFocus] = useState<boolean>(false);
  const [focus, setFocus] = useState<boolean>(false);
  const [touched, setTouched] = useState<boolean>(false);

  function reset() {
    setValue(defaultValue);
    setShowError(false);
    setPreviousFocus(false);
    setFocus(false);
    setTouched(false);
  }

  useEffect(() => {
    if (previousFocus && !focus && !touched) {
      setTouched(true);
    }

    setPreviousFocus(focus);
  }, [focus, previousFocus, touched]);

  useEffect(() => {
    if (value && focus) {
      setTouched(true);
    }
  }, [value]);

  useEffect(() => {
    if (touched && !focus) {
      setShowError(!validate(value));
    } else if (focus) {
      setShowError(false);
    }
  }, [value, touched, focus, validate]);

  return {
    value,
    setValue,
    error: showError,
    isValid: error,
    focus,
    setFocus,
    reset,
    touched,
    setTouched,
  };
}
