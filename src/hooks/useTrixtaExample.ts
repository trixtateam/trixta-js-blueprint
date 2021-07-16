import {
  makeSelectTrixtaActionsForRole,
  makeSelectTrixtaAgentDetails,
  makeSelectTrixtaReactionsForRole,
  TrixtaAction,
  TrixtaReaction,
  TrixtaState,
} from '@trixta/trixta-js';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

export interface UseTrixtaExampleProps {
  debug: boolean;
}
export type UseTrixtaExampleResponse = {
  debugMode: boolean;
  selectedRoleName: string;
  roles: string[];
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
  const [selectedRoleName, setRole] = useState<string | undefined>();
  const [selectedActionName, setSelectedAction] = useState<
    string | undefined
  >();
  const [selectedReactionName, setSelectedReaction] = useState<
    string | undefined
  >();

  const selectTrixtaRoles: any = useMemo(makeSelectTrixtaAgentDetails, []);
  const roles = useSelector<{ trixta: TrixtaState }, string[]>(state =>
    selectTrixtaRoles(state),
  );
  console.info(roles);
  const selectTrixtaActions: any = useMemo(makeSelectTrixtaActionsForRole, []);
  const actions = useSelector<{ trixta: TrixtaState }, TrixtaAction[]>(state =>
    selectTrixtaActions(state, { roleName: selectedRoleName }),
  );
  const actionList: string[] = actions
    ? Object.keys(actions).map<string>(action => actions[action].common.name)
    : [];
  const selectTrixtaReactions: any = useMemo(
    makeSelectTrixtaReactionsForRole,
    [],
  );
  const reactions = useSelector<{ trixta: TrixtaState }, TrixtaReaction[]>(
    state => selectTrixtaReactions(state, { roleName: selectedRoleName }),
  );
  const reactionList: string[] = reactions
    ? Object.keys(reactions).map<string>(
        reaction => reactions[reaction].common.name,
      )
    : [];

  return {
    debugMode,
    setDebugMode,
    selectedRoleName,
    setRole,
    roles,
    reactionList,
    actionList,
    selectedActionName,
    selectedReactionName,
    setSelectedAction,
    setSelectedReaction,
  };
};
