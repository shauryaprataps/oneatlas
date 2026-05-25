"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import {
  dropdownGroups,
  primaryNavigation,
} from "@/config/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 px-5 py-4">

      <nav
        aria-label="Primary navigation"
        className="
        glass-strong
        bg-[#0A2540]/95

        text-white

        mx-auto
        flex
        max-w-7xl
        items-center
        justify-between

        rounded-2xl

        px-6
        py-4

        shadow-[0_12px_40px_rgba(10,37,64,.18)]
      "
      >

        {/* Logo */}
        <Logo />


        {/* Desktop Navigation */}

        <div className="hidden items-center gap-2 lg:flex">

          {primaryNavigation.map((item) => (

            <Link
              key={item.label}
              href={item.href}
              className="
              rounded-lg
              px-4
              py-2

              text-sm
              text-white/90

              transition

              hover:bg-white/10
              hover:text-white
            "
            >
              {item.label}
            </Link>

          ))}



          {dropdownGroups.map((group) => (

            <DropdownMenu.Root key={group.label}>

              <DropdownMenu.Trigger
                className="
                rounded-lg
                px-4
                py-2

                text-sm
                text-white/90

                hover:bg-white/10
                hover:text-white
              "
              >
                {group.label}
              </DropdownMenu.Trigger>



              <DropdownMenu.Content
                align="center"
                className="
                mt-4

                grid
                w-[34rem]
                grid-cols-2
                gap-2

                rounded-2xl

                border
                border-white/10

                bg-[#0A2540]/96

                p-4

                text-white

                shadow-2xl

                backdrop-blur-3xl
              "
              >

                {group.items.map((item) => {

                  const Icon =
                    item.icon;

                  return (

                    <DropdownMenu.Item
                      asChild
                      key={item.label}
                    >

                      <Link
                        href={item.href}
                        className="
                        flex
                        gap-3

                        rounded-xl

                        p-3

                        hover:bg-white/10
                      "
                      >

                        {Icon && (

                          <Icon
                            className="
                            mt-1
                            size-4
                            text-runtime
                          "
                          />

                        )}



                        <div>

                          <span
                            className="
                            block
                            text-sm
                            font-medium
                          "
                          >

                            {item.label}

                          </span>



                          {item.description && (

                            <span
                              className="
                              mt-1

                              block

                              text-xs

                              text-white/60
                            "
                            >

                              {
                                item.description
                              }

                            </span>

                          )}

                        </div>

                      </Link>

                    </DropdownMenu.Item>

                  );
                })}

              </DropdownMenu.Content>

            </DropdownMenu.Root>

          ))}

        </div>




        {/* Right Side */}

        <div
          className="
          hidden
          items-center
          gap-3

          lg:flex
        "
        >

          <ThemeToggle />



          <Button
            asChild
            variant="ghost"

            className="
            text-white/90

            hover:bg-white/10

            hover:text-white
          "
          >

            <Link href="/docs">

              Login

            </Link>

          </Button>



          <Button
            asChild

            className="
            bg-[#635BFF]

            text-white

            hover:bg-[#7A73FF]

            shadow-[0_8px_24px_rgba(99,91,255,.25)]
          "
          >

            <Link href="/templates">

              Start Building

            </Link>

          </Button>

        </div>




        {/* Mobile */}

        <Button
          size="icon"

          variant="ghost"

          className="
          text-white

          lg:hidden
        "

          onClick={() =>
            setOpen(
              !open
            )
          }
        >

          {open

            ? <X />

            : <Menu />

          }

        </Button>

      </nav>




      {/* Mobile menu */}

      <div

        className={cn(

          `
          glass-strong

          bg-[#0A2540]/95

          mx-auto

          mt-3

          hidden

          max-w-7xl

          rounded-2xl

          p-4
          `,

          open &&
            "block"

        )}

      >

        {[

          ...primaryNavigation,

          ...dropdownGroups.flatMap(
            g =>
              g.items
          ),

        ].map(

          (
            item
          ) => (

            <Link

              key={
                item.label
              }

              href={
                item.href
              }

              onClick={() =>
                setOpen(
                  false
                )
              }

              className="
              block

              rounded-lg

              px-4

              py-3

              text-white/90

              hover:bg-white/10
            "
            >

              {item.label}

            </Link>

          )

        )}



        <div
          className="
          mt-4

          grid

          grid-cols-2

          gap-2
        "
        >

          <Button
            asChild

            variant="ghost"

            className="
            text-white/90

            hover:bg-white/10
          "
          >

            <Link href="/docs">

              Login

            </Link>

          </Button>



          <Button
            asChild

            className="
            bg-[#635BFF]

            hover:bg-[#7A73FF]

            text-white
          "
          >

            <Link href="/templates">

              Start Building

            </Link>

          </Button>

        </div>

      </div>

    </header>
  );
}