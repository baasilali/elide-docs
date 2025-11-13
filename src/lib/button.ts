import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-gray-800 text-white hover:bg-gray-700 focus-visible:outline-pink-500",
        ghost: "hover:bg-gray-100 text-gray-800 focus-visible:outline-purple-500",
        outline:
          "border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 focus-visible:outline-purple-500",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3",
        lg: "h-10 rounded-md px-6",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

