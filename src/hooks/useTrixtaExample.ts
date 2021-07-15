import { useState } from 'react';
import TrixtaRoles from '../constants/TrixtaRole';

export interface UseTrixtaExampleProps {
  debug: boolean;
}
export type UseTrixtaExampleResponse = {
  debugMode: boolean;
  role: string;
  reactionList: string[];
  actionList: string[];
  selectedActionName: string;
  selectedReactionName: string;
  setDebugMode: (debugMode: boolean) => void;
  setRole: (role: string) => void;
  setSelectedAction: (actionName: string) => void;
  setSelectedReaction: (reactionName: string) => void;
};

export const useTrixtaExample = ({ debug = false }: UseTrixtaExampleProps) => {
  const [debugMode, setDebugMode] = useState(debug);
  const [role, setRole] = useState(TrixtaRoles.EVERYONE_ANON);
  const actionList = ['action'];
  const reactionList = ['reaction'];
  const [selectedActionName, setSelectedAction] = useState(actionList[0]);
  const [selectedReactionName, setSelectedReaction] = useState(reactionList[0]);
  return {
    debugMode,
    setDebugMode,
    role,
    setRole,
    reactionList,
    actionList,
    selectedActionName,
    selectedReactionName,
    setSelectedAction,
    setSelectedReaction,
  };
};
