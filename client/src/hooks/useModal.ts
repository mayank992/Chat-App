import { useState, useCallback } from 'react';

export function useModal<T extends string>() {
  const [modalName, setModalName] = useState<T | ''>('');

  const openModal = useCallback((modalName: T) => {
    setModalName(modalName);
  }, []);

  const closeModal = useCallback(() => {
    setModalName('');
  }, []);

  return { modalName, openModal, closeModal };
}
