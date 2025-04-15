# DASI - Product Requirements Document

## 1. Product Overview

DASI is a modern web application built with Svelte, focusing on providing an intuitive and accessible user interface with reusable components.

### 1.1 Purpose

To create a robust web application that delivers a seamless user experience through well-designed, reusable components and consistent interaction patterns.

### 1.2 Target Audience

-   Primary users:
    -   Students seeking AI assistance for educational purposes
    -   Adults looking for affordable and reliable AI assistance
-   Secondary users: [To be defined]

## 2. Technical Requirements

### 2.1 Technology Stack

-   Frontend Framework: Svelte
-   Styling: CSS with CSS Variables for theming
-   Component Architecture: Modular, reusable components
-   Build System: [To be defined]
-   Authentication: Multiple login methods supported
-   API Integration: External GPT APIs
-   Database: Firebase Realtime Database

### 2.2 Component Library

#### 2.2.1 Choice Component

-   **Purpose**: Provide an enhanced radio button selection interface
-   **Features**:
    -   Custom styled radio button interface
    -   Visual feedback for hover and selected states
    -   Support for icons
    -   Accessible keyboard navigation
    -   Customizable through CSS variables
-   **Props**:
    -   `icon`: Optional SVG icon
    -   `text`: Choice text content
    -   `selected`: Boolean for selection state
    -   `group`: Radio button group name

### 2.3 Design System

#### Colors

-   Accent color for selected states
-   Secondary border/divider colors
-   Background colors
-   Text colors

#### Animations

-   Smooth transitions (0.3s duration)
-   Scale effects for hover states
-   Shadow effects for depth

### 2.2 Authentication & API Integration

-   **Authentication**:
    -   Google OAuth integration
    -   Firebase Authentication
    -   Secure session management
    -   User profile management
    -   User Creation Flow:
        -   First-time login redirection
        -   Required Information:
            -   Full name
            -   Email address
            -   Intended use case
            -   Discovery source
            -   Newsletter subscription preference
        -   DASI user profile creation
        -   Profile completion requirements
-   **API Integration**:
    -   Integration with external GPT APIs
    -   API key management
    -   Rate limiting and quota management
    -   Error handling and fallback mechanisms

### 2.4 Data Persistence

-   **Database**:
    -   Firebase Realtime Database implementation
    -   Real-time chat synchronization
    -   Offline data persistence
    -   Automatic data recovery
-   **Data Structure**:
    -   User profiles and preferences
        -   Basic user information
        -   Account settings
        -   Usage preferences
        -   Newsletter subscription status (features to be determined)
    -   Chat history and messages
    -   Conversation metadata
    -   User settings
-   **Data Management**:
    -   Real-time updates
    -   Conflict resolution
    -   Data validation
    -   Backup and recovery procedures

### 2.5 Security & Hosting

-   **Authentication**:
    -   Google OAuth integration
    -   Firebase Authentication
    -   Secure session management
    -   User profile protection
-   **Data Security**:
    -   Firebase Realtime Database security rules
    -   Encrypted data transmission
    -   Secure API key management
-   **Hosting & Deployment**:
    -   Cloudflare hosting
    -   Environment variable management
    -   Secure API key storage in .env files
    -   Continuous deployment pipeline
-   **Privacy Controls**:
    -   User data encryption
    -   Secure chat storage
    -   Data access controls
    -   Privacy policy compliance

### 2.6 Dependencies & Services

-   **AI Services**:
    -   ChatGPT API integration
    -   OpenAI Image Generation API
    -   Custom API endpoints for text generation
-   **Authentication**:
    -   Google Authentication
    -   Firebase Authentication
-   **Database**:
    -   Firebase Realtime Database
-   **Payment Processing**:
    -   Stripe integration
    -   Subscription-based payment system
    -   Tiered access plans:
        -   Message quota management
        -   Image generation limits
        -   Feature access levels
    -   Payment tracking and management
-   **Custom APIs**:
    -   Title generation
    -   Image generation (OpenAI integration)
    -   Text generation
    -   User management
    -   Chat management
-   **Hosting & CDN**:
    -   Cloudflare

## 3. Functional Requirements

### 3.1 Core Features

1. Chat Interface

    - **Navigation**:
        - Sidebar-based chat navigation
        - Chat list with titles
        - Active chat highlighting
    - **Chat Management**:
        - New chat creation via dedicated button
        - Chat Title Generation:
            - AI-generated titles based on first message
            - 1-4 word title format
            - Automatic title generation
            - Title editing capability
        - Chat title editing
        - Chat Deletion:
            - Direct database removal
            - Firebase Realtime Database cleanup
            - Immediate chat removal
            - No recovery option
        - Chat Sharing:
            - Shareable chat links
            - URL format: dasigpt.com/chats?userid=dasi-id?id=chatId
            - Direct chat access via shared links
            - Chat visibility controls
    - **Message Display**:
        - Real-time message updates
        - Loading indicators for AI responses
        - Message threading and context preservation
    - **Code Handling**:
        - Syntax highlighting using Prism.js
        - Automatic language detection in HTML code blocks
        - Language-specific color coding
        - Code block copy functionality
        - Responsive code block display
    - **UI/UX**:
        - Mobile-responsive sidebar toggle
        - Smooth transitions and animations
        - Clear visual hierarchy
        - Intuitive chat management controls

2. AI Assistant Capabilities

    - Full GPT model functionality
    - Natural language processing
    - Context-aware responses
    - Multi-turn conversations
    - Code generation and explanation
    - Educational assistance
    - General knowledge queries
    - Creative content generation
    - Automatic Image Generation:
        - Context-based detection of image generation requests
        - Seamless transition to image generation
        - No explicit model selection required
        - Natural language understanding for image prompts

3. Component State Management

    - Controlled component patterns
    - Event handling for user interactions
    - Proper state synchronization

4. Accessibility

    - ARIA compliance
    - Keyboard navigation support
    - Screen reader compatibility

5. Responsive Design
    - Mobile-responsive interface
    - Adaptive sidebar for mobile devices
    - Responsive chat layout
    - Touch-friendly interactions
    - Screen size adaptations
    - Flexible component layouts
    - Mobile-optimized navigation
    - Responsive input fields
    - Adaptive message display

### 3.2 User Interface

-   Modern, clean design
-   Consistent visual feedback
-   Smooth transitions and animations
-   Clear visual hierarchy

## 4. Non-Functional Requirements

### 4.1 Performance

-   Performance requirements to be defined
-   Optimization goals to be determined
-   Response time targets to be established
-   Resource usage limits to be specified

### 4.2 Browser Support

-   Modern browsers (Chrome, Firefox, Safari, Edge)
-   Mobile browsers

### 4.3 Accessibility Standards

-   WCAG 2.1 compliance
-   Semantic HTML
-   Proper ARIA attributes

## 5. Future Considerations

### 5.1 Scalability

-   Component library expansion
-   Theme customization
-   Additional interaction patterns
-   Business Integration:
    -   Planned feature: Embeddable chatbot for business websites
    -   Specific features and customizations to be determined
    -   Integration requirements to be defined
    -   Business-specific needs to be analyzed

### 5.2 Maintenance

-   Documentation requirements
-   Testing strategy
-   Version control

## 6. Success Metrics

-   Success metrics and KPIs to be defined if needed in the future
-   Current focus on delivering core functionality and user experience

## 7. Timeline and Milestones

[To be defined]

## 8. Risks and Mitigation

-   No specific risks identified at this time
-   Risk assessment to be conducted as needed
-   Mitigation strategies to be developed based on future risk analysis

---

Note: This PRD is a living document and should be updated as requirements are clarified and refined.
