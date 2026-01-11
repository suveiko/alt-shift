import type {
  ComponentType,
  PropsWithChildren,
  ReactElement,
  ReactNode,
} from 'react';

type ProviderComponent = ComponentType<{ children: ReactNode }>;

type Props = {
  providers: ProviderComponent[];
} & PropsWithChildren;

const ComposerFragment: ProviderComponent = ({ children }) => {
  return <>{children}</>;
};

const providerReducer = (
  ParentProvider: ProviderComponent,
  ChildProvider: ProviderComponent,
): ProviderComponent => {
  return ({ children }) => {
    return (
      <ParentProvider>
        <ChildProvider>{children}</ChildProvider>
      </ParentProvider>
    );
  };
};

export const ProviderComposer = ({
  children,
  providers,
}: Props): ReactElement => {
  const ComposedProviders = providers.reduce(providerReducer, ComposerFragment);

  return <ComposedProviders>{children}</ComposedProviders>;
};
