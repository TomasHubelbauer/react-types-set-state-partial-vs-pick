# React Types `setState` `Partial` vs. `Pick`

In this repository I attempt to demonstrate a problem I found with the React TypeScript typings.

It used to be that the type of the `setState` function was `(state: AppState) => Partial<AppState>`.

Now with the introduction of `Pick`, the type is inferred based on the return value, so for example:
`(state) => ({ flag: !state.flag })` infers a return type of `Pick<AppState, 'flag'>`.

This is all well and good, but it starts to become a problem when you have conditional logic in your
`setState` function:

```typescript
setState(state => {
  if (!state.condition) {
    return {};
  }
  
  return { flag: !state.flag };
});
```

This will yell because TypeScript inferrence cannot reconcile the fact that two different versions
of `Pick` are present - one with no fields and one with the `flag` field.

Maybe the no field case is an edge case, so let's try the same thing returning different fields in
different branches:

```typescript
setState(state => {
  if (state.flag) {
    return { trueFlag: Date.now() };
  }
  
  return { falseFlag: Date.now() };
});
```

This still errors!
