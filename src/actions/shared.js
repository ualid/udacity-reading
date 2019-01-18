
export const VISUALIZATION_FORM = 'VISUALIZATION_FORM';
export function visualizationForm(visualization) {
  return {
    type: VISUALIZATION_FORM,
    visualization,
  }
}

export const VISUALIZATION_EDIT = 'VISUALIZATION_EDIT';
export function visualizationEdit(visualization) {
  return {
    type: VISUALIZATION_EDIT,
    visualization,
  }
}

export const FILTER_SELECTED = 'FILTER_SELECTED';
export function filterSelectedFunc(filter) {
  return {
    type: FILTER_SELECTED,
    filter,
  }
}
