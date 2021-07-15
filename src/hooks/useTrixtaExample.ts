import { useState } from 'react';
import TrixtaRoles from '../constants/TrixtaRole';

export interface UseTrixtaExampleProps {
  debug: boolean;
}

export type UseTrixtaExampleResponse = {
  debugMode: boolean;
  role: string;
  actionReactionName: string;
  setDebugMode: (debugMode: boolean) => void;
  setRole: (role: string) => void;
  setActionReactionName: (actionReactionName: string) => void;
};

export const useTrixtaExample = ({ debug = false }: UseTrixtaExampleProps) => {
  const [debugMode, setDebugMode] = useState(debug);
  const [role, setRole] = useState(TrixtaRoles.EVERYONE_ANON);
  const [actionReactionName, setActionReactionName] = useState(undefined);

  return {
    debugMode,
    setDebugMode,
    role,
    setRole,
    actionReactionName,
    setActionReactionName,
  };
};
