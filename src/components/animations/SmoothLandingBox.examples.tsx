/**
 * SmoothLandingBox Usage Examples
 *
 * This file demonstrates various ways to use the SmoothLandingBox component
 * and its related helpers for creating smooth entrance animations.
 */

import {
  SmoothLandingBox,
  SmoothLandingContainer,
  SmoothLandingItem,
} from "./SmoothLandingBox";

// Example 1: Basic slide-up animation (default)
export const BasicExample = () => (
  <SmoothLandingBox>
    <div className="card">Content appears with smooth slide-up</div>
  </SmoothLandingBox>
);

// Example 2: Different animation variants
export const VariantsExample = () => (
  <>
    <SmoothLandingBox variant="fade">
      <div>Fade in</div>
    </SmoothLandingBox>

    <SmoothLandingBox variant="slide-down">
      <div>Slide from top</div>
    </SmoothLandingBox>

    <SmoothLandingBox variant="slide-left">
      <div>Slide from right</div>
    </SmoothLandingBox>

    <SmoothLandingBox variant="slide-right">
      <div>Slide from left</div>
    </SmoothLandingBox>

    <SmoothLandingBox variant="scale">
      <div>Scale up</div>
    </SmoothLandingBox>

    <SmoothLandingBox variant="bounce">
      <div>Bounce in</div>
    </SmoothLandingBox>
  </>
);

// Example 3: Sequential animations with delays
export const SequentialExample = () => (
  <>
    <SmoothLandingBox delay={0}>
      <div>First item (no delay)</div>
    </SmoothLandingBox>

    <SmoothLandingBox delay={0.2}>
      <div>Second item (0.2s delay)</div>
    </SmoothLandingBox>

    <SmoothLandingBox delay={0.4}>
      <div>Third item (0.4s delay)</div>
    </SmoothLandingBox>
  </>
);

// Example 4: Custom duration and distance
export const CustomParametersExample = () => (
  <SmoothLandingBox duration={1.2} distance={60} variant="slide-up">
    <div>Slower animation with more distance</div>
  </SmoothLandingBox>
);

// Example 5: Interactive animations (hover and tap)
export const InteractiveExample = () => (
  <SmoothLandingBox hover tap className="cursor-pointer">
    <div className="card">Hover and click me for interactions!</div>
  </SmoothLandingBox>
);

// Example 6: Stagger children animations
export const StaggerExample = () => (
  <SmoothLandingContainer staggerDelay={0.15}>
    <SmoothLandingItem>
      <div className="card">Item 1</div>
    </SmoothLandingItem>

    <SmoothLandingItem>
      <div className="card">Item 2</div>
    </SmoothLandingItem>

    <SmoothLandingItem>
      <div className="card">Item 3</div>
    </SmoothLandingItem>

    <SmoothLandingItem>
      <div className="card">Item 4</div>
    </SmoothLandingItem>
  </SmoothLandingContainer>
);

// Example 7: Navigation menu items with stagger
export const NavigationExample = () => (
  <SmoothLandingContainer staggerDelay={0.08}>
    {["Dashboard", "Operations", "Inventory", "Customers", "Settings"].map(
      (item) => (
        <SmoothLandingItem key={item} variant="slide-right" distance={20}>
          <div className="nav-item">{item}</div>
        </SmoothLandingItem>
      )
    )}
  </SmoothLandingContainer>
);

// Example 8: Card grid with stagger
export const CardGridExample = () => (
  <SmoothLandingContainer staggerDelay={0.1}>
    <div className="grid grid-cols-3 gap-4">
      {[1, 2, 3, 4, 5, 6].map((num) => (
        <SmoothLandingItem key={num} variant="scale">
          <div className="card">Card {num}</div>
        </SmoothLandingItem>
      ))}
    </div>
  </SmoothLandingContainer>
);

// Example 9: Hero section with multiple elements
export const HeroExample = () => (
  <>
    <SmoothLandingBox delay={0} variant="fade" duration={0.8}>
      <h1>Welcome to DriveMech</h1>
    </SmoothLandingBox>

    <SmoothLandingBox delay={0.3} variant="slide-up" distance={30}>
      <p>Your complete automotive service solution</p>
    </SmoothLandingBox>

    <SmoothLandingBox delay={0.6} variant="scale">
      <button>Get Started</button>
    </SmoothLandingBox>
  </>
);

// Example 10: Sidebar navigation (practical use case)
export const SidebarExample = () => (
  <aside className="sidebar">
    {/* Logo */}
    <SmoothLandingBox delay={0} variant="fade">
      <div className="logo">DriveMech</div>
    </SmoothLandingBox>

    {/* Navigation items with stagger */}
    <SmoothLandingContainer staggerDelay={0.08}>
      <SmoothLandingItem variant="slide-right" distance={15}>
        <div className="nav-item">Dashboard</div>
      </SmoothLandingItem>

      <SmoothLandingItem variant="slide-right" distance={15}>
        <div className="nav-item">Operations</div>
      </SmoothLandingItem>

      <SmoothLandingItem variant="slide-right" distance={15}>
        <div className="nav-item">Inventory</div>
      </SmoothLandingItem>
    </SmoothLandingContainer>
  </aside>
);
