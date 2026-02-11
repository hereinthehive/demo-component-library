/**
 * Card Component
 *
 * A data-display component that groups related information in a contained, structured format
 */

import React from "react";
import styles from "./Card.module.scss";

export interface CardProps {
  /**
   * Children to render inside the card
   */
  children?: React.ReactNode;

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Test ID for automated testing
   */
  "data-testid"?: string;
}

/**
 * Card component
 */
export const Card: React.FC<CardProps> = ({
  children,
  className,
  "data-testid": testId = "card",
}) => {
  return (
    <div
      className={`${styles.card} ${className || ""}`.trim()}
      data-testid={testId}
    >
      {children}
    </div>
  );
};
