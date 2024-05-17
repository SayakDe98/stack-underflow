import React from "react";

interface CardProps {
  children: JSX.Element;
  styles?: any;
  onClick?: (event: any) => void;
}

const Card = ({ children, styles, ...rest }: CardProps) => {
  return (
    <div
      className={`block p-6 bg-white border border-gray-200 rounded lg-shadow hover:bg-gray-100 dark:bg-gray800 dark:border-gray-700 dark:hover:bg-gray-700 mb-${
        styles?.mb ? styles.mb : 0
      } cursor-${styles?.cursor ?? "auto"}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Card;
