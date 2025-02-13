declare module "*.json" {
  const value: any;
  export default value;
}

declare module "react-simple-maps" {
  export const ComposableMap: React.ComponentType<any>;
  export const Geographies: React.ComponentType<any>;
  export const Geography: React.ComponentType<any>;
}
