export function getPropertiesNamesFromObject(values: any): string[] {
  const properties = [];
  // tslint:disable-next-line:forin
  for (const property in values) {
    properties.push(property);
  }
  return properties;
}
