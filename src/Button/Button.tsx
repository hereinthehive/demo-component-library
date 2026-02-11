import React from "react";
import { css, keyframes } from "@emotion/css";

export interface ButtonProps {
  /**
   * The content to display inside the button
   */
  children: React.ReactNode;
  /**
   * Visual style variant of the button
   */
  variant?: "primary" | "secondary" | "danger" | "ghost";
  /**
   * Size of the button
   */
  size?: "small" | "medium" | "large";
  /**
   * Whether the button is disabled
   */
  disabled?: boolean;
  /**
   * Whether the button is in a loading state
   * Shows a loading indicator and disables interaction
   */
  loading?: boolean;
  /**
   * Optional icon to display before the text
   */
  icon?: React.ReactNode;
  /**
   * HTML button type
   */
  type?: "button" | "submit" | "reset";
  /**
   * Click handler
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Mouse enter handler
   */
  onMouseEnter?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Mouse leave handler
   */
  onMouseLeave?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Accessible label for the button (use when children is not descriptive)
   */
  "aria-label"?: string;
  /**
   * Additional CSS class names
   */
  className?: string;
  /**
   * Additional inline styles
   */
  style?: React.CSSProperties;
}

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const buttonBaseStyle = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
  border: none;
  border-radius: var(--button-border-radius-default);
  font-weight: var(--font-weight-medium);
  transition: all var(--transition-base);
  font-family: var(--font-family-base);
  outline: none;

  &:disabled {
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: var(--focus-ring-width) solid var(--color-border-focus);
    outline-offset: var(--focus-ring-offset);
  }
`;

const spinnerStyle = css`
  display: inline-block;
  width: 1em;
  height: 1em;
  border: var(--button-border-width-ghost) solid currentColor;
  border-right-color: transparent;
  border-radius: 9999px;
  animation: ${spin} 0.6s linear infinite;
`;

/**
 * Primary interactive element for user actions.
 *
 * Handles clicks, loading states, and various visual styles.
 * Ensures accessibility with proper ARIA attributes and focus management.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "medium",
      disabled = false,
      loading = false,
      icon,
      type = "button",
      onClick,
      onMouseEnter,
      onMouseLeave,
      "aria-label": ariaLabel,
      className = "",
      style,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    // Size styles using CSS variables from customer's design tokens
    const sizeStyles: Record<string, React.CSSProperties> = {
      small: {
        padding:
          "var(--button-size-small-padding-y) var(--button-size-small-padding-x)",
        fontSize: "var(--button-size-small-font-size)",
        minHeight: "var(--button-size-small-min-height)",
      },
      medium: {
        padding:
          "var(--button-size-medium-padding-y) var(--button-size-medium-padding-x)",
        fontSize: "var(--button-size-medium-font-size)",
        minHeight: "var(--button-size-medium-min-height)",
      },
      large: {
        padding:
          "var(--button-size-large-padding-y) var(--button-size-large-padding-x)",
        fontSize: "var(--button-size-large-font-size)",
        minHeight: "var(--button-size-large-min-height)",
      },
    };

    // Variant styles using CSS variables from customer's design tokens
    const variantStyles: Record<string, React.CSSProperties> = {
      primary: {
        backgroundColor: isDisabled
          ? "var(--button-primary-background-disabled)"
          : "var(--button-primary-background-default)",
        color: isDisabled
          ? "var(--button-primary-foreground-disabled)"
          : "var(--button-primary-foreground-default)",
        borderWidth: "var(--button-border-width-default)",
      },
      secondary: {
        backgroundColor: isDisabled
          ? "var(--button-secondary-background-disabled)"
          : "var(--button-secondary-background-default)",
        color: isDisabled
          ? "var(--button-secondary-foreground-disabled)"
          : "var(--button-secondary-foreground-default)",
        borderWidth: "var(--button-border-width-default)",
      },
      danger: {
        backgroundColor: isDisabled
          ? "var(--button-danger-background-disabled)"
          : "var(--button-danger-background-default)",
        color: isDisabled
          ? "var(--button-danger-foreground-disabled)"
          : "var(--button-danger-foreground-default)",
        borderWidth: "var(--button-border-width-default)",
      },
      ghost: {
        backgroundColor: isDisabled
          ? "var(--button-ghost-background-disabled)"
          : "var(--button-ghost-background-default)",
        color: isDisabled
          ? "var(--button-ghost-foreground-disabled)"
          : "var(--button-ghost-foreground-default)",
        borderWidth: "var(--button-border-width-ghost)",
        borderStyle: "solid",
        borderColor: isDisabled
          ? "var(--button-ghost-border-disabled)"
          : "var(--button-ghost-border-default)",
      },
    };

    const combinedStyles: React.CSSProperties = {
      ...sizeStyles[size],
      ...variantStyles[variant],
      cursor: isDisabled ? "not-allowed" : "pointer",
      borderRadius: "var(--button-border-radius-default)",
      ...style,
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!isDisabled) {
        if (document.activeElement !== event.currentTarget) {
          event.currentTarget.focus();
        }

        if (onClick) {
          onClick(event);
        }
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        if (isDisabled) {
          event.preventDefault();
          return;
        }

        if (type === "submit" || type === "reset") {
          event.preventDefault();
          event.currentTarget.click();
          return;
        }

        if (event.key === " ") {
          event.preventDefault();
        }

        if (onClick) {
          const syntheticEvent = {
            ...event,
            currentTarget: event.currentTarget,
            target: event.target,
          } as unknown as React.MouseEvent<HTMLButtonElement>;
          onClick(syntheticEvent);
        }
      }
    };

    const combinedClassName = className
      ? `${buttonBaseStyle} ${className}`
      : buttonBaseStyle;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        aria-label={ariaLabel}
        aria-busy={loading}
        aria-disabled={isDisabled}
        className={combinedClassName}
        style={combinedStyles}
        {...props}
      >
        {loading && (
          <span
            role="status"
            aria-label="Loading"
            className={spinnerStyle}
          />
        )}
        {!loading && icon && <span aria-hidden="true">{icon}</span>}
        <>{children}</>
      </button>
    );
  },
);

Button.displayName = "Button";
