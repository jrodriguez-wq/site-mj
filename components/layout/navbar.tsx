"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, Phone, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CONTACT_INFO } from "@/config/seo";
import { cn } from "@/lib/utils";
import { LanguageSelector } from "@/components/ui/language-selector";
import { useTranslation } from "@/hooks/use-translation";

export const Navbar = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const navigationItems = [
    {
      title: t("nav.home"),
      href: "/",
    },
    {
      title: t("nav.rentToOwn"),
      href: "/rent-to-own",
    },
    {
      title: t("nav.buyHome"),
      href: "#",
      children: [
        {
          title: t("nav.models"),
          href: "/models",
          description: t("nav.modelsDesc"),
        },
        {
          title: t("nav.labelle"),
          href: "/communities/labelle",
          description: t("communities.labelle.description"),
        },
        {
          title: t("nav.lehighAcres"),
          href: "/communities/lehigh-acres",
          description: t("communities.lehighAcres.description"),
        },
        {
          title: t("nav.homeBuyingGuide"),
          href: "/home-buying-guide",
          description: t("nav.homeBuyingGuideDesc"),
        },
      ],
    },
    {
      title: t("nav.buildWithUs"),
      href: "/build-with-us",
    },
    {
      title: t("nav.resources"),
      href: "#",
      children: [
        {
          title: t("nav.homeBuyingGuide"),
          href: "/home-buying-guide",
          description: t("nav.homeBuyingGuideDesc"),
        },
        {
          title: t("nav.warranty"),
          href: "/warranty",
          description: t("nav.warrantyDesc"),
        },
      ],
    },
    {
      title: t("nav.company"),
      href: "#",
      children: [
        {
          title: t("nav.aboutUs"),
          href: "/about-us",
          description: t("nav.aboutUsDesc"),
        },
        {
          title: t("nav.contact"),
          href: "/contact",
          description: t("nav.contactDesc"),
        },
      ],
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/98 backdrop-blur-xl supports-backdrop-filter:bg-background/90 shadow-md">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex h-20 md:h-24 lg:h-28 items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2 group transition-all duration-300 hover:opacity-90 hover:scale-105"
          >
            <Image
              src="/img/logo.svg"
              alt="M.J. Newell Homes"
              width={280}
              height={160}
              className="h-16 md:h-20 lg:h-24 xl:h-28 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </Link>

          <nav className="hidden lg:flex items-center space-x-2">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                {navigationItems.map((item) => {
                  if (item.children) {
                    return (
                      <NavigationMenuItem key={item.title}>
                        <NavigationMenuTrigger 
                          className="h-11 px-5 text-base font-semibold text-foreground/90 hover:text-primary data-[state=open]:text-primary hover:bg-primary/5 data-[state=open]:bg-primary/5 rounded-lg transition-all duration-200 cursor-pointer" 
                          suppressHydrationWarning
                        >
                          {item.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[450px] gap-2 p-6 md:w-[550px] md:grid-cols-2 lg:w-[650px]">
                            {item.children.map((child) => (
                              <li key={child.title}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    href={child.href}
                                    className="block select-none space-y-2 rounded-lg p-4 leading-none no-underline outline-none transition-all duration-200 hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary group/item cursor-pointer border border-transparent hover:border-primary/20 hover:shadow-sm"
                                  >
                                    <div className="text-base font-bold leading-tight text-foreground group-hover/item:text-primary transition-colors" suppressHydrationWarning>
                                      {child.title}
                                    </div>
                                    {child.description && (
                                      <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground/80 mt-1.5 group-hover/item:text-muted-foreground transition-colors" suppressHydrationWarning>
                                        {child.description}
                                      </p>
                                    )}
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    );
                  }

                  return (
                    <NavigationMenuItem key={item.title}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          className="group inline-flex h-11 w-max items-center justify-center rounded-lg px-5 py-2.5 text-base font-semibold text-foreground/90 transition-all duration-200 hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
                          suppressHydrationWarning
                        >
                          {item.title}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          <div className="flex items-center gap-3 md:gap-4">
            <LanguageSelector />

            <a
              href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}
              className="hidden lg:flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-foreground/80 hover:text-primary transition-all duration-200 rounded-lg hover:bg-primary/10 cursor-pointer border border-transparent hover:border-primary/20"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden xl:inline">{CONTACT_INFO.phone}</span>
            </a>

            <Button
              asChild
              className={cn(
                "hidden lg:flex bg-primary hover:bg-primary/90 text-white",
                "px-7 py-2.5 text-base font-bold",
                "shadow-lg hover:shadow-xl hover:shadow-primary/40",
                "transition-all duration-300 ease-out",
                "hover:scale-105 active:scale-100",
                "rounded-lg"
              )}
              size="default"
            >
              <Link href="/#quick-register-form" suppressHydrationWarning>{t("nav.applyNow")}</Link>
            </Button>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-lg hover:bg-primary/10 hover:text-primary transition-all duration-200"
                  aria-label="Toggle menu"
                >
                  {isOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full sm:w-[420px] p-0 flex flex-col bg-background/98 backdrop-blur-xl"
              >
                <SheetHeader className="px-6 pt-8 pb-6 border-b border-border/40">
                  <div className="flex items-center justify-between">
                    <SheetTitle className="text-left text-2xl font-bold text-foreground" suppressHydrationWarning>
                      {t("nav.home")}
                    </SheetTitle>
                    <Image
                      src="/img/logo.svg"
                      alt="M.J. Newell Homes"
                      width={200}
                      height={115}
                      className="h-12 w-auto object-contain"
                    />
                  </div>
                </SheetHeader>
                <nav className="flex-1 overflow-y-auto px-6 py-6">
                  <div className="flex flex-col gap-2">
                    {navigationItems.map((item) => (
                      <div key={item.title}>
                        {item.children ? (
                          <div className="space-y-2">
                            <button
                              onClick={() =>
                                setOpenSubmenu(
                                  openSubmenu === item.title ? null : item.title
                                )
                              }
                              className="w-full flex items-center justify-between px-4 py-3 text-base font-bold rounded-lg text-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200 cursor-pointer border border-transparent hover:border-primary/20"
                            >
                              <span suppressHydrationWarning>{item.title}</span>
                              <ChevronDown
                                className={cn(
                                  "h-5 w-5 transition-transform duration-300",
                                  openSubmenu === item.title && "rotate-180"
                                )}
                              />
                            </button>
                            {openSubmenu === item.title && (
                              <div className="pl-4 space-y-2 border-l-2 border-primary/30 ml-2">
                                {item.children.map((child) => (
                                  <Link
                                    key={child.title}
                                    href={child.href === "#" ? "#" : child.href}
                                    onClick={() => {
                                      if (child.href !== "#") {
                                        setIsOpen(false);
                                      }
                                    }}
                                    className={cn(
                                      "block px-4 py-3 text-sm rounded-lg transition-all duration-200",
                                      child.href === "#"
                                        ? "text-muted-foreground cursor-default pointer-events-none"
                                        : "text-foreground hover:bg-primary/10 hover:text-primary cursor-pointer border border-transparent hover:border-primary/20"
                                    )}
                                  >
                                    <div className="font-semibold text-base" suppressHydrationWarning>{child.title}</div>
                                    {child.description && (
                                      <p className="text-xs text-muted-foreground/80 mt-1.5 leading-relaxed" suppressHydrationWarning>
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
                            className="block px-4 py-3 text-base font-semibold rounded-lg text-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200 cursor-pointer border border-transparent hover:border-primary/20"
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
                <div className="px-6 py-6 border-t border-border/40 space-y-4 bg-muted/20">
                  <a
                    href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-3 px-5 py-3.5 text-base font-semibold rounded-lg bg-background hover:bg-primary/10 hover:text-primary transition-all duration-200 border border-border hover:border-primary/30 cursor-pointer shadow-sm hover:shadow-md"
                    onClick={() => setIsOpen(false)}
                  >
                    <Phone className="h-5 w-5" />
                    {CONTACT_INFO.phone}
                  </a>
                  <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white font-bold shadow-lg hover:shadow-xl" size="lg">
                    <Link href="/#quick-register-form" onClick={() => setIsOpen(false)} suppressHydrationWarning>
                      {t("nav.applyNow")}
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

