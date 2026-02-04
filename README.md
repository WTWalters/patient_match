# CareTaker Match

A peer-to-peer matching platform connecting surgical patients who need post-operative care with patients willing to provide it.

## Project Status

**Current Phase:** MVP Prototype (iPad intake flow)

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## Project Structure

```
patient_match/
├── .claude/
│   └── skills/           # Claude Code skill files
├── docs/                  # Project documentation
├── src/
│   ├── components/        # Reusable UI components
│   ├── screens/           # Screen-level components
│   ├── hooks/             # Custom React hooks
│   ├── services/          # API and business logic
│   ├── types/             # TypeScript interfaces
│   └── utils/             # Helper functions
├── public/                # Static assets
└── tests/                 # Test files
```

## Documentation

- [Project Context](./CLAUDE.md) - Full project overview
- [Patient Intake Flow](./.claude/skills/patient-intake-flow.md) - User journey and data model
- [Design System](./.claude/skills/design-system.md) - Colors, typography, components
- [iPad UI Guidelines](./.claude/skills/ipad-ui.md) - Accessibility and touch targets
- [HIPAA Compliance](./.claude/skills/hipaa-compliance.md) - Security requirements

## Team

- Tom Eichmann, MD – Domain Expert
- Vivek Mohan, MD – Clinical Advisor  
- Hamid Sabet – Healthcare Business
- Whitney Walters – Technology Lead

## License

Proprietary - All rights reserved
