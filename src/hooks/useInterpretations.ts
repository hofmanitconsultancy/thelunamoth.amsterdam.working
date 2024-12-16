import { useState, useEffect } from 'react';
import { InterpretationStorageService } from '../services/interpretations/storage.service';

export function useInterpretations(type: string) {
  const [interpretations, setInterpretations] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchInterpretations() {
      try {
        setLoading(true);
        const data = await InterpretationStorageService.getAllInterpretations(type);
        setInterpretations(data);
      } catch (err) {
        setError('Failed to load interpretations');
      } finally {
        setLoading(false);
      }
    }

    fetchInterpretations();
  }, [type]);

  return { interpretations, loading, error };
}