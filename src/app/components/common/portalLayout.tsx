import { EnhancedComponentProps, WithPortalAppBarProps } from "../../../../types/portalLayout";
import { ComponentType } from "react";
import Topbar from "./Topbar";

const withPortalAppBar = <T extends EnhancedComponentProps>(
  WrappedComponent: ComponentType<T>,
  { componentProps }: WithPortalAppBarProps
) => {
  const EnhancedComponent: React.FC<T> = (props) => {
    return (
      <div className="flex flex-col h-lvh">
        <Topbar />
        <WrappedComponent {...props} {...componentProps} />
      </div>
    );
  };
  return EnhancedComponent;
};

export default withPortalAppBar;