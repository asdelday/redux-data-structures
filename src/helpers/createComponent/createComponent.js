import * as types from 'constants/componentTypes';
import wrapComponent from 'helpers/wrapComponent';
import { changeValue, selectComponent } from 'redux/modules/components';
import { Container, InputText, InputCheckbox } from 'components';

export const collection = {
  [types.CONTAINER]: { component: Container, actions: { selectComponent } },
  [types.INPUT_TEXT]: { component: InputText, actions: { changeValue } },
  [types.INPUT_CHECKBOX]: { component: InputCheckbox, actions: { changeValue } },
};

export default (component = {}) => {
  const { type } = component;
  const collectionComponent = collection[type];

  const Component = collectionComponent && collectionComponent.component;
  if (!Component) return null;

  const actions = collectionComponent.actions;

  return wrapComponent(Component, component, actions);
};
