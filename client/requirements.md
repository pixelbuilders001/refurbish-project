## Packages
framer-motion | Smooth animations for product cards, modals, and page transitions
react-hook-form | Form handling for checkout and search
@radix-ui/react-slider | For price range slider filter
@radix-ui/react-accordion | For collapsible sidebar filters

## Notes
Tailwind Config - extend fontFamily:
fontFamily: {
  display: ["var(--font-display)"],
  body: ["var(--font-body)"],
}
Cart state is managed via Context + LocalStorage (no backend cart).
Product data is fetched from /api/products but treated as a read-only catalog.
Checkout is a static simulation.
