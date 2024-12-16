import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, DocumentSnapshot } from 'firebase/firestore';
import { db, ensureAuth } from '../config/firebase';
import { useAuth } from './useAuth';
import { UserMembership } from '../types/membership';

export function useMembership() {
  const { user } = useAuth();
  const [membership, setMembership] = useState<UserMembership | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchMembership() {
      if (!user) {
        if (isMounted) {
          setMembership(null);
          setLoading(false);
        }
        return;
      }

      try {
        const membershipRef = doc(db, 'memberships', user.uid);
        const membershipDoc: DocumentSnapshot = await getDoc(membershipRef);
        
        if (isMounted) {
          if (membershipDoc.exists()) {
            const data = membershipDoc.data() as UserMembership;
            setMembership({
              ...data,
              startDate: data.startDate.toDate ? data.startDate.toDate() : new Date(data.startDate)
            });
          } else {
            setMembership(null);
          }
        }
      } catch (err) {
        console.error('Error fetching membership:', err);
        if (isMounted) {
          setError('Failed to load membership data');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchMembership();

    return () => {
      isMounted = false;
    };
  }, [user]);

  const subscribeTo = async (tierId: string) => {
    try {
      const currentUser = ensureAuth();
      const membershipRef = doc(db, 'memberships', currentUser.uid);
      const newMembership: UserMembership = {
        userId: currentUser.uid,
        tierId,
        startDate: new Date(),
        status: 'active'
      };

      await setDoc(membershipRef, newMembership);
      setMembership(newMembership);
      return newMembership;
    } catch (err) {
      console.error('Error subscribing:', err);
      setError('Failed to process subscription');
      throw err;
    }
  };

  return {
    membership,
    loading,
    error,
    subscribeTo
  };
}