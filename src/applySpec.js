export default function applySpec (spec) {
  return object => {
    return Object.entries(spec).reduce(
      (acc, [ key, project, ]) => ({
        ...acc,
        [key]: project(object),
      }),
      {}
    )
  }
}
