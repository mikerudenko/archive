export function ActionCreatorFactory(type) {
  return Object.assign(
    payload => ({
      type,
      payload,
    }),
    {
      is(action) {
        return action.type === type;
      },
      get type() {
        return type;
      },
    },
  );
}
