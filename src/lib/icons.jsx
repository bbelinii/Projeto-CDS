import {
  Droplets, Armchair, Star, CloudRain, ShieldCheck, Wind,
  Home, Clock, Hand, BadgeCheck, MessageCircle, Truck, Sparkles,
  MapPin, Phone, Instagram, Menu, X, ChevronDown, MoveHorizontal,
  Quote, CheckCircle2,
} from 'lucide-react'

export const ICONS = {
  Droplets, Armchair, Star, CloudRain, ShieldCheck, Wind,
  Home, Clock, Hand, BadgeCheck, MessageCircle, Truck, Sparkles,
  MapPin, Phone, Instagram, Menu, X, ChevronDown, MoveHorizontal,
  Quote, CheckCircle2,
}

export function Icon({ name, ...props }) {
  const C = ICONS[name] || Star
  return <C {...props} />
}
