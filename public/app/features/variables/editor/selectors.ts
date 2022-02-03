import {
  AdHocVariableEditorState,
  DataSourceVariableEditorState,
  QueryVariableEditorState,
  VariableEditorState,
} from './reducer';

export function getAdhocVariableState(
  editorState: VariableEditorState
): VariableEditorState<AdHocVariableEditorState> | null {
  const { extended, ...rest } = editorState;

  if (extended && 'dataSources' in extended) {
    return {
      extended,
      ...rest,
    };
  }

  return null;
}

export function getDatasourceVariableState(editorState: VariableEditorState): DataSourceVariableEditorState | null {
  if (editorState.extended && 'dataSourceTypes' in editorState.extended) {
    return editorState.extended;
  }

  return null;
}

export function getQueryVariableState(editorState: VariableEditorState): QueryVariableEditorState | null {
  if (editorState.extended && 'dataSource' in editorState.extended) {
    return editorState.extended;
  }

  return null;
}
