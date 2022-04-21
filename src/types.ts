// --- Helper types ---
export type Optional<T> = T | undefined;
export type PermissiveOptional<T> = T | undefined | null | false | void;

export type PermissiveChild = PermissiveOptional<Component | BlorpNode>;
export type PermissiveChildren = PermissiveOptional<
  PermissiveChild[] | PermissiveChild
>;

// --- Element types ---
export type DomRepresentedProp =
  | "id"
  | "class"
  | "value"
  | "checked"
  | "selected"
  | "disabled"
  | "readonly"
  | "hidden"
  | "tabindex";

export interface BaseProps {}

export type BasicElementProps = {
  [key in DomRepresentedProp]?: string | boolean | number;
} & BaseProps;

// --- Blorp Node and Constructor types ---
export interface Hooks {
  rerender: () => void;
  useState: UseStateHandler;
  useEffect: UseEffectHandler;
}

export type Component = ((hooks: Hooks) => Optional<BlorpNode | Component>) & {
  key?: string;
};

export type BlorpElementNode = {
  _blorp: true;
  type: "element";
  tag: string;
  children: Optional<Component[]>;
  props: { [key: string]: any };
};

export type BlorpFragmentNode = {
  _blorp: true;
  type: "fragment";
  children: Component[];
};

export type BlorpNode = BlorpElementNode | BlorpFragmentNode | string;

// --- Hook types ---
interface BlorpContext<T> {
  _blorp?: T;
}

export type UseStateHandler = <T>(
  initialState: T
) => [T, (newState: T) => void];
export type UseEffectHandler = (
  create: () => (() => void) | void,
  deps: any[] | void | null
) => void;
export type UseContextHandler = <T>(context: BlorpContext<T>) => T;
