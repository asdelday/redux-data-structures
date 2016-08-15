import * as types from 'constants/componentTypes';

const SELECT_COMPONENT = 'redux-data-structures/components/SELECT_COMPONENT';
const CHANGE_VALUE = 'redux-data-structures/components/CHANGE_VALUE';

const initialState = {
  selectedComponent: null,
  components: {
    root: {
      id: 'root',
      title: 'Root',
      type: types.CONTAINER,
      children: [0],
    },
    0: {
      id: '0',
      title: 'Component 0',
      type: types.CONTAINER,
      children: [1, 2],
    },
    1: {
      id: '1',
      title: 'Component 1',
      type: types.CONTAINER,
      children: [3, 4],
    },
    2: {
      id: '2',
      label: 'Component 2',
      type: types.INPUT_TEXT,
      value: '',
    },
    3: {
      id: '3',
      title: 'Component 3',
      type: types.CONTAINER,
      children: [5, 6],
    },
    4: {
      id: '4',
      label: 'Component 4',
      type: types.INPUT_TEXT,
      value: 'default value 4',
    },
    5: {
      id: '5',
      label: 'Component 5',
      type: types.INPUT_CHECKBOX,
      checked: false,
    },
    6: {
      id: '6',
      label: 'Component 6',
      type: types.INPUT_TEXT,
      value: '',
    },
  },
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CHANGE_VALUE: {
      const { components } = state;
      const component = components[action.component];
      const field = action.field || 'value';

      return {
        ...state,
        components: {
          ...components,
          [action.component]: { ...component, [field]: action.value },
        },
      };
    }

    case SELECT_COMPONENT:
      return {
        ...state,
        selectedComponent: state.components[action.component],
      };

    default:
      return state;
  }
}


export const changeValue = (component, value, field) => (
  { type: CHANGE_VALUE, component, value, field }
);

export const selectComponent = (component) => ({ type: SELECT_COMPONENT, component });
