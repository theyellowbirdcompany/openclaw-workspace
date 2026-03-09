# Command Center Redesign — Floor Plan Spec

**Reference:** Nano Banana isometric office layout (top-down blueprint style)

---

## 1. Office Architecture

### Overall Shape
- **Boundary:** Irregular octagon with angled corners and cutout lobby
- **Dimensions:** 1400px × 900px (responsive scaling)
- **Wall style:** Dark navy (#0F172A) 3D beveled edges (isometric perspective)
- **Floor:** Light grey (#D1D5DB) with subtle grid pattern (1:0.5 isometric ratio)
- **Accent walls:** Right side has window cutout + northeast corner curved indent

### Key Zones
1. **Lobby / Entrance** (left side, lower)
   - Entry point, labeled "LOBBY Entrance"
   - Double door icon
   - Light grey with slightly darker marking

2. **Conf Room** (top-left)
   - Conference table (6-seat oval)
   - 3 chairs visible from top view
   - Label: "CONF ROOM"

3. **Collab Hub** (top-center)
   - Curved collaboration table (8-seat horseshoe shape)
   - 4 chairs visible
   - Blue curved desk detail
   - Label: "COLLAB HUB"

4. **Kitchen / Idle** (top-right)
   - Kitchenette: counter, sink, cabinet, stool
   - Lounge seating (2-3 chairs)
   - Label: "KITCHEN IDLE"

5. **Main Floor** (center)
   - 6 agent desks in 2 rows of 3
   - Open collaborative space
   - Each desk: chair + desk + agent label

6. **Scribe's Bay** (bottom-center)
   - Single agent desk (Devan or dedicated build zone)
   - Slightly separated from main grid

---

## 2. Agent Placement

### Top Row (from left to right)
| Position | Agent | Role | Desk Name | Zone |
|---|---|---|---|---|
| Top-Left | Claw | Orchestrator | Claw's Workstation | Command Post |
| Top-Center | Bernard | Strategist | Bernard's Hub | Strategy Center |
| Top-Right | Christopher | Researcher | Christopher's Desk | Research Wing |

### Bottom Row (from left to right)
| Position | Agent | Role | Desk Name | Zone |
|---|---|---|---|---|
| Bottom-Left | Atlas | Ops | Atlas's Workstation | Ops Station |
| Bottom-Center | Scribe | Communicator | Scribe's Post | Comms Hub |
| Bottom-Right | Vale | Growth | Vale's Desk | Growth Wing |

### Standalone
| Position | Agent | Role | Desk Name | Zone |
|---|---|---|---|---|
| Bottom-Center (separate) | Devan | Builder | Devan's Bay | Builder Workshop |

---

## 3. Visual Hierarchy & Typography

### Agent Name (Primary)
- **Size:** 18px (large, bold)
- **Font:** Inter Bold
- **Color:** White (#F1F5F9)
- **Position:** Center-bottom of desk label box

### Agent Role (Secondary)
- **Size:** 12px (small, regular)
- **Font:** Inter Regular
- **Color:** Light grey (#94A3B8)
- **Position:** Below agent name

### Desk Name (Tertiary)
- **Size:** 14px (regular, medium)
- **Font:** Inter Medium
- **Color:** Dark grey (#475569)
- **Position:** Above agent label

### Zone Labels (Header)
- **Size:** 16px (bold)
- **Font:** Inter Bold
- **Color:** Dark grey (#1F2937)
- **Position:** Top of each zone (above zone content)

---

## 4. Desk & Agent Icon Design

### Desk Shape
- Rounded rectangle (8px border-radius)
- Beige/cream background (#F5F3F0)
- Dark grey border (#6B7280)
- Subtle shadow (1px offset, 20% opacity)

### Desk Interior (Isometric Top-Down View)
```
┌─────────────────────┐
│                     │
│      [CHAIR]        │
│        TOP          │
│                     │
│   Agent Name        │
│   Agent Role        │
└─────────────────────┘
```

### Chair Icon (Isometric)
- Grey seat (#6B7280)
- Thin backrest
- 4-point base visible in isometric projection
- Size: ~24px

---

## 5. Color Palette

| Purpose | Color | Hex | Usage |
|---|---|---|---|
| Background | Navy | #0F172A | Outer background |
| Floor | Light Grey | #D1D5DB | Main floor area |
| Walls | Dark Navy | #1E293B | Boundary walls |
| Desk Base | Beige | #F5F3F0 | Desk background |
| Desk Border | Dark Grey | #6B7280 | Desk outline |
| Text Primary | White | #F1F5F9 | Agent names |
| Text Secondary | Light Grey | #94A3B8 | Agent roles |
| Text Tertiary | Dark Grey | #475569 | Zone/desk names |
| Accent (North) | Gold | #FBBF24 | Compass rose |
| Compass Background | Navy | #1E293B | Compass circle |
| Door/Exit | Slate | #64748B | Entrance marker |

---

## 6. Interactive Elements & Animation

### Agent Status Indicators
Each desk should have a subtle status indicator:
- **Idle:** Dim white dot, slow pulse (2s cycle)
- **Active:** Bright gold dot, steady glow
- **Collaborating:** Link lines between desks (animated pulse)
- **Submitting:** Upward particle animation (3s duration)

### Desk Hover States
- On desktop: Desk border brightens, shadow deepens, tooltip shows "Agent: [Name] | Status: [Status]"
- Mobile: Desk selected on tap, shows modal with agent stats

### Agent Movement
- When status changes: Desk pulses once (200ms)
- When collaboration detected: Line draws between agents (animated)
- When task completes: Particle burst animation (3s)

---

## 7. Compass Rose (Top-Left Corner)

### Design
- 80px diameter circle
- Dark navy background (#1E293B)
- Gold compass needle pointing up (#FBBF24)
- "N" label in gold below needle
- Subtle star marker at each cardinal point

### Position
- Fixed in top-left corner
- 20px margin from edges
- Always visible, doesn't scroll

---

## 8. Responsive Scaling

### Desktop (1200px+)
- Full office visible
- Desks: 120px × 100px
- Text: Full sizes as specified
- Zones clearly separated

### Tablet (768px - 1199px)
- Zoom to 80% of desktop
- Desks: 96px × 80px
- Text: 14px (names), 10px (roles)
- Zones slightly compressed horizontally

### Mobile (< 768px)
- Zoom to 60% of desktop
- Desks: 72px × 60px
- Text: 12px (names), 9px (roles)
- Single-column layout or carousel navigation between zones
- Compass compass becomes inline icon top-left

---

## 9. SVG/Canvas Notes for Implementation

### Projection: Isometric
- X-axis: 30° angle (cos 30° ≈ 0.866, sin 30° = 0.5)
- Y-axis: -30° angle (mirrored)
- Z-axis: Vertical
- Scale factor: 1:0.5 (depth is half visual width)

### Wall Rendering (Isometric Box)
```
Top face: light grey (#D1D5DB)
Left face: medium grey (#9CA3AF)
Right face: lighter grey (#E5E7EB)
Borders: dark navy (#1E293B)
```

### Desk Rendering (Isometric Cube)
```
Top face: beige (#F5F3F0)
Left face: tan (#ECDCC8)
Right face: cream (#FAF7F5)
Borders: dark grey (#6B7280)
```

---

## 10. Layout Grid (Percentage Coordinates)

### Zone Boundaries (x%, y%)
| Zone | Left | Right | Top | Bottom |
|---|---|---|---|---|
| Conf Room | 5% | 35% | 5% | 25% |
| Collab Hub | 35% | 65% | 5% | 25% |
| Kitchen | 65% | 95% | 5% | 25% |
| Main Floor (6 desks) | 15% | 85% | 30% | 75% |
| Scribe's Bay | 35% | 65% | 75% | 90% |
| Lobby | 5% | 15% | 60% | 95% |

### Agent Desk Positions (in Main Floor zone)
- **Row 1:** y = 35%
  - Claw: x = 25%
  - Bernard: x = 50%
  - Christopher: x = 75%

- **Row 2:** y = 60%
  - Atlas: x = 25%
  - Scribe: x = 50%
  - Vale: x = 75%

- **Standalone:** y = 82%
  - Devan: x = 50%

---

## 11. Delivery Checklist for Devan

- [ ] Isometric projection math correct (30° angles)
- [ ] All 7 agent desks render with correct labels
- [ ] Compass rose in top-left with N indicator
- [ ] Zone labels (Conf Room, Collab Hub, etc.) visible
- [ ] Color palette matches spec exactly
- [ ] Responsive scaling works on mobile/tablet/desktop
- [ ] Agent status indicators (pulse, glow) animate smoothly
- [ ] Desk hover/tap shows agent details
- [ ] Collaboration lines draw between active agents
- [ ] No text clipping on any screen size
- [ ] Performance: smooth 60fps on low-end devices
- [ ] Accessibility: all desks labeled with aria attributes

---

**Design Philosophy:** 
A professional ops command center. Organic, not rigid. Agents have personality and presence. The office feels alive — you can see who's working where and what they're doing. Not a game, not a toy — this is a real working space that just happens to be beautiful.
