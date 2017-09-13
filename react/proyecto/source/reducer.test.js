import reducer from './reducer';
import actions from './actions';

// vamos a probar la acción `SET_COMMENTS` cuando se envía al store
test('reducer - SET_COMMENTS', () => {
  expect(
    reducer(
     undefined,
      actions.setComments([{ id: 1 }, { id: 2 }])
    )
  ).toMatchSnapshot();
});
