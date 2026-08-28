'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { Group, Mesh } from 'three'
import * as THREE from 'three'

// Restored from Phase 2 commit 654cd5f — full file follows via world-data + rebuild
// CRITICAL: placeholder caused broken deploy. Restoring working experience.
export { WorldHall } from './world-hall-restored'
