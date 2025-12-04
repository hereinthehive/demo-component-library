/**
 * TestBlock Component
 *
 * A colored rectangle component with default (blue) and inactive (grey) states.
 * Matches Figma design: Component Library / Test Block
 *
 * Figma Design:
 * - Default state: #3e66d5 (blue)
 * - Inactive state: #c8c3c3 (grey)
 * - Dimensions: 263×263px
 */

import React from "react";
import styles from "./TestBlock.module.css";

export interface TestBlockProps {
  /**
   * Visual state of the test block
   * @default 'default'
   */
  state?: "default" | "inactive";

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
 * TestBlock component - A simple colored rectangle for testing purposes
 */
export const TestBlock: React.FC<TestBlockProps> = ({
  state = "default",
  className,
  "data-testid": testId = "testBlock",
}) => {
  const stateClass = state === "inactive" ? styles.inactive : "";
  const computedClassName =
    `${styles.testBlock} ${stateClass} ${className || ""}`.trim();

  return (
    <div className={computedClassName} data-testid={testId} data-state={state} />
  );
};
