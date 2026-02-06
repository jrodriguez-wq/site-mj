"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, useMemo } from "react";
import { Menu, Phone, X, ChevronDown, Sparkles, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CONTACT_INFO } from "@/config/seo";
import { cn } from "@/lib/utils";
import { getCopy } from "@/lib/constants/copy";

interface NavigationItem {
  title: string;
  href: string;
  children?: Array<{
    title: string;
    href: string;
    description?: string;
  }>;
}

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);
  const [justClosed, setJustClosed] = useState(false);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const navigationItems: NavigationItem[] = useMemo(() => [
    { title: getCopy("nav.home"), href: "/" },
    { title: getCopy("nav.rentToOwn"), href: "/rent-to-own" },
    { title: getCopy("nav.scheduleAppointment"), href: "/schedule-appointment" },
    {
      title: getCopy("nav.buyHome"),
      href: "#",
      children: [
        { title: getCopy("nav.models"), href: "/models", description: getCopy("nav.modelsDesc") },
        { title: getCopy("nav.labelle"), href: "/communities/labelle", description: getCopy("communities.labelle.description") },
        { title: getCopy("nav.lehighAcres"), href: "/communities/lehigh-acres", description: getCopy("communities.lehighAcres.description") },
        { title: getCopy("nav.payments"), href: "/pay-links", description: getCopy("nav.paymentsDesc") },
      ],
    },
    {
      title: getCopy("nav.resources"),
      href: "#",
      children: [
        { title: getCopy("nav.blog"), href: "/blog", description: getCopy("nav.blogDesc") },
        { title: getCopy("nav.homeBuyingGuide"), href: "/home-buying-guide", description: getCopy("nav.homeBuyingGuideDesc") },
        { title: "Section 8", href: "/section8", description: "Learn about Section 8 Housing Voucher Program and how to use it for homeownership" },
        { title: "Rental Application", href: "/rental-application", description: "Apply for rental properties with M.J. Newell Homes" },
        { title: getCopy("nav.warranty"), href: "/warranty", description: getCopy("nav.warrantyDesc") },
      ],
    },
    {
      title: getCopy("nav.company"),
      href: "#",
      children: [
        { title: getCopy("nav.aboutUs"), href: "/about-us", description: getCopy("nav.aboutUsDesc") },
        { title: getCopy("nav.contact"), href: "/contact", description: getCopy("nav.contactDesc") },
      ],
    },
  ], []);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdown) {
        const dropdownElement = dropdownRefs.current[openDropdown];
        if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
          setOpenDropdown(null);
        }
      }
    };

    if (openDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [openDropdown]);

  // Manejar hover con delay de 1 segundo
  const handleMouseEnter = (itemTitle: string) => {
    // Cancelar cualquier timeout de cierre pendiente
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    
    // Si ya está abierto, no hacer nada
    if (openDropdown === itemTitle) {
      return;
    }
    
    // No abrir si se acaba de cerrar por un click en un link (esperar 2 segundos)
    if (justClosed) {
      return;
    }
    
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    const timeout = setTimeout(() => {
      setOpenDropdown(itemTitle);
    }, 1000);
    setHoverTimeout(timeout);
  };

  const handleMouseLeave = () => {
    // Limpiar timeout de hover
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    
    // Si hay un dropdown abierto, esperar un poco antes de cerrarlo
    // Esto permite que el usuario mueva el mouse del botón al dropdown
    if (openDropdown) {
      const timeout = setTimeout(() => {
        setOpenDropdown(null);
      }, 200); // 200ms de delay para permitir movimiento del mouse
      setCloseTimeout(timeout);
    }
  };
  
  // Manejar cuando el mouse entra al dropdown
  const handleDropdownMouseEnter = () => {
    // Cancelar cualquier timeout de cierre pendiente
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
  };
  
  // Manejar cuando el mouse sale del dropdown
  const handleDropdownMouseLeave = () => {
    // Cerrar el dropdown cuando el mouse sale del dropdown
    if (openDropdown) {
      const timeout = setTimeout(() => {
        setOpenDropdown(null);
      }, 200);
      setCloseTimeout(timeout);
    }
  };

  // Manejar click para abrir/cerrar
  const handleClick = (itemTitle: string) => {
    // Limpiar cualquier timeout pendiente
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    // Resetear el flag de justClosed cuando se hace click manualmente
    setJustClosed(false);
    if (openDropdown === itemTitle) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(itemTitle);
    }
  };

  // Cerrar al hacer clic en un link
  const handleLinkClick = () => {
    // Limpiar cualquier timeout pendiente para evitar que se vuelva a abrir
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    // Marcar que se acaba de cerrar para prevenir que se vuelva a abrir inmediatamente
    setJustClosed(true);
    setOpenDropdown(null);
    setIsOpen(false);
    
    // Resetear el flag después de 2 segundos
    setTimeout(() => {
      setJustClosed(false);
    }, 2000);
  };
  
  // Limpiar timeouts al desmontar
  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
      if (closeTimeout) {
        clearTimeout(closeTimeout);
      }
    };
  }, [hoverTimeout, closeTimeout]);

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-[100] w-full border-b border-border/20 bg-background/95 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/80 shadow-[0_1px_3px_rgba(0,0,0,0.05)] animate-fade-in-down"
      role="banner"
    >
      {/* Elegant top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
        <div className="flex h-16 sm:h-18 md:h-20 lg:h-24 items-center justify-between">
          {/* Logo - Grande, sin animación hover */}
          <Link
            href="/"
            className="flex items-center"
            aria-label="M.J. Newell Homes - Home"
          >
            <Image
              src="/img/logo.svg"
              alt="M.J. Newell Homes"
              width={280}
              height={160}
              className="h-14 sm:h-16 md:h-18 lg:h-20 xl:h-22 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation - Premium Design */}
          <nav 
            className="hidden lg:flex items-center gap-1 xl:gap-2" 
            role="navigation" 
            aria-label="Main navigation"
            suppressHydrationWarning
          >
            {navigationItems.length > 0 && navigationItems.map((item, index) => {
              if (item.children) {
                const isOpen = openDropdown === item.title;
                return (
                  <div
                    key={item.title}
                    className="relative"
                    ref={(el) => {
                      dropdownRefs.current[item.title] = el;
                    }}
                    onMouseEnter={() => handleMouseEnter(item.title)}
                    onMouseLeave={handleMouseLeave}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <button
                      onClick={() => handleClick(item.title)}
                      className={cn(
                        "group relative inline-flex h-10 items-center justify-center rounded-lg px-2 xl:px-3 py-2",
                        "text-xs xl:text-sm font-semibold tracking-normal transition-all duration-300 ease-out whitespace-nowrap",
                        "text-foreground/80 hover:text-foreground",
                        "before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-primary/0 before:via-primary/0 before:to-primary/0",
                        "before:transition-all before:duration-300 before:opacity-0",
                        "hover:before:opacity-100 hover:before:from-primary/5 hover:before:via-primary/8 hover:before:to-primary/5",
                        isOpen && "text-foreground before:opacity-100 before:from-primary/8 before:via-primary/10 before:to-primary/8",
                        "after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:w-0 after:-translate-x-1/2",
                        "after:bg-gradient-to-r after:from-transparent after:via-primary after:to-transparent",
                        "after:transition-all after:duration-300",
                        (isOpen || "group-hover:after:w-3/4")
                      )}
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                      aria-label={`${item.title} menu`}
                      suppressHydrationWarning
                    >
                      <span className="relative z-10 flex items-center gap-1 xl:gap-1.5">
                        {item.title}
                        <ChevronDown
                          className={cn(
                            "h-3 w-3 transition-all duration-300 ease-out",
                            isOpen && "rotate-180 text-primary"
                          )}
                          aria-hidden="true"
                        />
                      </span>
                    </button>

                    {/* Premium Dropdown Menu */}
                    {isOpen && (
                      <div 
                        className="absolute top-full left-0 mt-2 w-[420px] min-w-[280px] lg:w-[480px] lg:min-w-[480px] rounded-xl border border-border/30 bg-background/98 backdrop-blur-2xl shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15)] overflow-hidden animate-in fade-in-0 zoom-in-95 slide-in-from-top-3 duration-300"
                        role="menu"
                        aria-label={`${item.title} submenu`}
                        onMouseEnter={handleDropdownMouseEnter}
                        onMouseLeave={handleDropdownMouseLeave}
                        style={{ maxWidth: 'min(480px, calc(100vw - 2rem))' }}
                      >
                        {/* Elegant gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
                        
                        {/* Top accent line */}
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                        
                        <div className="relative p-4">
                          <div className="grid gap-2">
                            {item.children.map((child, childIndex) => (
                              <Link
                                key={child.title}
                                href={child.href}
                                onClick={handleLinkClick}
                                className={cn(
                                  "group/item relative block rounded-lg p-3.5 transition-all duration-300 ease-out",
                                  "border border-transparent hover:border-primary/20",
                                  "bg-background/50 hover:bg-gradient-to-br hover:from-primary/5 hover:via-primary/3 hover:to-transparent",
                                  "cursor-pointer overflow-hidden",
                                  "hover:shadow-md hover:shadow-primary/5"
                                )}
                                style={{ animationDelay: `${childIndex * 30}ms` }}
                                role="menuitem"
                                aria-label={child.title}
                                suppressHydrationWarning
                              >
                                {/* Subtle background glow */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover/item:from-primary/10 group-hover/item:via-primary/5 group-hover/item:to-transparent transition-all duration-200 rounded-lg opacity-0 group-hover/item:opacity-100" />
                                
                                <div className="relative flex items-start justify-between gap-3">
                                  <div className="flex-1 space-y-1.5 min-w-0 pr-2">
                                    <div className="flex items-start gap-2">
                                      <div className="h-1 w-1 rounded-full bg-primary/0 group-hover/item:bg-primary transition-all duration-300 group-hover/item:scale-150 shrink-0 mt-1.5" />
                                      <h3 className="text-sm font-semibold leading-tight text-foreground group-hover/item:text-primary transition-colors duration-300 tracking-normal break-words" suppressHydrationWarning>
                                        {child.title}
                                      </h3>
                                    </div>
                                    {child.description && (
                                      <p className="text-xs leading-snug text-muted-foreground/70 group-hover/item:text-muted-foreground/90 transition-colors duration-300 pl-3 break-words line-clamp-2" suppressHydrationWarning>
                                        {child.description}
                                      </p>
                                    )}
                                  </div>
                                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground/30 group-hover/item:text-primary transition-all duration-300 -rotate-90 opacity-0 group-hover/item:opacity-100 shrink-0 mt-0.5" aria-hidden="true" />
                                </div>
                                
                                {/* Elegant bottom accent line */}
                                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover/item:via-primary/40 transition-all duration-500" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={cn(
                    "group relative inline-flex h-10 items-center justify-center rounded-lg px-2 xl:px-3 py-2",
                    "text-xs xl:text-sm font-semibold tracking-normal transition-all duration-300 ease-out whitespace-nowrap",
                    "text-foreground/80 hover:text-foreground",
                    "before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-primary/0 before:via-primary/0 before:to-primary/0",
                    "before:transition-all before:duration-300 before:opacity-0",
                    "hover:before:opacity-100 hover:before:from-primary/5 hover:before:via-primary/8 hover:before:to-primary/5",
                    "after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:w-0 after:-translate-x-1/2",
                    "after:bg-gradient-to-r after:from-transparent after:via-primary after:to-transparent",
                    "after:transition-all after:duration-300",
                    "group-hover:after:w-3/4"
                  )}
                  suppressHydrationWarning
                >
                  <span className="relative z-10" suppressHydrationWarning>{item.title}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Side Actions - Orden: Botones → Teléfono → Idioma */}
          <div className="flex items-center gap-1.5 lg:gap-2 xl:gap-3">
            {/* Schedule Appointment Button - Quick Action */}
            <Button
              asChild
              className={cn(
                "hidden lg:flex bg-gradient-to-r from-primary via-primary to-primary/95",
                "hover:from-primary/95 hover:via-primary hover:to-primary",
                "text-white px-3 xl:px-4 2xl:px-5 py-2 text-xs xl:text-sm font-bold tracking-wide whitespace-nowrap",
                "shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40",
                "transition-all duration-300 ease-out",
                "hover:scale-105 active:scale-100",
                "rounded-xl border border-primary/20",
                "relative overflow-hidden group/schedule",
                "before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/0 before:via-white/20 before:to-white/0",
                "before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-300"
              )}
              size="default"
            >
              <a 
                href="https://meetings.hubspot.com/jrodriguez134/meeting-web" 
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 flex items-center gap-1 xl:gap-1.5" 
                suppressHydrationWarning
              >
                <Calendar className="h-3.5 w-3.5 xl:h-4 xl:w-4 opacity-90 group-hover/schedule:opacity-100 transition-opacity duration-300" />
                <span className="hidden 2xl:inline">{getCopy("nav.scheduleAppointment")}</span>
                <span className="2xl:hidden" suppressHydrationWarning>Schedule</span>
              </a>
            </Button>

            {/* Premium CTA Button */}
            <Button
              asChild
              className={cn(
                "hidden lg:flex bg-gradient-to-r from-primary via-primary to-primary/95",
                "hover:from-primary/95 hover:via-primary hover:to-primary",
                "text-white px-3 xl:px-4 2xl:px-6 py-2 text-xs xl:text-sm font-bold tracking-wide whitespace-nowrap",
                "shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40",
                "transition-all duration-300 ease-out",
                "hover:scale-105 active:scale-100",
                "rounded-xl border border-primary/20",
                "relative overflow-hidden group/cta",
                "before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/0 before:via-white/20 before:to-white/0",
                "before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-300"
              )}
              size="default"
            >
              <Link href="/#quick-register-form" className="relative z-10 flex items-center gap-1 xl:gap-1.5" suppressHydrationWarning>
                <Sparkles className="h-3 w-3 xl:h-3.5 xl:w-3.5 opacity-80 group-hover/cta:opacity-100 transition-opacity duration-300" />
                <span>{getCopy("nav.applyNow")}</span>
              </Link>
            </Button>

            {/* Premium Phone Link - Solo icono en pantallas grandes */}
            <a
              href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}
              className="hidden lg:flex items-center justify-center h-9 w-9 rounded-lg text-foreground/70 hover:text-foreground transition-all duration-300 hover:bg-primary/5 cursor-pointer border border-transparent hover:border-primary/10 group/phone"
              aria-label={`Call us at ${CONTACT_INFO.phone}`}
            >
              <Phone className="h-4 w-4 transition-transform duration-300 group-hover/phone:scale-110" />
            </a>

            {/* Mobile Menu - Premium Design */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-11 w-11 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300 border border-transparent hover:border-primary/10"
                  aria-label="Toggle menu"
                >
                  {isOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full sm:w-[420px] p-0 flex flex-col bg-background/98 backdrop-blur-2xl border-l border-border/20"
              >
                {/* Elegant top accent */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                
                <SheetHeader className="px-6 pt-8 pb-6 border-b border-border/20">
                  <div className="flex items-center justify-between">
                    <SheetTitle className="text-left text-2xl font-bold text-foreground tracking-wide" suppressHydrationWarning>
                      {getCopy("nav.home")}
                    </SheetTitle>
                    <Image
                      src="/img/logo.svg"
                      alt="M.J. Newell Homes"
                      width={200}
                      height={115}
                      className="h-12 w-auto object-contain opacity-90"
                    />
                  </div>
                </SheetHeader>
                
                <nav 
                  className="flex-1 overflow-y-auto px-6 py-6" 
                  role="navigation" 
                  aria-label="Mobile navigation"
                  suppressHydrationWarning
                >
                  <div className="flex flex-col gap-2">
                    {navigationItems.length > 0 && navigationItems.map((item, index) => (
                      <div key={item.title} style={{ animationDelay: `${index * 50}ms` }}>
                        {item.children ? (
                          <div className="space-y-2">
                            <button
                              onClick={() =>
                                setOpenSubmenu(
                                  openSubmenu === item.title ? null : item.title
                                )
                              }
                              className={cn(
                                "w-full flex items-center justify-between px-5 py-3.5 text-base font-bold rounded-xl transition-all duration-300 cursor-pointer",
                                "text-foreground hover:bg-primary/5 hover:text-primary",
                                "border border-transparent hover:border-primary/10",
                                openSubmenu === item.title && "bg-primary/5 text-primary border-primary/20 shadow-sm"
                              )}
                              aria-expanded={openSubmenu === item.title}
                              aria-haspopup="true"
                              aria-label={`${item.title} submenu`}
                            >
                              <span suppressHydrationWarning>{item.title}</span>
                              <ChevronDown
                                className={cn(
                                  "h-4 w-4 transition-transform duration-300",
                                  openSubmenu === item.title && "rotate-180 text-primary"
                                )}
                                aria-hidden="true"
                              />
                            </button>
                            {openSubmenu === item.title && (
                              <div className="pl-5 space-y-2 border-l-2 border-primary/30 ml-2 animate-in slide-in-from-top-2 fade-in-0 duration-300">
                                {item.children.map((child) => (
                                  <Link
                                    key={child.title}
                                    href={child.href === "#" ? "#" : child.href}
                                    onClick={() => {
                                      if (child.href !== "#") {
                                        setIsOpen(false);
                                        setOpenSubmenu(null);
                                      }
                                    }}
                                    className={cn(
                                      "block px-5 py-3.5 rounded-xl transition-all duration-300",
                                      child.href === "#"
                                        ? "text-muted-foreground cursor-default pointer-events-none"
                                        : "text-foreground hover:bg-primary/5 hover:text-primary cursor-pointer border border-transparent hover:border-primary/10"
                                    )}
                                  >
                                    <h3 className="font-semibold text-[15px] tracking-wide break-words" suppressHydrationWarning>
                                      {child.title}
                                    </h3>
                                    {child.description && (
                                      <p className="text-xs text-muted-foreground/70 mt-1.5 leading-relaxed break-words" suppressHydrationWarning>
                                        {child.description}
                                      </p>
                                    )}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <Link
                            href={item.href}
                            className="block px-5 py-3.5 text-base font-semibold rounded-xl text-foreground hover:bg-primary/5 hover:text-primary transition-all duration-300 cursor-pointer border border-transparent hover:border-primary/10 tracking-wide"
                            onClick={() => setIsOpen(false)}
                            suppressHydrationWarning
                          >
                            {item.title}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </nav>
                
                <div className="px-6 py-6 border-t border-border/20 space-y-4 bg-gradient-to-b from-muted/10 to-transparent">
                  <a
                    href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-3 px-5 py-3.5 text-base font-semibold rounded-xl bg-background hover:bg-primary/5 hover:text-primary transition-all duration-300 border border-border/30 hover:border-primary/20 cursor-pointer shadow-sm hover:shadow-md group/phone"
                    onClick={() => setIsOpen(false)}
                    aria-label={`Call us at ${CONTACT_INFO.phone}`}
                  >
                    <Phone className="h-5 w-5 group-hover/phone:scale-110 transition-transform duration-300" />
                    <span className="tracking-wide">{CONTACT_INFO.phone}</span>
                  </a>
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-primary via-primary to-primary/95 hover:from-primary/95 hover:via-primary hover:to-primary text-white font-bold shadow-lg hover:shadow-xl tracking-wide rounded-xl border border-primary/20 relative overflow-hidden group/schedule"
                    size="lg"
                  >
                    <a
                      href="https://meetings.hubspot.com/jrodriguez134/meeting-web"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                      className="relative z-10 flex items-center justify-center gap-2"
                      suppressHydrationWarning
                    >
                      <Calendar className="h-4 w-4 opacity-90" />
                      <span suppressHydrationWarning>{getCopy("nav.scheduleAppointment")}</span>
                    </a>
                  </Button>
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-primary via-primary to-primary/95 hover:from-primary/95 hover:via-primary hover:to-primary text-white font-bold shadow-lg hover:shadow-xl tracking-wide rounded-xl border border-primary/20 relative overflow-hidden group/cta"
                    size="lg"
                  >
                    <Link
                      href="/#quick-register-form"
                      onClick={() => setIsOpen(false)}
                      className="relative z-10 flex items-center justify-center gap-2"
                      suppressHydrationWarning
                    >
                      <Sparkles className="h-4 w-4 opacity-80" />
                      {getCopy("nav.applyNow")}
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
