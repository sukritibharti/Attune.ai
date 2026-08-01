import { Technique, MoodType, ThoughtRecord } from './types';

export const TECHNIQUES: Technique[] = [
  {
    id: 'paced-breathing',
    title: 'Paced Breathing',
    description: 'Slow your heart rate and rebalance your nervous system with guided rhythmic breath.',
    duration: '3 MIN',
    tag: 'CALM',
    icon: 'air',
    bgClass: 'bg-[#8ba88e]/30',
    textClass: 'text-[#4a654e]',
  },
  {
    id: 'grounding-54321',
    title: '5-4-3-2-1 Grounding',
    description: 'Anchor yourself in the present moment by engaging all five of your senses.',
    duration: '5 MIN',
    tag: 'FOCUS',
    icon: 'visibility',
    bgClass: 'bg-[#d1e5f9]/40',
    textClass: 'text-[#4e6071]',
  },
  {
    id: 'cognitive-reframe',
    title: 'Cognitive Reframe',
    description: 'Identify intrusive thoughts and gently shift your perspective towards clarity.',
    duration: '8 MIN',
    tag: 'CLARITY',
    icon: 'psychology',
    bgClass: 'bg-[#b69d7b]/30',
    textClass: 'text-[#705b3e]',
  },
  {
    id: 'mindfulness-script',
    title: 'Mindfulness Script',
    description: 'A guided audio journey designed to help you observe your emotions without judgment.',
    duration: '10 MIN',
    tag: 'AWARENESS',
    icon: 'self_care',
    bgClass: 'bg-[#8ba88e]/30',
    textClass: 'text-[#4a654e]',
  },
  {
    id: 'journaling',
    title: 'Journaling',
    description: 'Unload your thoughts onto the digital canvas and track your emotional evolution.',
    duration: 'OPEN',
    tag: 'REFLECTION',
    icon: 'menu_book',
    bgClass: 'bg-[#d1e5f9]/40',
    textClass: 'text-[#4e6071]',
  },
];

export const MOOD_CONFIG: Record<MoodType, { label: string; icon: string; color: string }> = {
  anxious: {
    label: 'Anxious',
    icon: 'waves',
    color: '#09090b',
  },
  lonely: {
    label: 'Lonely',
    icon: 'cloud',
    color: '#0c0a09',
  },
  overwhelmed: {
    label: 'Overwhelmed',
    icon: 'thunderstorm',
    color: '#090d16',
  },
  low: {
    label: 'Low',
    icon: 'eco',
    color: '#07120e',
  },
  other: {
    label: 'Other',
    icon: 'more_horiz',
    color: '#09090b',
  },
};

export const INITIAL_THOUGHTS: ThoughtRecord[] = [
  {
    id: '1',
    content: 'Feeling like I have too many deadlines coming up all at once today.',
    mood: 'overwhelmed',
    date: 'Yesterday, 8:45 AM',
    reframe: 'You do not have to finish everything in one single hour. Breaking tasks into tiny single steps will give you calm momentum.',
    perspective: 'Focusing on just the next 15 minutes creates immediate mental space.',
    technique: 'Paced Breathing'
  },
  {
    id: '2',
    content: 'Woke up feeling a bit restless and disconnected.',
    mood: 'anxious',
    date: '3 days ago, 7:15 AM',
    reframe: 'Restlessness is just your nervous system asking for grounding. A short walk or rhythmic breath brings you right back.',
    perspective: 'Your body is simply signaling a need for a moment of peace.',
    technique: '5-4-3-2-1 Grounding'
  }
];

export const NATURE_IMAGE_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpttKBpf_tcLOZGLJ3kJHyAnlH5nW1YJzZwOb-oig55LQ_bJ0qDhHO8VULjVYY6oZsxelkhSLIfwmOfWlJepRi6eY0bnWTLldAgB8ISW8MFAA0MoNdRZzgf5LRKCQpWcV9klHsDRWCP1rpA3W090ZODvs1Wig5tDRJkwRLIsQoI0_6vu4yHj-JPLPNw-1i-kfNvteI_QYi-xPc3H5pN2w63SUNdfKitaFgZd0xJ0r6BNphasSYITzKHA';

export const AVATAR_IMAGE_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRveiU5t5u3w2fQnO2M5TRgLg3QQrnkTTHiEI57zO46q2jYfAG7PQgLXWeNz1pcHLTbyjfE1PjADFE0LmK7ki5PUTY3686gmf-nzOgUcLeld_4VGRT34fMmMVEJMH7yGxxJcofbZ9wnxZK8SDrr2OdYvsSBouQ2sE19rUZuBh_HreLir1MQg-jYo1O4xLsVA8rGrdsG0RAHKdZs5NNnX06TgVYHFEODIomz-U3DWEAwgPa3uvuwhOZJw';

export const AVATAR_IMAGE_URL_ALT = 'https://lh3.googleusercontent.com/aida-public/AB6AXuD94I5PuleCurpuw-YoVi5GJyKUgNbK84LrqrGeBLCRh7yThSzyU6K7AQ0EGOtXZOMAkzmnLGYAmsZl5nReowO-b6iRaLoIsu9ASShKPBKwFW1Wvy19CooipxJ-h-Ny3xPpnHa_h6k0VVakJ4nFzXM8J5fo3T8xW7xNBlqLh6-sYeXxso83x1UWnSQwybwUNFbHDkeYfukM5rN_suhsIAV2rrVrIpFxwR4PUbgnfvKgbHCBUT3zuUdOxg';
