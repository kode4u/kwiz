# Project Overview - LBE JICA AI-Enhanced Gamified Moodle Quiz

## Executive Summary

This project implements an AI-enhanced gamified quiz system integrated with Moodle, enabling real-time interactive quizzes with AI-generated questions, leaderboards, and instant feedback.

## Project Goals

1. **Enhance Learning Engagement**: Use gamification to increase student participation
2. **AI-Powered Content**: Generate high-quality questions automatically
3. **Real-time Interaction**: Enable live quiz sessions with instant feedback
4. **Research Contribution**: Collect data for educational research
5. **Open Source**: Release as open-source Moodle plugin

## System Components

### 1. Moodle Plugin
- **Technology**: PHP 8.x, Moodle 4.x
- **Purpose**: LMS integration, user management, activity creation
- **Key Features**:
  - Teacher dashboard
  - Student interface
  - JWT token generation
  - Results persistence

### 2. WebSocket Server
- **Technology**: Node.js, Socket.IO, Redis
- **Purpose**: Real-time communication hub
- **Key Features**:
  - Room/session management
  - Leaderboard calculations
  - Timer synchronization
  - Message routing

### 3. LLM API Service
- **Technology**: Python, Flask, OpenAI/Local LLM
- **Purpose**: Question generation
- **Key Features**:
  - Structured MCQ generation
  - Multi-language support
  - Difficulty adjustment
  - Bloom's taxonomy classification

## Architecture

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│   Moodle    │◄────►│   WebSocket  │◄────►│   LLM API   │
│   Plugin    │      │    Server    │      │   Service   │
└─────────────┘      └──────────────┘      └─────────────┘
      │                     │                      │
      │                     │                      │
      └─────────────────────┴──────────────────────┘
                            │
                    ┌───────┴────────┐
                    │     Redis      │
                    │   (Cache/Pub)  │
                    └────────────────┘
```

## Key Features

### For Teachers
- Create quiz sessions
- Generate questions using AI
- Control quiz flow in real-time
- Monitor student participation
- View leaderboards

### For Students
- Join live quiz sessions
- Answer questions in real-time
- Receive instant feedback
- Compete on leaderboards
- Track personal progress

## Technology Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| Moodle Plugin | PHP | 8.x |
| Moodle | Moodle | 4.x |
| WebSocket Server | Node.js | 18+ |
| LLM API | Python | 3.10+ |
| Database | MySQL/PostgreSQL | 8.0+ |
| Cache | Redis | 7+ |
| Containerization | Docker | 20.10+ |

## Project Timeline

- **Phase 0**: Preparations (Oct 2025, Week 1)
- **Phase 1**: Requirements & Design (Oct–Nov 2025)
- **Phase 2**: System Architecture (Nov–Dec 2025)
- **Phase 3**: Core Development (Dec 2025 – Feb 2026)
- **Phase 4**: Integration & Testing (Feb–Mar 2026)
- **Phase 5**: Pilot Deployment (Mar–Apr 2026)
- **Phase 6**: Analysis & Paper Writing (May–Jul 2026)
- **Phase 7**: Dissemination (Aug–Sep 2026)

## Deliverables

- [x] Project structure and documentation
- [ ] Requirements specification
- [ ] Alpha plugin release
- [ ] WebSocket server
- [ ] LLM adapter service
- [ ] Test reports (load & usability)
- [ ] Pilot dataset (anonymized)
- [ ] Conference paper draft
- [ ] Workshop materials

## Research Objectives

1. **System Performance**: Measure latency, throughput, error rates
2. **Learning Outcomes**: Pre/post test score improvements
3. **User Experience**: SUS scores, task success rates
4. **Engagement**: Time-on-task, participation rates

## Evaluation Metrics

- **System Metrics**: Latency (ms), throughput, error rate (%)
- **Learning Metrics**: Score improvement, time-on-task
- **UX Metrics**: SUS score, task success rate, qualitative feedback

## Security Considerations

- JWT authentication for WebSocket
- HTTPS/WSS in production
- Rate limiting on APIs
- Input sanitization
- Encrypted data storage
- Anonymized research data

## Scalability

- Horizontal scaling for WebSocket server
- Stateless LLM API service
- Redis cluster for high availability
- Load balancing support
- Database read replicas

## Open Source Release

- **License**: GPL v3 (Moodle compatibility)
- **Repository**: GitHub
- **Release**: v1.0.0 (target: Jul 2026)
- **Documentation**: Comprehensive installation and usage guides

## Future Enhancements

- GPU-backed local LLM support
- Enhanced multilingual support
- Integration with Moodle analytics
- Advanced gamification features
- Mobile app support

## Contact & Support

- **Project Repository**: [GitHub URL]
- **Issues**: GitHub Issues
- **Documentation**: `/docs` directory

## License

GPL v3 - Compatible with Moodle's license requirements.

---

**Status**: Development Phase  
**Last Updated**: January 2025

